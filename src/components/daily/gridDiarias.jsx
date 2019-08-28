import React from 'react';
import {dcContext} from "../dcContext";
import * as dc from "dc";
import * as d3 from "d3";
import {print_filter} from '../util/print-filter';


export const GridDiarias = (props) => {
  const context = React.useContext(dcContext);
  const [chart, updateChart] = React.useState(null);
  const dailies = context.dailies;
  const div = React.useRef(null);
  React.useEffect(() => {
    const newChart = makeTable(div.current, dailies, props.setSelectedDaily);
    newChart.render();
    updateChart(newChart);
  }, 1);

  return (
    <div className="dc-table">
      <h2>Diárias</h2>
      <div ref={div} className="grid-layout">
      </div>
    </div>
  )

}

const makeTable = (divRef, datum, setDaily) => {
  const dailyTable = dc.dataGrid(divRef);
  const dateParse = d3.timeFormat("%d/%m/%Y");

  const dateDimension = datum.dimension(d => d.ChegadaHD);

  // print_filter(dateDimension);

  const makeCell = (d) => {

    console.log(d);
    console.log(d.daily_name);
    const daily_name = d.daily_name;
    return `<div className="cell">
                <div>${daily_name}</div>
            </div>`
  };

  dailyTable
    .dimension(dateDimension)
    .section(d => d.daily_name)
    .size(100)
    .htmlSection(function (d) {
      return ""
    })
    .html(function (d) {
      return makeCell(d);
    })
    .sortBy(d => d.ChegadaHD)
    .order(d3.ascending);

  dailyTable
    .renderlet(function (chart) {
      chart.selectAll('div').on('click', (d) => setDaily(d));
    });



  return dailyTable;
};
