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
                    {
                        src: "2.mp3",
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
                ]);

                setPlayer(playlist);
            }
        },
        [ee, toneCtx]
    );

    const toggle = () => {
        setPlaying(!playing);
    };

    const handlePlayMusic = () => {
        ee.emit("play");
    };

    const handleStopMusic = () => {
        ee.emit("stop");
        console.log(player);
    };

    const handlePauseMusic = () => {
        ee.emit("pause");
        console.log(player);
    };

    const handleTestMusic = () => {
        ee.emit("continuousplay", 50);
        console.log(player);
    };

    return (
        <Stack
            alignItems="center"
            sx={{
                height: "100%",
            }}
        >
            <button onClick={handlePlayMusic}>Play</button>
            <button onClick={handlePauseMusic}>Pause</button>
            <button onClick={handleStopMusic}>Stop</button>
            <button onClick={handleTestMusic}>Test</button>
            <ThreeBg />
            <Setting />
            <Control
                playing={playing}
                toggle={toggle}
                duration={player ? player.duration : 0}
            />
            <Stack ref={container} sx={{ display: "none" }}></Stack>
        </Stack>
    );
};

export default Home;
