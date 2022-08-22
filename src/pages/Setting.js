import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const Setting = () => {
  return (
    <Stack flexGrow={1}>
      <Stack
        justifyContent='center'
        sx={{
          height: '100%',
        }}
      >
        <Stack alignItems='center'>
          <Typography fontSize={64} fontFamily={'Michroma'} color='white'>
            ARTIST
          </Typography>
          <Typography fontSize={56} fontFamily={'Michroma'} color='#858ac7'>
            SONGTITLE
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Setting;