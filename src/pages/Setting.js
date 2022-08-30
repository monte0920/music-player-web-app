import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { SETTINGS } from "../config";

const Setting = () => {
  const [drum, setDrum] = useState()
  const [guitar, setGuitar] = useState()
  const [synth, setSynth] = useState()

  return (
    <Stack sx={{ height: '84%', width: 480 }}>
      <Stack sx={{ height: '100%', overflow: 'auto' }}>
        <Stack
          justifyContent='center'
          sx={{
            py: '60%'
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
            pb: '20%',
          }}
          spacing={10}
        >
          <Stack spacing={3}>
            <Typography letterSpacing={0.05} fontSize={14} fontWeight={900} color="white" fontFamily={'Inter'} sx={{ ml: 2 }}>DRUM PATTERN</Typography>
            <Stack direction='row' justifyContent={'space-between'}>
              {
                SETTINGS.drum.map((item, index) => {
                  return (
                    <Stack
                      key={index}
                      spacing={2}
                      alignItems='center'
                      sx={{
                        width: '20%',
                      }}
                    >
                      <Button
                        onClick={() => setDrum(item.id)}
                        sx={{
                          background: item.id == drum ? "white" : 'transparent',
                          width: 47,
                          height: 47,
                          minWidth: 0,
                          borderRadius: 47,
                          border: '1px solid white',
                          color: 'white',
                          '&:hover': {
                            background: '#ffffffe0'
                          },
                          '&:active': {
                            background: 'white'
                          }
                        }}
                      ></Button>
                      <Typography textAlign='center' color={'rgba(255, 255, 255, 0.5)'} fontSize={12} fontWeight={700} fontFamily={'Inter'}>{item.title}</Typography>
                    </Stack>
                  )
                })
              }
            </Stack>
          </Stack>
          <Stack spacing={3}>
            <Typography letterSpacing={0.05} fontSize={14} fontWeight={900} color="white" fontFamily={'Inter'} sx={{ ml: 2 }}>GUITAR LEAD</Typography>
            <Stack direction='row' justifyContent={'space-between'}>
              {
                SETTINGS.guitar.map((item, index) => {
                  return (
                    <Stack
                      key={index}
                      spacing={2}
                      alignItems='center'
                      sx={{
                        width: '20%'
                      }}
                    >
                      <Button
                        onClick={() => setGuitar(item.id)}
                        sx={{
                          background: item.id == guitar ? "white" : 'transparent',
                          width: 47,
                          height: 47,
                          minWidth: 0,
                          borderRadius: 47,
                          border: '1px solid white',
                          color: 'white',
                          '&:hover': {
                            background: '#ffffffe0'
                          },
                          '&:active': {
                            background: 'white'
                          }
                        }}
                      ></Button>
                      <Typography textAlign='center' color={'rgba(255, 255, 255, 0.5)'} fontSize={12} fontWeight={700} fontFamily={'Inter'}>{item.title}</Typography>
                    </Stack>
                  )
                })
              }
            </Stack>
          </Stack>
          <Stack spacing={3}>
            <Typography letterSpacing={0.05} fontSize={14} fontWeight={900} color="white" fontFamily={'Inter'} sx={{ ml: 2 }}>SYNTH STYLE</Typography>
            <Stack direction='row' justifyContent={'space-between'}>
              {
                SETTINGS.synth.map((item, index) => {
                  return (
                    <Stack
                      key={index}
                      spacing={2}
                      alignItems='center'
                      sx={{
                        width: '20%'
                      }}
                    >
                      <Button
                        onClick={() => setSynth(item.id)}
                        sx={{
                          background: item.id == synth ? "white" : 'transparent',
                          width: 47,
                          height: 47,
                          minWidth: 0,
                          borderRadius: 47,
                          border: '1px solid white',
                          color: 'white',
                          '&:hover': {
                            background: '#ffffffe0'
                          },
                          '&:active': {
                            background: 'white'
                          }
                        }}
                      ></Button>
                      <Typography color={'rgba(255, 255, 255, 0.5)'} fontSize={12} fontWeight={700} fontFamily={'Inter'}>{item.title}</Typography>
                    </Stack>
                  )
                })
              }
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Setting;