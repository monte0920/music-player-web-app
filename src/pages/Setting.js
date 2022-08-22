import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Patterns = {
  drum: ['OFFBEAT', 'HALF TIME', 'FILLED', 'LESS IS MORE', 'BASIC'],
  guitar: ['LIGHT DISTORTION', 'LESS DISTORTION', 'MILD DISTORTION', 'MORE DISTORTION', 'HEAVY DISTORTION'],
  synth: ['WAVY', 'SQUARE', 'BASSY', 'VIBRATE', 'WONKY']
}

const Setting = () => {
  return (
    <Stack flexGrow={1}>
      <Stack
        justifyContent='center'
        sx={{
          height: '100%',
        }}
      >
        <Stack alignItems='center' sx={{ pt: 10 }}>
          <Typography fontSize={64} fontFamily={'Michroma'} color='white'>
            ARTIST
          </Typography>
          <Typography fontSize={56} fontFamily={'Michroma'} color='#858ac7'>
            SONGTITLE
          </Typography>
        </Stack>
      </Stack>
      <Stack
        sx={{
          height: '100%',
        }}
        spacing={10}
      >
        <Stack spacing={3}>
          <Typography letterSpacing={0.05} fontSize={14} fontWeight={900} color="white" fontFamily={'Inter'}>DRUM PATTERN</Typography>
          <Stack direction='row' justifyContent={'space-between'}>
            {
              Patterns.drum.map((item, index) => {
                return (
                  <Stack
                    key={index}
                    spacing={2}
                    alignItems='center'
                    sx={{
                      width: '15%', 
                      '& button': {
                        background: 'transparent',
                        width: 47,
                        height: 47,
                        minWidth: 0,
                        borderRadius: 47,
                        border: '1px solid white'
                      }
                    }}
                  >
                    <Button></Button>
                    <Typography color={'rgba(255, 255, 255, 0.5)'} fontSize={12} fontWeight={700} fontFamily={'Inter'}>{item}</Typography>
                  </Stack>
                )
              })
            }
          </Stack>
        </Stack>
        <Stack spacing={3}>
          <Typography letterSpacing={0.05} fontSize={14} fontWeight={900} color="white" fontFamily={'Inter'}>GUITAR LEAD</Typography>
          <Stack direction='row' justifyContent={'space-between'}>
            {
              Patterns.guitar.map((item, index) => {
                return (
                  <Stack
                    key={index}
                    spacing={2}
                    alignItems='center'
                    sx={{
                      width: '15%', 
                      '& button': {
                        background: 'transparent',
                        width: 47,
                        height: 47,
                        minWidth: 0,
                        borderRadius: 47,
                        border: '1px solid white'
                      }
                    }}
                  >
                    <Button></Button>
                    <Typography textAlign='center' color={'rgba(255, 255, 255, 0.5)'} fontSize={12} fontWeight={700} fontFamily={'Inter'}>{item}</Typography>
                  </Stack>
                )
              })
            }
          </Stack>
        </Stack>
        <Stack spacing={3}>
          <Typography letterSpacing={0.05} fontSize={14} fontWeight={900} color="white" fontFamily={'Inter'}>SYNTH STYLE</Typography>
          <Stack direction='row' justifyContent={'space-between'}>
            {
              Patterns.synth.map((item, index) => {
                return (
                  <Stack
                    key={index}
                    spacing={2}
                    alignItems='center'
                    sx={{
                      width: '15%', 
                      '& button': {
                        background: 'transparent',
                        width: 47,
                        height: 47,
                        minWidth: 0,
                        borderRadius: 47,
                        border: '1px solid white'
                      }
                    }}
                  >
                    <Button></Button>
                    <Typography color={'rgba(255, 255, 255, 0.5)'} fontSize={12} fontWeight={700} fontFamily={'Inter'}>{item}</Typography>
                  </Stack>
                )
              })
            }
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Setting;