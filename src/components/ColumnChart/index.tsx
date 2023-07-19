import React from 'react';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
    responsive: true,
    interaction: {
        mode: 'index' as const,
        intersect: false,
    },
    stacked: false,
    plugins: {
        title: {
            display: true,
            text: '',
        },
    },
    scales: {
        y: {
            type: 'linear' as const,
            display: true,
            position: 'left' as const,
        },
    },
};

interface IProps {
    data: { labels: string[]; datasets: { label: string; data: number[]; backgroundColor: string }[] };
}

const ChartColumn: React.FC<IProps> = ({ data }) => {
    return <Bar options={options} data={data} />;
};

export default React.memo(ChartColumn);
