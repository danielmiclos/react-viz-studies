import React from 'react';
import {dcContext} from "../dcContext";
import * as dc from "dc";
import * as d3 from "d3";

export const PureD3test = (props) => {
  const context = React.useContext(dcContext);

  const datum = context.datum;
  const div = React.useRef(null);

  React.useEffect(() => {
    // const newChart = props.chartFunction(div.current, dailies);
    // newChart.render();
    // updateChart(newChart);
    createChart(div, datum);
  }, );

  const createChart = (node, datum) => {

    // const {width, height} = props;
    const sum = (acc, curr) => acc + Number(curr.Quantidade);

    console.log("datum is: ", datum);



    return (<h1>{Math.round(datum.reduce(sum, 0))} GBs</h1>);
  };

  return (
    <div >
      <h2>{props.title}</h2>
      <div ref={div}>
        {createChart(div, datum)}
      </div>
    </div>
  )

}
