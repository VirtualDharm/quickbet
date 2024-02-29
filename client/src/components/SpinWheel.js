// SpinWheel.js
 
import React, { useEffect, useRef } from 'react';
import './SpinWheel.css';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register the doughnut controller type
Chart.register(ChartDataLabels);

const SpinWheel = ({ token, fetchLatestBet, setPoolAmount }) => {
  const spinChartRef = useRef(null);

  useEffect(() => {
    const spinWheel = document.getElementById("spinWheel");
    const spinBtn = document.getElementById("spin_btn");
    const text = document.getElementById("text");

    if (spinWheel && spinBtn && text) {
      const spinValues = [
        { minDegree: 61, maxDegree: 90, value: 100 },
        { minDegree: 31, maxDegree: 60, value: 200 },
        { minDegree: 0, maxDegree: 30, value: 300 },
        { minDegree: 331, maxDegree: 360, value: 400 },
        { minDegree: 301, maxDegree: 330, value: 500 },
        { minDegree: 271, maxDegree: 300, value: 600 },
        { minDegree: 241, maxDegree: 270, value: 700 },
        { minDegree: 211, maxDegree: 240, value: 800 },
        { minDegree: 181, maxDegree: 210, value: 900 },
        { minDegree: 151, maxDegree: 180, value: 1000 },
        { minDegree: 121, maxDegree: 150, value: 1100 },
        { minDegree: 91, maxDegree: 120, value: 1200 },
        // Add other spin values
      ];
      const size = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
      var spinColors = [
        "#E74C3C",
        "#7D3C98",
        "#2E86C1",
        "#138D75",
        "#F1C40F",
        "#D35400",
        "#138D75",
        "#F1C40F",
        "#b163da",
        "#E74C3C",
        "#7D3C98",
        "#138D75",
        // Add other colors
      ];

      // Create or update the Chart
      spinChartRef.current = new Chart(spinWheel, {
        type: 'pie',
        data: {
          labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          datasets: [
            {
              backgroundColor: spinColors,
              data: size,
            },
          ],
        },
        options: {
            responsive: true,
            animation: { duration: 0 },
            plugins: {
              tooltip: false,
              legend: {
                display: false,
              },
              datalabels: {
                rotation: 90,
                color: "#ffffff",
                formatter: (_, context) => context.chart.data.labels[context.dataIndex],
                font: { size: 24 },
              },
            },
        },
      });

      const generateValue = (angleValue) => {
        for (let i of spinValues) {
          if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
            text.innerHTML = `<p>Congratulations, You Have Won $${i.value} ! </p>`;
            spinBtn.disabled = false;
            break;
          }
        }
      };

      // Add event listener to spin button
      let count = 0;
      let resultValue = 101;  
      spinBtn.addEventListener("click", () => {
        spinBtn.disabled = true;
        text.innerHTML = `<p>Best Of Luck!</p>`;
        let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
        let rotationInterval = window.setInterval(() => {
            spinChartRef.current.options.rotation = spinChartRef.current.options.rotation + resultValue;
            spinChartRef.current.update();
            if (spinChartRef.current.options.rotation >= 360) {
            count += 1;
            resultValue -= 5;
            spinChartRef.current.options.rotation = 0;
            } else if (count > 15 && spinChartRef.current.options.rotation == randomDegree) {
            generateValue(randomDegree);
            clearInterval(rotationInterval);
            count = 0;
            resultValue = 101;
            }
        }, 10);
      });
    }

    // Cleanup function
    return () => {
      if (spinChartRef.current) {
        spinChartRef.current.destroy();
      }
    };
  }, []); // Empty dependency array to ensure the effect runs only once

  return (
    <div>
      <h1>JACKPOT</h1>
      <div className="container">
        <div className="wheel_box">
          <canvas id="spinWheel"></canvas>
          <button id="spin_btn">Spin</button>
          <i className="fa-solid fa-location-arrow"></i>
        </div>
        <div id="text"><p>Wheel Of Fortune</p></div>
      </div>
    </div>
  );
};

export default SpinWheel;
