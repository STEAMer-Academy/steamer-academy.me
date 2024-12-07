// @ts-nocheck
"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { Color, Scene, Fog, PerspectiveCamera, Vector3 } from "three";
import ThreeGlobe from "three-globe";
import { useThree, Object3DNode, Canvas, extend } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import countries from "@/data/globe.json";

declare module "@react-three/fiber" {
  interface ThreeElements {
    threeGlobe: Object3DNode<ThreeGlobe, typeof ThreeGlobe>;
  }
}

extend({ ThreeGlobe });

const RING_PROPAGATION_SPEED = 3;
const ASPECT = 1.2;
const CAMERA_Z = 300;

type Position = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

type GlobeConfig = {
  pointSize: number;
  globeColor: string;
  showAtmosphere: boolean;
  atmosphereColor: string;
  atmosphereAltitude: number;
  emissive: string;
  emissiveIntensity: number;
  shininess: number;
  polygonColor: string;
  ambientLight: string;
  directionalLeftLight: string;
  directionalTopLight: string;
  pointLight: string;
  arcTime: number;
  arcLength: number;
  rings: number;
  maxRings: number;
  initialPosition: {
    lat: number;
    lng: number;
  };
  autoRotate: boolean;
  autoRotateSpeed: number;
};

interface WorldProps {
  globeConfig: GlobeConfig;
  data: Position[];
  className?: string;
}

const defaultGlobeConfig: GlobeConfig = {
  pointSize: 1,
  globeColor: "#1d072e",
  showAtmosphere: true,
  atmosphereColor: "#ffffff",
  atmosphereAltitude: 0.1,
  emissive: "#000000",
  emissiveIntensity: 0.1,
  shininess: 0.9,
  polygonColor: "rgba(255,255,255,0.7)",
  ambientLight: "#ffffff",
  directionalLeftLight: "#ffffff",
  directionalTopLight: "#ffffff",
  pointLight: "#ffffff",
  arcTime: 2000,
  arcLength: 0.9,
  rings: 1,
  maxRings: 3,
  initialPosition: { lat: 0, lng: 0 },
  autoRotate: true,
  autoRotateSpeed: 0.5,
};

const hexToRgb = (hex: string) => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

const genRandomNumbers = (min: number, max: number, count: number) => {
  const arr = new Set<number>();
  while (arr.size < count) {
    arr.add(Math.floor(Math.random() * (max - min)) + min);
  }
  return Array.from(arr);
};

const Globe: React.FC<WorldProps> = ({ globeConfig, data }) => {
  const globeRef = useRef<ThreeGlobe>(null);
  const [globeReady, setGlobeReady] = useState(false);

  const mergedConfig = useMemo(
    () => ({ ...defaultGlobeConfig, ...globeConfig }),
    [globeConfig],
  );

  const globeData = useMemo(() => {
    const points = data.flatMap((arc) => {
      const rgb = hexToRgb(arc.color);
      const colorFn = (t: number) =>
        rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${1 - t})` : arc.color;

      return [
        {
          size: mergedConfig.pointSize,
          order: arc.order,
          color: colorFn,
          lat: arc.startLat,
          lng: arc.startLng,
        },
        {
          size: mergedConfig.pointSize,
          order: arc.order,
          color: colorFn,
          lat: arc.endLat,
          lng: arc.endLng,
        },
      ];
    });

    return points.filter(
      (v, i, a) =>
        a.findIndex((v2) => v2.lat === v.lat && v2.lng === v.lng) === i,
    );
  }, [data, mergedConfig.pointSize]);

  useEffect(() => {
    if (globeRef.current) {
      const globe = globeRef.current;
      const globeMaterial = globe.globeMaterial() as any;
      globeMaterial.color = new Color(mergedConfig.globeColor);
      globeMaterial.emissive = new Color(mergedConfig.emissive);
      globeMaterial.emissiveIntensity = mergedConfig.emissiveIntensity;
      globeMaterial.shininess = mergedConfig.shininess;

      globe
        .hexPolygonsData(countries.features)
        .hexPolygonResolution(3)
        .hexPolygonMargin(0.7)
        .showAtmosphere(mergedConfig.showAtmosphere)
        .atmosphereColor(mergedConfig.atmosphereColor)
        .atmosphereAltitude(mergedConfig.atmosphereAltitude)
        .hexPolygonColor(() => mergedConfig.polygonColor);

      setGlobeReady(true);
    }
  }, [globeRef.current, mergedConfig]);

  useEffect(() => {
    if (globeReady && globeRef.current) {
      const globe = globeRef.current;
      globe
        .arcsData(data)
        .arcStartLat((d: Position) => d.startLat)
        .arcStartLng((d: Position) => d.startLng)
        .arcEndLat((d: Position) => d.endLat)
        .arcEndLng((d: Position) => d.endLng)
        .arcColor((e: Position) => e.color)
        .arcAltitude((e: Position) => e.arcAlt)
        .arcStroke(() => [0.32, 0.28, 0.3][Math.round(Math.random() * 2)])
        .arcDashLength(mergedConfig.arcLength)
        .arcDashInitialGap((e: Position) => e.order)
        .arcDashGap(15)
        .arcDashAnimateTime(() => mergedConfig.arcTime)
        .pointsData(globeData)
        .pointColor((e: any) => e.color)
        .pointsMerge(true)
        .pointAltitude(0.0)
        .pointRadius(2);

      const interval = setInterval(() => {
        const numbersOfRings = genRandomNumbers(
          0,
          data.length,
          Math.floor((data.length * 4) / 5),
        );
        globe
          .ringsData(globeData.filter((_, i) => numbersOfRings.includes(i)))
          .ringColor((e: any) => (t: number) => e.color(t))
          .ringMaxRadius(mergedConfig.maxRings)
          .ringPropagationSpeed(RING_PROPAGATION_SPEED)
          .ringRepeatPeriod(
            (mergedConfig.arcTime * mergedConfig.arcLength) /
              mergedConfig.rings,
          );
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [globeReady, data, globeData, mergedConfig]);

  return <threeGlobe ref={globeRef} />;
};

const WebGLRendererConfig: React.FC = () => {
  const { gl, size } = useThree();

  useEffect(() => {
    gl.setPixelRatio(window.devicePixelRatio);
    gl.setSize(size.width, size.height);
    gl.setClearColor(0xffaaff, 0);
  }, [gl, size]);

  return null;
};

const World: React.FC<WorldProps> = (props) => {
  const { globeConfig } = props;
  const scene = useMemo(() => {
    const s = new Scene();
    s.fog = new Fog(0xffffff, 400, 2000);
    return s;
  }, []);

  return (
    <Canvas scene={scene} camera={new PerspectiveCamera(50, ASPECT, 180, 1800)}>
      <WebGLRendererConfig />
      <ambientLight color={globeConfig.ambientLight} intensity={0.6} />
      <directionalLight
        color={globeConfig.directionalLeftLight}
        position={new Vector3(-400, 100, 400)}
      />
      <directionalLight
        color={globeConfig.directionalTopLight}
        position={new Vector3(-200, 500, 200)}
      />
      <pointLight
        color={globeConfig.pointLight}
        position={new Vector3(-200, 500, 200)}
        intensity={0.8}
      />
      <Globe {...props} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minDistance={CAMERA_Z}
        maxDistance={CAMERA_Z}
        autoRotateSpeed={globeConfig.autoRotateSpeed}
        autoRotate={globeConfig.autoRotate}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI - Math.PI / 3}
      />
    </Canvas>
  );
};

export default World;
