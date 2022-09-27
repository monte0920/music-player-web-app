import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { SETTINGS } from "../config";

const AdminSetting = () => {
    const [setting, setSetting] = useState();

    return (
        <Stack sx={{ width: 500 }}>
            <Stack
                sx={{ height: "100%", overflow: "auto" }}
                className="home-setting"
                spacing={1}
            >
                <Typography
                    letterSpacing={0.05}
                    fontSize={14}
                    fontWeight={900}
                    color="#000000"
                    fontFamily={"Inter"}
                >
                    DEFAULT SETTINGS
                </Typography>
                <Stack
                    spacing={10}
                >
                    <Stack spacing={3}>
                        <Typography
                            letterSpacing={0.05}
                            fontSize={14}
                            fontWeight={900}
                            color="rgba(46, 46, 46, 0.75)"
                            fontFamily={"Inter"}
                        >
                            DRUM PATTERN
                        </Typography>
                        <Stack direction="row" justifyContent={"space-between"}>
                            {SETTINGS.drum.map((item, index) => {
                                return (
                                    <Stack
                                        key={index}
                                        spacing={2}
                                        alignItems="center"
                                        sx={{
                                            width: "20%",
                                        }}
                                    >
                                        <Button
                                            onClick={() => setSetting(item.id)}
                                            sx={{
                                                background:
                                                    item.id == setting
                                                        ? "#1D1B8C"
                                                        : "transparent",
                                                width: 47,
                                                height: 47,
                                                minWidth: 0,
                                                borderRadius: 47,
                                                border: "1px solid rgba(46, 46, 46, 0.5)",
                                                color: "white",
                                                "&:hover": {
                                                    background: "#1d1b8ce3",
                                                },
                                                "&:active": {
                                                    background: "#1D1B8C",
                                                },
                                            }}
                                        ></Button>
                                        <Typography
                                            textAlign="center"
                                            color={
                                                item.id == setting
                                                    ? "#1D1B8C"
                                                    : "rgba(46, 46, 46, 0.5)"
                                            }
                                            fontSize={12}
                                            fontWeight={700}
                                            fontFamily={"Inter"}
                                        >
                                            {item.title}
                                        </Typography>
                                    </Stack>
                                );
                            })}
                        </Stack>
                    </Stack>
                    <Stack spacing={3}>
                        <Typography
                            letterSpacing={0.05}
                            fontSize={14}
                            fontWeight={900}
                            color="rgba(46, 46, 46, 0.75)"
                            fontFamily={"Inter"}
                            sx={{ ml: 2 }}
                        >
                            GUITAR LEAD
                        </Typography>
                        <Stack direction="row" justifyContent={"space-between"}>
                            {SETTINGS.guitar.map((item, index) => {
                                return (
                                    <Stack
                                        key={index}
                                        spacing={2}
                                        alignItems="center"
                                        sx={{
                                            width: "20%",
                                        }}
                                    >
                                        <Button
                                            onClick={() => setSetting(item.id)}
                                            sx={{
                                                background:
                                                    item.id == setting
                                                        ? "#1D1B8C"
                                                        : "transparent",
                                                width: 47,
                                                height: 47,
                                                minWidth: 0,
                                                borderRadius: 47,
                                                border: "1px solid rgba(46, 46, 46, 0.5)",
                                                color: "white",
                                                "&:hover": {
                                                    background: "#1d1b8ce3",
                                                },
                                                "&:active": {
                                                    background: "#1D1B8C",
                                                },
                                            }}
                                        ></Button>
                                        <Typography
                                            textAlign="center"
                                            color={
                                                item.id == setting
                                                    ? "#1D1B8C"
                                                    : "rgba(46, 46, 46, 0.5)"
                                            }
                                            fontSize={12}
                                            fontWeight={700}
                                            fontFamily={"Inter"}
                                        >
                                            {item.title}
                                        </Typography>
                                    </Stack>
                                );
                            })}
                        </Stack>
                    </Stack>
                    <Stack spacing={3}>
                        <Typography
                            letterSpacing={0.05}
                            fontSize={14}
                            fontWeight={900}
                            color="rgba(46, 46, 46, 0.75)"
                            fontFamily={"Inter"}
                            sx={{ ml: 2 }}
                        >
                            SYNTH STYLE
                        </Typography>
                        <Stack direction="row" justifyContent={"space-between"}>
                            {SETTINGS.synth.map((item, index) => {
                                return (
                                    <Stack
                                        key={index}
                                        spacing={2}
                                        alignItems="center"
                                        sx={{
                                            width: "20%",
                                        }}
                                    >
                                        <Button
                                            onClick={() => setSetting(item.id)}
                                            sx={{
                                                background:
                                                    item.id == setting
                                                        ? "#1D1B8C"
                                                        : "transparent",
                                                width: 47,
                                                height: 47,
                                                minWidth: 0,
                                                borderRadius: 47,
                                                border: "1px solid rgba(46, 46, 46, 0.5)",
                                                color: "white",
                                                "&:hover": {
                                                    background: "#1d1b8ce3",
                                                },
                                                "&:active": {
                                                    background: "#1D1B8C",
                                                },
                                            }}
                                        ></Button>
                                        <Typography
                                            color={
                                                item.id == setting
                                                    ? "#1D1B8C"
                                                    : "rgba(46, 46, 46, 0.5)"
                                            }
                                            fontSize={12}
                                            fontWeight={700}
                                            fontFamily={"Inter"}
                                        >
                                            {item.title}
                                        </Typography>
                                    </Stack>
                                );
                            })}
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default AdminSetting;
