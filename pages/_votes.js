import { Chart } from "react-google-charts";
//import { SimpleWordcloud } from "./_wordCloud";
import { BigNumber } from "ethers";

export const data = [
  ["Vote"],
  [69],
  [70],
  [70],
  [71],
  [72],
];

export const options = {
  title: "Votes",
  legend: { position: "none" },
  histogram: {
    bucketSize: 5,
    //maxNumBuckets: 200,
    //minValue: 0,
    //maxValue: 30,
  },
};

export function Votes(props) {
  
  const listItems = props?.votes?.map((item, index) => (
    <li key={index}>
      <div>{item.args[0]} : {BigNumber.from(item.args[1]).fromTwos(32).toString()}</div>
    </li>
  ));
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

