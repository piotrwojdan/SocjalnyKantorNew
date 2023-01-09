import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement} from "chart.js"

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
//  console.log(data)
  // let someDays = data.datasets[0].data.slice(-days);
  // data.datasets[0].data = someDays;

  if (price === "0.00") {
    return <h2>please select a currency pair</h2>;
  }
  return (
    <div className="dashboard">
      <h2>{`$${price}`}</h2>

      <div className="chart-container">
        <Line data={data} options={opts} />
      </div>
    </div>
  );
}

export default Plot;