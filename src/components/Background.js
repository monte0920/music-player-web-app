import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
    DoubleSide,
    LineBasicMaterial,
    MeshPhongMaterial,
    SphereGeometry,
    Vector3,
    WireframeGeometry,
} from "three";

const twoPi = Math.PI * 2;

const Detect = () => {
    const { camera } = useThree();
    camera.position.z = 30;
};

const initialData = {
    radius: 15,
    widthSegments: 32,
    heightSegments: 16,
    phiStart: 0,
    phiLength: twoPi,
    thetaStart: 0,
    thetaLength: Math.PI,
};

const MyGroup = (props) => {
    const [data, setData] = useState(initialData);
    // const { playing, playingTracks, currentTime, duration, insts } = props;
    const { playing, insts } = props;
    console.log(data);
    useEffect(() => {
        if (playing) {
            setData({
                ...data,
                thetaStart: initialData.thetaStart + insts.Idrum + 2,
                widthSegments: initialData.widthSegments + insts.Iguitar * 10,
            });
        } else {
            setData(initialData);
        }
    }, [insts, playing]);

    // useEffect(() => {
    //     let timer;
    //     let _ct = currentTime;
    //     let _s = true;

    //     if (playing) {
    //         timer = setInterval(() => {
    //             let _n = Math.abs(
    //                 playingTracks[
    //                     parseInt(playingTracks.length * (_ct / duration), 10)
    //                 ] / 100000 || 0
    //             );

    //             const _ws = insts.Iguitar + insts.Isynth;

    //             setData((prev) => ({
    //                 ...prev,
    //                 widthSegments:
    //                     initialData.widthSegments +
    //                     (_s ? Math.abs(_n) + _ws : -(Math.abs(_n) + _ws)) +
    //                     (insts.Iguitar + insts.Isynth),
    //                 // phiLength: initialData.phiLength + _n,
    //                 thetaStart:
    //                     (_s ? 0 : Math.PI) +
    //                     Math.abs(_n * (1 + insts.Idrum / 10)),

    //                 thetaLength:
    //                     initialData.thetaLength -
    //                     Math.abs(_n * (1 + insts.Idrum / 10)) * 2,
    //             }));
    //             _ct += 2 / (playingTracks.length / duration);
    //             _s = !_s;
    //         }, 2000 / (playingTracks.length / duration));
    //     } else {
    //         setData(initialData);
    //     }

    //     return () => {
    //         clearInterval(timer);
    //     };
    // }, [playingTracks, playing, duration, insts]);

    const groupRef = useRef(null);

    const lineGeometry = useMemo(() => {
        return new WireframeGeometry(
            new SphereGeometry(
                data.radius,
                data.widthSegments,
                data.heightSegments,
                data.phiStart,
                data.phiLength,
                data.thetaStart,
                data.thetaLength
            )
        );
    }, [data]);

    const meshGeometry = useMemo(() => {
        return new SphereGeometry(
            data.radius,
            data.widthSegments,
            data.heightSegments,
            data.phiStart,
            data.phiLength,
            data.thetaStart,
            data.thetaLength
        );
    }, [data]);

    useFrame(() => {
        groupRef.current.rotation.x += 0.005;
        groupRef.current.rotation.y += 0.005;
    });

    return (
        <group ref={groupRef}>
            <lineSegments
                args={[
                    lineGeometry,
                    new LineBasicMaterial({
                        color: "#01579b",
                        transparent: true,
                        opacity: 0.5,
                    }),
                ]}
            ></lineSegments>
            <mesh
                args={[
                    meshGeometry,
                    new MeshPhongMaterial({
                        color: "#1D1B8C",
                        emissive: 0x072534,
                        side: DoubleSide,
                        flatShading: true,
                    }),
                ]}
            ></mesh>
        </group>
    );
};

const ThreeBg = (props) => {
    return (
        <div id="canvas-container">
            <Canvas
                style={{ width: "100%", height: "100%", background: "#1D1B8C" }}
            >
                <ambientLight intensity={0.2} />
                <directionalLight color="#0d47a1" position={[0, 0, 5]} />

                <pointLight
                    args={[0xffffff, 1, 0]}
                    position={new Vector3(0, 200, 0)}
                />
                <pointLight
                    args={[0xffffff, 1, 0]}
                    position={new Vector3(100, 200, 100)}
                />
                <pointLight
                    args={[0xffffff, 1, 0]}
                    position={new Vector3(-100, -200, -100)}
                />
                <Detect />
                <MyGroup {...props} />
            </Canvas>
        </div>
    );
};

export default ThreeBg;
