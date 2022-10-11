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
    const [drum, setDrum] = useState(SETTINGS.drum[2].id);
    const [guitar, setGuitar] = useState(SETTINGS.guitar[2].id);
    const [synth, setSynth] = useState(SETTINGS.synth[2].id);
    const [musics, setMusics] = useState([]);

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

    const ordered = useMemo(() => {
        let obj = {};
        for (let i = 0; i < musics.length; i++) {
            obj[musics[i].type] = musics[i].file_name;
        }
        return obj;
    }, [musics]);

    useEffect(() => {
        handleFetchMusics();
    }, []);

    const container = useCallback(
        async (node) => {
            if (node !== null && toneCtx !== null) {
                ee.emit("clear");
                setCurrentTime(0);

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
                    src: "",
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

                const lists = [];

                if (ordered[drum])
                    lists.push({
                        ...tool,
                        src: `${SERVER_URL}musics/${ordered[drum]}`,
                    });

                if (ordered[guitar])
                    lists.push({
                        ...tool,
                        src: `${SERVER_URL}musics/${ordered[guitar]}`,
                    });

                if (ordered[synth])
                    lists.push({
                        ...tool,
                        src: `${SERVER_URL}musics/${ordered[synth]}`,
                    });

                await playlist.load(lists);

                setPlayer(playlist);
            }
        },
        [ee, toneCtx, drum, guitar, synth, ordered]
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
            <ThreeBg />
            <Setting
                drum={drum}
                synth={synth}
                guitar={guitar}
                setDrum={setDrum}
                setSynth={setSynth}
                setGuitar={setGuitar}
            />
            <Control
                playing={playing}
                toggle={toggle}
                currentTime={currentTime}
                updateTime={updateTime}
                duration={player ? player.duration : 0}
            />
            <Stack ref={container} sx={{ display: "none" }}></Stack>
        </Stack>
    );
};

export default Home;
