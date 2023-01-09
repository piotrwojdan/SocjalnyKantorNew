import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement } from "chart.js"

Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

function Plot({ price, data, days }) {
  const opts = {
    tooltips: {
      intersect: false,
      mode: "index"
    },
    responsive: true,
    maintainAspectRatio: false
  };

  if (price !== "0.00") {
    data.datasets[0].data = data.datasets[0].data.slice(-days);
    data.labels = data.labels.slice(-days);
  }

  if (price === "0.00") {
    return <h2>please select a currency pair</h2>;
  }
  return (
    <div className="dashboard">
      <h2>{`$${price}`}</h2>

      <div className="chart-container">
        {data && <Line data={data} options={opts} />}
      </div>
    </div>
  );
}

export default Plot;