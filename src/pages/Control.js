import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { styled } from '@mui/material/styles';
import { FaFastBackward, FaFastForward } from 'react-icons/all'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

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

const Control = () => {
  // const [progress, setProgress] = React.useState(30);
  const progress = 30;

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
        <IconButton>
          <FaFastBackward />
        </IconButton>
        <IconButton
          sx={{
            '& svg': {
              width: 44,
              height: 44
            }
          }}>
          <PlayCircleIcon />
        </IconButton>
        <IconButton>
          <FaFastForward />
        </IconButton>
      </Stack>
      <Stack direction='row' justifyContent='center' alignItems='center' spacing={1}>
        <Typography fontSize={12} color='white'>1:02</Typography>
        <Box sx={{ width: 350 }}>
          <MusicProgressBar variant="determinate" value={progress} />
        </Box>
        <Typography fontSize={12} color='white'>4:33</Typography>
      </Stack>
    </Stack >
  )
}

export default Control;