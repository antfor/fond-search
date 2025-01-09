


import React, { useMemo } from 'react';
import { Bar } from '@visx/shape';
import { Group } from '@visx/group';
import { GradientPinkRed } from '@visx/gradient';
import letterFrequency, { LetterFrequency } from '@visx/mock-data/lib/mocks/letterFrequency';
import { scaleBand, scaleLinear } from '@visx/scale';
import { Text } from '@visx/text';
import {colorScale, addAlpha} from 'src/assets/color.mjs'

const data = letterFrequency.slice(0,5);
const verticalMargin = 120;

// accessors
const getLetter = (d: LetterFrequency) => d.letter;
const getLetterFrequency = (d: LetterFrequency) => Number(d.frequency) * 100;

export type BarsProps = {
  width: number;
  height: number;
  events?: boolean;
};

export default function Example({ width, height, events = false }: BarsProps) {
  console.log(data)
  // bounds
  const padding = 16;
  const xMax = width-padding*2;
  const yMax = height - verticalMargin;
  
  // scales, memoize for performance
  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, xMax],
        round: true,
        domain: data.map(getLetter),
        padding: 0.4,
      }),
    [xMax],
  );
  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...data.map(getLetterFrequency))],
      }),
    [yMax],
  );

  const round = xScale.bandwidth()/2;
  
  return (
    <div>
    <h3 className='text-xl font-bold'>Country Weights</h3>
    <svg width={width} height={height}>
      <GradientPinkRed id="teal" vertical={false} to={colorScale.bg500} from={colorScale.bg700}/>
      <rect width={width} height={height} fill="rgba(23, 233, 217, .0)" rx={14} />
      <Group>
        {data.map((d) => {
          const letter = getLetter(d);
          const barWidth = xScale.bandwidth();
          const barHeight = yMax - (yScale(getLetterFrequency(d)) ?? 0);
          const barX = xScale(letter);
          return (
            <Group key={`bar-${letter}`}>
            <Bar
              x={padding}
              y={barX}
              width={xMax}
              height={barWidth}
              fill={addAlpha(colorScale.bg800,0.1)}
              rx={round}
              onClick={() => {
                if (events) alert(`clicked: ${JSON.stringify(Object.values(d))}`);
              }}
            /> 
            <Bar
              x={padding}
              y={barX}
              width={barHeight}
              height={barWidth}
              fill="url(#teal)"
              rx={round}
              onClick={() => {
                if (events) alert(`clicked: ${JSON.stringify(Object.values(d))}`);
              }}
            /> 
            <Text 
              x={padding*2}
              y={(barX ? barX : 0) + barWidth/2}
              verticalAnchor="middle">Europe</Text> 
            <Text 
              x={xMax}
              y={(barX ? barX : 0) + barWidth/2}
              verticalAnchor="middle" textAnchor="end">20.00%</Text>     
            </Group>
          );
        })}
      
      </Group>
    </svg>
    </div>
  );
}