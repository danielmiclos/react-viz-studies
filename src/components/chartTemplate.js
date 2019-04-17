import React from 'react';
import {dcContext} from "./dcContext";
import * as dc from "dc";

export const ChartTemplate = (props) => {
  const context = React.useContext(dcContext);
  const [chart, updateChart] = React.useState(null);
  const dailies = context.dailies;
  const div = React.useRef(null);
  React.useEffect(() => {
    const newChart = props.chartFunction(div.current, dailies);
    newChart.render();
    updateChart(newChart);
  }, 1);

  return (
    <div ref={div}>
      <h2>{props.title}</h2>
      <span onClick={() => {
          chart.filterAll();
          dc.redrawAll();
        }} className="reset">reset</span>

    </div>
  )

}
