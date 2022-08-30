/* eslint-disable react/prop-types */

import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

function LineChart({ chartData }) {
  return (
    <Line
      data={chartData}
      options={{
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Price (Last 30 days)',
            color: 'white',
          },
          legend: {
            display: false,
          },
        },
        interaction: {
          mode: 'index',
          intersect: false,
        },
        scales: {
          x: {
            display: true,
            ticks: {
              color: 'white',
            },
          },
          y: {
            display: true,
            ticks: {
              color: 'white',
            },
          },
        },
      }}
    />
  );
}

export default LineChart;
