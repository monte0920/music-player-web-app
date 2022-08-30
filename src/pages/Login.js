import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import InputBase from '@mui/material/InputBase';

const Login = () => {
    return (
        <Stack
            justifyContent='center'
            alignItems='center'
            sx={{
                height: '100%',
                background: '#F8F8F8'
            }}
        >
            <Stack spacing={5}>
                <Typography textAlign='center' color="#1D1B8C" fontSize={18} fontWeight={900}>HARPER // INTERACTIVE MUSIC PROJECT</Typography>
                <Stack
                    sx={{
                        background: 'white',
                        p: 3,
                        pb: 5,
                        width: 450,
                        borderRadius: 3,
                        boxShadow: '1px 1px 8px -6px'
                    }}
                    spacing={3}
                >
                    <Typography textAlign='center' color="#1D1B8C" fontSize={18} fontWeight={900}>LOGIN</Typography>
                    <Stack spacing={1}>
                        <Typography color="black" fontSize={14} fontWeight={900}>USERNAME</Typography>
                        <InputBase sx={{ width: '100%', height: 50, borderWidth: 0, borderRadius: '10px', p: 1, background: '#F8F8F8' }} />
                    </Stack>
                    <Stack spacing={1}>
                        <Typography color="black" fontSize={14} fontWeight={900}>PASSWORD</Typography>
                        <InputBase sx={{ width: '100%', height: 50, borderWidth: 0, borderRadius: '10px', p: 1, background: '#F8F8F8' }} />
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default Login;