import React, { useCallback, useEffect, useRef, useState } from "react";
import Stack from "@mui/material/Stack";
import EventEmitter from "event-emitter";
import WaveformPlaylist from "waveform-playlist";
import * as Tone from "tone";

import Setting from "./Setting";
import Control from "./Control";

import ThreeBg from "../components/Background";

const Home = () => {
    const [ee] = useState(new EventEmitter());
    const toneCtx = Tone.getContext();
    const setUpChain = useRef();
    const [player, setPlayer] = useState(null);
    const [playing, setPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);

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

                await playlist.load([
                    {
                        src: "1.mp3",
                        effects: function (
                            graphEnd,
                            masterGainNode,
                            isOffline
                        ) {
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
                    },
                    // {
                    //     src: "2.mp3",
                    //     effects: function (
                    //         graphEnd,
                    //         masterGainNode,
                    //         isOffline
                    //     ) {
                    //         const reverb = new Tone.Reverb(1.2);

                    //         if (isOffline) {
                    //             setUpChain.current.push(reverb.ready);
                    //         }

                    //         Tone.connect(graphEnd, reverb);
                    //         Tone.connect(reverb, masterGainNode);

                    //         return function cleanup() {
                    //             reverb.disconnect();
                    //             reverb.dispose();
                    //         };
                    //     },
                    // },
                ]);

                setPlayer(playlist);
            }
        },
        [ee, toneCtx]
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
            <Setting />
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
