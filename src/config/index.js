export const SETTINGS = {
    drum: [
        {
            id: "offbeat",
            title: "OFFBEAT",
        },
        {
            id: "halftime",
            title: "HALF TIME",
        },
        {
            id: "filled",
            title: "FILLED",
        },
        {
            id: "lessmore",
            title: "LESS IS MORE",
        },
        {
            id: "basic",
            title: "BASIC",
        },
    ],
    guitar: [
        {
            id: "lightdistortion",
            title: "LIGHT DISTORTION",
        },
        {
            id: "lessdistortion",
            title: "LESS DISTORTION",
        },
        {
            id: "milddistortion",
            title: "MILD DISTORTION",
        },
        {
            id: "moredistortion",
            title: "MORE DISTORTION",
        },
        {
            id: "heavydistortion",
            title: "HEAVY DISTORTION",
        },
    ],
    synth: [
        {
            id: "wavy",
            title: "WAVY",
        },
        {
            id: "square",
            title: "SQUARE",
        },
        {
            id: "bassy",
            title: "BASSY",
        },
        {
            id: "vibrate",
            title: "VIBRATE",
        },
        {
            id: "wonky",
            title: "WONKY",
        },
    ],
};

export function formatSecondsAsTime(secs) {
    let hr = Math.floor(secs / 3600);
    let min = Math.floor((secs - hr * 3600) / 60);
    let sec = Math.floor(secs - hr * 3600 - min * 60);

    if (min < 10) {
        min = `0${min}`;
    }
    if (sec < 10) {
        sec = `0${sec}`;
    }

    return `${min}:${sec}`;
}
