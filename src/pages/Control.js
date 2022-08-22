import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import { styled } from '@mui/material/styles';
import { FaFastBackward, FaFastForward } from 'react-icons/all'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { formatSecondsAsTime } from "../config";

const MusicProgressBar = styled(LinearProgress)(() => ({
  height: 5,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: 'rgba(217, 217, 217, 0.5)',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#D9D9D9',
  },
}));

const Control = (props) => {
  const { playing, toggle, audio, speed } = props;
  const [currentTime, setCurrentTime] = useState(0)

  useEffect(() => {
    if (audio) {
      audio.addEventListener('timeupdate', () => {
        setCurrentTime(audio.currentTime)
      })
    }
  }, [audio])

  const progress = currentTime / (audio.duration || 1) * 100;

  return (
    <Stack sx={{ py: 3, height: '15%' }} alignItems='center' spacing={2}>
      <Stack
        direction='row'
        spacing={1}
        sx={{
          '& button': {
            color: 'white',
            width: 44,
            height: 44
          }
        }}
      >
        <IconButton onClick={() => speed('slow')}>
          <FaFastBackward />
        </IconButton>
        <IconButton
          onClick={toggle}
          sx={{
            '& svg': {
              width: 44,
              height: 44
            }
          }}>
          {
            playing ?
              <PauseCircleIcon /> : <PlayCircleIcon />
          }
        </IconButton>
        <IconButton onClick={() => speed('fast')}>
          <FaFastForward />
        </IconButton>
      </Stack>
      <Stack direction='row' justifyContent='center' alignItems='center' spacing={1}>
        <Typography fontSize={12} color='white'>{formatSecondsAsTime(currentTime) || '00:00'}</Typography>
        <Box sx={{ width: 350 }}>
          <MusicProgressBar variant="determinate" value={progress} />
        </Box>
        <Typography fontSize={12} color='white'>{formatSecondsAsTime(audio.duration || 0) || '00:00'}</Typography>
      </Stack>
    </Stack >
  )
}

export default Control;