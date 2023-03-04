import { Chart } from "react-google-charts";
//import { SimpleWordcloud } from "./_wordCloud";
import { BigNumber } from "ethers";

/*const data = [
  ["Vote"],
  [69],
  [70],
  [70],
  [71],
  [72],
];*/

const options = {
  title: "Votes",
  legend: { position: "none" },
  histogram: {
    bucketSize: 5,
    //maxNumBuckets: 200,
    //minValue: 0,
    //maxValue: 30,
  },
};

function Votes(props) {

  return (
    <div>
      <Chart
        chartType="Histogram"
        width="100%"
        height="400px"
        data={props.chartData}
        options={options}
      />
      <br/>
      <br/>
    </div>
  );
}

export default Votes;