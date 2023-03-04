import { Chart } from "react-google-charts";
//import { SimpleWordcloud } from "./_wordCloud";
import { BigNumber } from "ethers";
import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
import HC_more from 'highcharts/highcharts-more' //module

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts);
  HC_more(Highcharts) //init module
}


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
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
        />
      </div>
    </div>
  );
}

export default Votes;