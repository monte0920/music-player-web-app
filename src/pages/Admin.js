import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import AdminSetting from "./AdminSetting";
import API from "../utils/api";
import { InstrumentType } from "../config";

const Admin = () => {
    const [file, setFile] = useState(null);
    const [type, setType] = useState("");
    const [instrument, setInstrument] = useState("");
    const [musics, setMusics] = useState([]);

    const handleFetchMusics = async () => {
        try {
            const res = await API(`get`, `music`);
            if (res.data) {
                setMusics(res.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteMusic = async (id) => {
        const res = await API(`delete`, `music/${id}`);

        if (res.data) {
            alert("Removed successfully", "success");
            setMusics(res.data);
        }
    };

    useEffect(() => {
        handleFetchMusics();
    }, []);

    const handleUpload = async () => {
        if (!file) return alert("Choose correct file", "warning");
        if (!type) return alert("Select instrument", "warning");
        if (!instrument) return alert("Select instrument", "warning");

        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", type);
        formData.append("instrument", instrument);

        const res = await API(`POST`, `music`, formData);
        if (res.data) {
            alert("Added successfully", "success");
            setMusics(res.data);
        }
    };

    return (
        <Stack
            sx={{
                background: "#F8F8F8",
            }}
        >
            <AppBar sx={{ background: "white", py: 2, boxShadow: "none" }}>
                <Typography
                    textAlign="center"
                    color="#1D1B8C"
                    fontSize={18}
                    fontWeight={900}
                >
                    HARPER // INTERACTIVE MUSIC PROJECT
                </Typography>
            </AppBar>
            <Stack spacing={5} alignItems="center">
                <Stack
                    sx={{
                        py: 12,
                        width: 500,
                    }}
                    spacing={5}
                >
                    <Stack spacing={2}>
                        <Typography
                            color="black"
                            fontSize={14}
                            fontWeight={900}
                        >
                            UPLOAD FILES
                        </Typography>
                        <Stack spacing={1} alignItems="center">
                            <Button variant="outlined" component="label">
                                {file ? file.name || "Upload" : "Upload"}
                                <input
                                    onChange={(e) => setFile(e.target.files[0])}
                                    hidden
                                    accept="audio/*"
                                    type="file"
                                />
                            </Button>
                        </Stack>
                    </Stack>
                    <Stack spacing={2}>
                        <Typography
                            color="black"
                            fontSize={14}
                            fontWeight={900}
                        >
                            FILE LIST
                        </Typography>
                        <Stack alignItems="start">
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                sx={{
                                    width: "500px",
                                    px: 1,
                                    py: 1.5,
                                    background: "#1D1B8C",
                                }}
                            >
                                <Typography
                                    fontSize={12}
                                    fontWeight={700}
                                    color="white"
                                >
                                    FILE NAME
                                </Typography>
                                <Typography
                                    fontSize={12}
                                    fontWeight={700}
                                    color="white"
                                >
                                    GROUP NAME
                                </Typography>
                            </Stack>
                            <Stack>
                                {musics.map((item, index) => (
                                    <Stack direction="row" key={index}>
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            sx={{
                                                width: "500px",
                                                px: 1,
                                                py: 1.5,
                                                background: "#FFFFFF",
                                                borderBottom:
                                                    "1px solid rgba(0, 0, 0, 0.1)",
                                            }}
                                        >
                                            <Typography
                                                fontSize={12}
                                                fontWeight={500}
                                                color="rgba(46, 46, 46, 0.5)"
                                            >
                                                {String(
                                                    `${
                                                        item.instrument +
                                                        item.type
                                                    }`
                                                ).toUpperCase()}
                                                {String(item.file_name).slice(
                                                    -4
                                                )}
                                            </Typography>
                                            <Typography
                                                fontSize={12}
                                                fontWeight={500}
                                                color="rgba(46, 46, 46, 0.5)"
                                            >
                                                {
                                                    InstrumentType[
                                                        item.instrument
                                                    ]
                                                }
                                            </Typography>
                                        </Stack>
                                        <Stack>
                                            <IconButton
                                                aria-label="delete"
                                                onClick={() =>
                                                    handleDeleteMusic(item.id)
                                                }
                                            >
                                                <CloseIcon />
                                            </IconButton>
                                        </Stack>
                                    </Stack>
                                ))}
                            </Stack>
                        </Stack>
                    </Stack>
                    <AdminSetting {...{ type, setInstrument, setType }} />
                    <Stack alignItems="center" pt={2}>
                        <Button
                            variant="outlined"
                            sx={{ width: "fit-content" }}
                            onClick={handleUpload}
                        >
                            SET MUSIC
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default Admin;
