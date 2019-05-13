import React from 'react';
import {dcContext} from "../dcContext";
import * as dc from "dc";
import * as d3 from "d3";
import {print_filter} from '../util/print-filter';


export const TableDiaria = (props) => {
  const context = React.useContext(dcContext);
  const [chart, updateChart] = React.useState(null);
  const dailies = context.dailies;
  const div = React.useRef(null);
  React.useEffect(() => {
    const newChart = makeTable(div.current, dailies);
    newChart.render();
    updateChart(newChart);
  }, 1);

  return (
    <div className="dc-table">
      <h2>Diárias</h2>
    <table ref={div} className="table-layout">
    </table>
    </div>
  )

}

const makeTable = (divRef, datum) => {
  const dailyTable = dc.dataTable(divRef);
  const dateParse = d3.timeFormat("%d/%m/%Y");

  const dateDimension = datum.dimension(d => d.ChegadaHD);

  print_filter(dateDimension);

  dailyTable
    .dimension(dateDimension)
    .showSections(false)
    .group(d => d.ChegadaHD)
    .size(100)
    .columns(['Diaria', {
      label: 'ChegadaHD',
      format: d => dateParse(d.ChegadaHD),
    }, 'NomeHDExterno', 'Quantidade', "LTO-1via", "LTO-2via", "Backup"])
    .sortBy(d => d.ChegadaHD)
    .order(d3.ascending);

  dailyTable
    .renderlet(function (chart) {
      chart.selectAll('tr').on('click', (d) => console.log('nana', d));
    });



  return dailyTable;
};
