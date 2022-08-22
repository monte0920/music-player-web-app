import React, { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
    DoubleSide,
    LineBasicMaterial,
    MeshPhongMaterial,
    SphereGeometry,
    Vector3,
    WireframeGeometry,
} from 'three';

const twoPi = Math.PI * 2;

const data = {
    radius: 15,
    widthSegments: 32,
    heightSegments: 16,
    phiStart: 0,
    phiLength: twoPi,
    thetaStart: 0,
    thetaLength: Math.PI
};
new SphereGeometry(
    data.radius, data.widthSegments, data.heightSegments, data.phiStart, data.phiLength, data.thetaStart, data.thetaLength
)

const Detect = () => {
    const { camera } = useThree();
    camera.position.z = 30;
}

const MyGroup = () => {


    const groupRef = useRef(null);

    const lineGeometry = useMemo(() => {
        return new WireframeGeometry(new SphereGeometry(
            data.radius, data.widthSegments, data.heightSegments, data.phiStart, data.phiLength, data.thetaStart, data.thetaLength
        ));
    }, []);

    const meshGeometry = useMemo(() => {

        return new SphereGeometry(
            data.radius, data.widthSegments, data.heightSegments, data.phiStart, data.phiLength, data.thetaStart, data.thetaLength
        );
    }, []);

    useFrame(() => {
        groupRef.current.rotation.x += 0.005;
        groupRef.current.rotation.y += 0.005;
    })


    return <group ref={groupRef}>
        <lineSegments args={[lineGeometry, new LineBasicMaterial({ color: '#01579b', transparent: true, opacity: 0.5 })]}>
        </lineSegments>
        <mesh args={[meshGeometry, new MeshPhongMaterial({ color: '#1D1B8C', emissive: 0x072534, side: DoubleSide, flatShading: true })]}>
        </mesh>
    </group>;
}

const ThreeBg = () => {

    return (
        <div id="canvas-container" >
            <Canvas style={{ width: '100%', height: '100%', background: '#1D1B8C' }}>
                <ambientLight intensity={0.2} />
                <directionalLight color="#0d47a1" position={[0, 0, 5]} />

                <pointLight args={[0xffffff, 1, 0]} position={new Vector3(0, 200, 0)} />
                <pointLight args={[0xffffff, 1, 0]} position={new Vector3(100, 200, 100)} />
                <pointLight args={[0xffffff, 1, 0]} position={new Vector3(- 100, - 200, - 100)} />
                <Detect />
                <MyGroup />
            </Canvas>
        </div >
    )
}

export default ThreeBg;