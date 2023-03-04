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

  const countsByNetwork = props.countsByNetwork;

  const chartOptions = {
    navigation: {
      buttonOptions: {
        enabled: false
      }
    },
    title: "",
    chart: {
      type: 'packedbubble'
    },
    legend: {
      enabled: false
    },
    tooltip: {
      enabled: false
    },
    plotOptions: {
      packedbubble: {
        dataLabels: {
          enabled: true,
          format: '{point.name}',
          style: {
            fontSize: "20px"
          }
        },
        minSize: "10%",
        maxSize: "100%",
      }
    },
    series: [{
      data: [
        {
          value: 0,
          name: "",
          marker: {
            fillColor: '#FFFFFF',
            lineWidth: 0
          },
        },
        {
          value: countsByNetwork.get(11155111) || 1,
          name: "sepolia",
          color: "purple"
        },
        {
          value: countsByNetwork.get(5) || 1,
          name: "goerli",
          color: "red"
        }
      ]
    }]
  }

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