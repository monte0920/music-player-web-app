import React from "react";
import Stack from "@mui/material/Stack";
import Setting from './Setting'
import Control from './Control'

const Home = () => {
  return (
    <Stack
      alignItems='center'
      sx={{
        height: '100%'
      }}
    >
      <Setting />
      <Control />
    </Stack>
  )
}

export default Home;