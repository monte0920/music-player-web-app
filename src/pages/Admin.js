import React from "react";
import Stack from "@mui/material/Stack";
import AppBar from "@mui/material/AppBar";
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";

const Admin = () => {
    return (
        <Stack
            sx={{
                height: '100%',
                background: '#F8F8F8'
            }}
        >
            <AppBar sx={{ background: 'white', py: 2, boxShadow: 'none' }}>
                <Typography textAlign='center' color="#1D1B8C" fontSize={18} fontWeight={900}>HARPER // INTERACTIVE MUSIC PROJECT</Typography>
            </AppBar>
            <Stack spacing={5}
                alignItems='center'
            >
                <Stack
                    sx={{
                        pt: 12,
                        width: 500,
                    }}
                    spacing={5}
                >
                    <Stack spacing={2}>
                        <Typography color="black" fontSize={14} fontWeight={900}>UPLOAD FILES</Typography>
                        <Stack spacing={1} alignItems='center'>
                            <Button variant="outlined" component="label">
                                Upload
                                <input hidden accept="image/*" multiple type="file" />
                            </Button>
                        </Stack>
                    </Stack>
                    <Stack spacing={2}>
                        <Typography color="black" fontSize={14} fontWeight={900}>FILE LIST</Typography>
                        <Stack spacing={1} alignItems='center'>
                            <Button variant="outlined" component="label">
                                Upload
                                <input hidden accept="image/*" multiple type="file" />
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default Admin;