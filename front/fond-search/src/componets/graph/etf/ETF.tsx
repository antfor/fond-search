import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';
import {colorScale,addAlpha,bgScale} from 'src/assets/color.mts'

//'#be185d'
//rgba(244, 114, 182, 0.28)'
export const ChartComponent = props => {
    const {
        data,
        colors: {
            backgroundColor = bgScale.bg,
            lineColor = colorScale.bg700,
            textColor = 'white',
            areaTopColor = colorScale.bg700,
            areaBottomColor = addAlpha(colorScale.bg400,0.28),//'rgba(244, 114, 182, 0.28)',
        } = {},
    } = props;

    const chartContainerRef = useRef();

    useEffect(
        () => {
            const handleResize = () => {
                chart.applyOptions({ width: chartContainerRef.current.clientWidth });
            };

            const chart = createChart(chartContainerRef.current, {
                layout: {
                    background: { type: ColorType.Solid, color: backgroundColor },
                    textColor,
                },
                width: chartContainerRef.current.clientWidth,
                height: 300,
            });
            chart.timeScale().fitContent();

            const newSeries = chart.addAreaSeries({ lineColor, topColor: areaTopColor, bottomColor: areaBottomColor });
            newSeries.setData(data);

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);

                chart.remove();
            };
        },
        [data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
    );

    return (
        <div className='size-full'
            ref={chartContainerRef}
        />
    );
};

const initialData = [
    { time: '2018-12-22', value: 32.51 },
    { time: '2018-12-23', value: 31.11 },
    { time: '2018-12-24', value: 27.02 },
    { time: '2018-12-25', value: 27.32 },
    { time: '2018-12-26', value: 25.17 },
    { time: '2018-12-27', value: 28.89 },
    { time: '2018-12-28', value: 25.46 },
    { time: '2018-12-29', value: 23.92 },
    { time: '2018-12-30', value: 22.68 },
    { time: '2018-12-31', value: 22.67 },
];

const initialDataN = (n:number) => [
    { time: '2018-12-22', value: 32.51 * n },
    { time: '2018-12-23', value: 31.11 * n },
    { time: '2018-12-24', value: 27.02 * n },
    { time: '2018-12-25', value: 27.32 * n },
    { time: '2018-12-26', value: 25.17 * n },
    { time: '2018-12-27', value: 28.89 * n },
    { time: '2018-12-28', value: 25.46 * n },
    { time: '2018-12-29', value: 23.92 * n },
    { time: '2018-12-30', value: 22.68 * n },
    { time: '2018-12-31', value: 22.67 * n },
];

export function Etf(props) {
    return (
        <ChartComponent {...props} data={initialData}></ChartComponent>
    );
}