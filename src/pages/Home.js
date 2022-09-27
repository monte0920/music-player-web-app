import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import EventEmitter from "event-emitter";
import WaveformPlaylist from "waveform-playlist";

import Setting from "./Setting";
import Control from "./Control";

import _audio from "../assets/audio/1.mp3";
import ThreeBg from "../components/Background";
const audio = new Audio(_audio);

const Home = () => {
    const useAudio = () => {
        const [playing, setPlaying] = useState(false);
        const [playBackRate, setPlayBackRate] = useState(1);

        const toggle = () => {
            setPlaying(!playing);
        };

        const speed = (type) => {
            if (type == "fast") {
                if (playBackRate < 2) {
                    setPlayBackRate(playBackRate + 0.25);
                } else {
                    setPlayBackRate(1);
                }
            }
            if (type == "slow") {
                if (playBackRate <= 0.25) {
                    setPlayBackRate(1);
                } else {
                    setPlayBackRate(playBackRate - 0.25);
                }
            }
        };

        const updateTime = (time) => {
            audio.currentTime = time;
        };

        useEffect(() => {
            if (playing) {
                audio.play().catch((error) => {
                    console.log(error);
                });
            } else {
                audio.pause();
            }
        }, [playing, audio]);

        useEffect(() => {
            audio.playbackRate = playBackRate;
        }, [playBackRate, audio]);

        useEffect(() => {
            audio.addEventListener("ended", () => setPlaying(false));

            return () => {
                audio.removeEventListener("ended", () => setPlaying(false));
            };
        }, [audio]);

        return [playing, toggle, speed, updateTime];
    };

    const [player, setPlayer] = useState(null);
    console.log(player)
    useEffect(() => {
        const playlist = WaveformPlaylist(
            {
                container: document.querySelector(".playlist"),
            },

            // you can pass your own event emitter
            EventEmitter()
        );
        // retrieves the event emitter the playlist is using.
        const ee = playlist.getEventEmitter();
        setPlayer(ee)
        ee.__ee__.play()
    }, []);

    const [playing, toggle, speed, updateTime] = useAudio();

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
                audio={audio}
                speed={speed}
                updateTime={updateTime}
            />
            <Stack className="playlist"></Stack>
        </Stack>
    );
};

export default Home;
