import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const MarketChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (data.length === 0) return;

    const ctx = chartRef.current.getContext('2d');

    // Group data by commodity
    const commodities = [...new Set(data.map(item => item.commodity))];
    
    const datasets = commodities.map(commodity => {
      const commodityData = data
        .filter(item => item.commodity === commodity)
        .sort((a, b) => new Date(a.date) - new Date(b.date));
      
      return {
        label: commodity,
        data: commodityData.map(item => item.price),
        borderColor: `#${Math.floor(Math.random()*16777215).toString(16)}`,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        tension: 0.1
      };
    });

    const labels = [...new Set(data.map(item => new Date(item.date).toLocaleDateString()))];

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Commodity Price Trends'
          },
        },
        scales: {
          y: {
            beginAtZero: false,
            title: {
              display: true,
              text: 'Price'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Date'
            }
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default MarketChart;