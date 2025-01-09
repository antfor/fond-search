import React from 'react';
import { scaleQuantize } from '@visx/scale';
import { NaturalEarth,Graticule } from '@visx/geo';
import * as topojson from 'topojson-client';
import topology from './world-topo.json';
import {colorScaleArr} from 'src/assets/color.mts'
import BarChart from './bar'

export const background = '#111827';

export type GeoMercatorProps = {
  className: string;
  width: number;
  height: number;
  events?: boolean;
};

interface FeatureShape {
  type: 'Feature';
  id: string;
  geometry: { coordinates: [number, number][][]; type: 'Polygon' };
  properties: { name: string };
}

// @ts-expect-error json has no type
const world = topojson.feature(topology, topology.objects.units) as {
  type: 'FeatureCollection';
  features: FeatureShape[];
};

const color = scaleQuantize({
  domain: [
    Math.min(...world.features.map((f) => f.geometry.coordinates.length)),
    Math.max(...world.features.map((f) => f.geometry.coordinates.length)),
  ],
  range: colorScaleArr,
});

//height={height}
export default function Geo({className, width, height, events = true }: GeoMercatorProps) {
  const centerX = width / 2;
  const centerY = height / 2;
  const scale = (width / 630) * 100;
  //console.log(world.features);
  //
 
  return (
    <>
    <svg className={className} height={height} width={width} >
      <rect x={0} y={0} width={width} height={height} fill={background} rx={14} />
      <NaturalEarth<FeatureShape>
        data={world.features}
        scale={scale}
        translate={[centerX, centerY]}
      >
        {(mercator) => (
          <g>
            <Graticule graticule={(g) => mercator.path(g) || ''} stroke="rgba(255,255,255,0.20)" />
            {mercator.features.map(({ feature, path }, i) => (
              <path
                key={`map-feature-${i}`}
                d={path || ''}
                fill={color(feature.geometry.coordinates.length)}
                stroke={background}
                strokeWidth={0.0}
                onClick={() => {
                  if (events) alert(`Clicked: ${feature.properties.name} (${feature.id})`);
                }}
              />
            ))}
          </g>
        )}
      </NaturalEarth>
    </svg>

    <BarChart width={width} height={width}/>
    </>
  );
}
