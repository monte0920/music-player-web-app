import React from "react";
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

const Spinner = () => {
    return (
        <Stack sx={{ background: '#2e79ed', height: '100%' }} justifyContent='center' alignItems='center'>
            <CircularProgress color="inherit" />
        </Stack>
    )
}

export default Spinner;