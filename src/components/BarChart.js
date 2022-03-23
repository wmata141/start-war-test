import React from "react"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS } from "chart.js/auto";

function BarChart({ labels, data }) {
  const chartData = {
    labels,
    datasets: [
      {
        label: "Visitas",
        data,
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        hoverBackgroundColor: 'rgba(0,255,0,0.5)',
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };

  return <Bar data={chartData} />;
}

export default BarChart;