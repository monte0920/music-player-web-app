import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Slider from '@mui/material/Slider';
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import { FaFastBackward, FaFastForward } from 'react-icons/all'
import { formatSecondsAsTime } from "../config";

const Control = (props) => {
  const { playing, toggle, audio, speed, updateTime } = props;
  const [currentTime, setCurrentTime] = useState(0)

  useEffect(() => {
    if (audio) {
      audio.addEventListener('timeupdate', () => {
        setCurrentTime(audio.currentTime)
      })
    }
  }, [audio])

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
        <Slider
          aria-label="time-indicator"
          size="small"
          value={currentTime}
          min={0}
          step={1}
          max={audio.duration || 1}
          onChange={(_, value) => updateTime(value)}
          sx={{
            width: 350,
            color: '#D9D9D9',
            height: 5,
            '& .MuiSlider-thumb': {
              width: 7,
              height: 7,
              transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
              '&:before': {
                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
              },
              '&:hover, &.Mui-focusVisible': {
                boxShadow: `0px 0px 0px 8px 'rgb(255 255 255 / 16%)'`,
              },
              '&.Mui-active': {
                width: 10,
                height: 10,
              },
            },
            '& .MuiSlider-rail': {
              opacity: 0.28,
            },
          }}
        />
        <Typography fontSize={12} color='white'>{formatSecondsAsTime(audio.duration || 0) || '00:00'}</Typography>
      </Stack>
    </Stack >
  )
}

export default Control;