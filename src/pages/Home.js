import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Setting from './Setting'
import Control from './Control'

import _audio from '../assets/audio/1.mp3';
const audio = new Audio(_audio);

const Home = () => {
  const useAudio = () => {
    const [playing, setPlaying] = useState(false);

    const toggle = () => {
      setPlaying(!playing);
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
      audio.addEventListener("ended", () => setPlaying(false));

      return () => {
        audio.removeEventListener("ended", () => setPlaying(false));
      };
    }, [audio]);

    return [playing, toggle];
  };

  const [playing, toggle] = useAudio();

  return (
    <Stack
      alignItems='center'
      sx={{
        height: '100%'
      }}
    >
      <Setting />
      <Control playing={playing} toggle={toggle} audio={audio} />
    </Stack>
  )
}

export default Home;