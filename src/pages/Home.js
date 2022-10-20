import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import Stack from "@mui/material/Stack";
import EventEmitter from "event-emitter";
import WaveformPlaylist from "waveform-playlist";
import * as Tone from "tone";

import Setting from "./Setting";
import Control from "./Control";
import { SETTINGS } from "../config";

import ThreeBg from "../components/Background";
import API, { SERVER_URL } from "../utils/api";

const Home = () => {
    const [ee] = useState(new EventEmitter());
    const toneCtx = Tone.getContext();
    const setUpChain = useRef();
    const [player, setPlayer] = useState(null);
    const [playing, setPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [Idrum, setDrum] = useState(2);
    const [Iguitar, setGuitar] = useState(2);
    const [Isynth, setSynth] = useState(2);
    const [musics, setMusics] = useState([]);

    const drum = SETTINGS.drum[Idrum].id;
    const guitar = SETTINGS.guitar[Iguitar].id;
    const synth = SETTINGS.synth[Isynth].id;

    const playingTracks = useMemo(() => {
        if (!player) return [];

        const filterdTracks = player.tracks.filter((item) => {
            if (item.name == `drum-${drum}`) {
                return true;
            }

            if (item.name == `guitar-${guitar}`) {
                return true;
            }

            if (item.name == `synth-${synth}`) {
                return true;
            }
            return false;
        });

        const list = filterdTracks.map((item) => {
            return item.peaks?.data[0];
        });

        const maxLen = () => {
            const len =
                list[1]?.length > list[0]?.length
                    ? list[1]?.length
                    : list[0]?.length;

            return list[2]?.length > len ? list[2]?.length : len;
        };

        let arr = [];
        for (let i = 0; i < maxLen(); i++) {
            let _n = list[0] ? (list[0].length > i + 1 ? list[0][i] : 0) : 0;
            _n += list[1] ? (list[1].length > i + 1 ? list[1][i] : 0) : 0;
            _n += list[2] ? (list[2].length > i + 1 ? list[2][i] : 0) : 0;
            arr.push(_n);
        }
        return arr;
    }, [player, drum, guitar, synth]);

    const handleDrum = (_drum, i) => {
        if (drum == _drum) return;

        const track = player.tracks.find((item) => item.name == `drum-${drum}`);
        const newtrack = player.tracks.find(
            (item) => item.name == `drum-${_drum}`
        );

        if (track) {
            ee.emit("mute", track);
        }
        if (newtrack) {
            ee.emit("mute", newtrack);
        }
        setDrum(i);
    };

    const handleGuiter = (_guiter, i) => {
        if (guitar == _guiter) return;

        const track = player.tracks.find(
            (item) => item.name == `guitar-${guitar}`
        );
        const newtrack = player.tracks.find(
            (item) => item.name == `guitar-${_guiter}`
        );

        if (track) {
            ee.emit("mute", track);
        }
        if (newtrack) {
            ee.emit("mute", newtrack);
        }
        setGuitar(i);
    };

    const handleSynth = (_synth, i) => {
        if (synth == _synth) return;

        const track = player.tracks.find(
            (item) => item.name == `synth-${synth}`
        );
        const newtrack = player.tracks.find(
            (item) => item.name == `synth-${_synth}`
        );

        if (track) {
            ee.emit("mute", track);
        }
        if (newtrack) {
            ee.emit("mute", newtrack);
        }
        setSynth(i);
    };

    const handleFetchMusics = async () => {
        try {
            const res = await API(`get`, `music`);
            if (res.data) {
                setMusics(res.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleFast = (type) => {
        ee.emit(type == "fast" ? "fastforward" : "rewind");
    };

    useEffect(() => {
        handleFetchMusics();
    }, []);

    const container = useCallback(
        async (node) => {
            if (node !== null && toneCtx !== null) {
                const playlist = WaveformPlaylist(
                    {
                        ac: toneCtx.rawContext,
                        container: node,
                        zoomLevels: [100, 300, 500],
                    },
                    ee
                );

                ee.on("audiorenderingstarting", function (offlineCtx, a) {
                    // Set Tone offline to render effects properly.
                    const offlineContext = new Tone.OfflineContext(offlineCtx);
                    Tone.setContext(offlineContext);
                    setUpChain.current = a;
                });

                const tool = {
                    effects: function (graphEnd, masterGainNode, isOffline) {
                        const reverb = new Tone.Reverb(1.2);

                        if (isOffline) {
                            setUpChain.current.push(reverb.ready);
                        }

                        Tone.connect(graphEnd, reverb);
                        Tone.connect(reverb, masterGainNode);

                        return function cleanup() {
                            reverb.disconnect();
                            reverb.dispose();
                        };
                    },
                };

                const lists = musics.map((item) => {
                    const muted = () => {
                        if (
                            `${item.instrument}-${item.type}` == `drum-${drum}`
                        ) {
                            return false;
                        }

                        if (
                            `${item.instrument}-${item.type}` ==
                            `guitar-${guitar}`
                        ) {
                            return false;
                        }

                        if (
                            `${item.instrument}-${item.type}` ==
                            `synth-${synth}`
                        ) {
                            return false;
                        }
                        return true;
                    };

                    return {
                        ...tool,
                        src: `${SERVER_URL}musics/${item.file_name}`,
                        name: `${item.instrument}-${item.type}`,
                        muted: muted(),
                    };
                });

                await playlist.load(lists);

                setPlayer(playlist);
            }
        },
        [ee, toneCtx, musics]
    );

    useEffect(() => {
        let timer;

        if (player) {
            if (playing) {
                ee.emit("play", currentTime);
                timer = setInterval(() => {
                    if (player.playbackSeconds) {
                        setCurrentTime(player.playbackSeconds);
                    } else {
                        setCurrentTime(0);
                        setPlaying(false);
                    }
                }, 1000);
            } else {
                ee.emit("pause");
            }
        }

        return () => {
            clearInterval(timer);
        };
    }, [playing]);

    const updateTime = (_time) => {
        if (playing) ee.emit("play", _time);
        setCurrentTime(_time);
    };

    const toggle = () => {
        setPlaying(!playing);
    };

    return (
        <Stack
            alignItems="center"
            sx={{
                height: "100%",
            }}
        >
            <ThreeBg
                playing={playing}
                currentTime={currentTime}
                playingTracks={playingTracks}
                duration={player ? player.duration : 0}
                insts={{ Idrum, Iguitar, Isynth }}
            />
            <Setting
                drum={drum}
                synth={synth}
                guitar={guitar}
                setDrum={handleDrum}
                setSynth={handleSynth}
                setGuitar={handleGuiter}
            />
            <Control
                playing={playing}
                toggle={toggle}
                currentTime={currentTime}
                updateTime={updateTime}
                fastToggle={handleFast}
                duration={player ? player.duration : 0}
            />
            {musics.length && (
                <Stack ref={container} sx={{ display: "none" }}></Stack>
            )}
        </Stack>
    );
};

export default Home;
