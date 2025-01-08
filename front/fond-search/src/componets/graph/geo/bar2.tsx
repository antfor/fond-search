import { Group } from "@visx/group";
import { scaleBand, scaleLinear } from "@visx/scale";
import Bar from "@visx/shape/lib/shapes/Bar";

export interface HorizontalBarProps {
  height?: number,
  width?: number,
}

export default function BarChart({
  height = 285,
  width = 285,
}){
  const verticalMargin = 0;
  // bounds
  const xMax = width;
  const yMax = height;

  // accessors
  const getCoinName = (d: HorizontalBarData) => d.name;
  const getCoinCount = (d: HorizontalBarData) => Number(d.count);

  interface HorizontalBarData {
    name: string,
    count: number,
  }
  const coins: HorizontalBarData[] = [
    { name: "Bitcoin", count: 2 },
    { name: "Dodge", count: 12 },
    { name: "Solana", count: 9 },
  ];

  const yScale = scaleBand<string>({
    range: [0, yMax],
    round: true,
    domain: coins.map(getCoinName),
    padding: 0.4,
  });

  const xScale = scaleLinear<number>({
    range: [0, xMax],
    round: true,
    domain: [0, Math.max(...coins.map(getCoinCount))],
  });

  return (
    <svg width={width} height={height}>
      <Group top={20}>
        {coins.map((d) => {
          const name = getCoinName(d);
          const barWidth = yScale.bandwidth();
          const barHeight = xScale(getCoinCount(d));
          const barY = yScale(name);
          const barX = xMax - barHeight;
          return (
            <Bar
              key={`bar-${name}`}
              x={0}
              y={barY}
              width={barHeight}
              height={barWidth}
              fill="rgba(23, 23, 217, .5)"
            />
          );
        })}
      </Group>
    </svg>
  );
};