import React from 'react';
import * as dc from 'dc';
import * as d3 from 'd3';
import {ChartTemplate} from "./chartTemplate";

function print_filter(filter) {
  var f = eval(filter);
  if (typeof f.length != "undefined") {
  } else {
  }
  if (typeof f.top != "undefined") {
    f = f.top(Infinity);
  } else {
  }
  if (typeof f.dimension != "undefined") {
    f = f
      .dimension(function(d) {
        return "";
      })
      .top(Infinity);
  } else {
  }
  console.log(
    filter +
    "(" +
    f.length +
    ") = " +
    JSON.stringify(f)
        .replace("[", "[\n\t")
        .replace(/}\,/g, "},\n\t")
        .replace("]", "\n]")
  );
}

const piePerMonthFunc = (divRef, dailies) => {

  const dateParse = d3.timeFormat("%d/%m/%Y");
  const showTime = d3.timeParse("%d");

  //console.log(dateParse("2019-01-05"));


  const dateDimension = dailies.dimension(d => `${d.daily_date.getMonth()}-${d.daily_date.getFullYear()}`);

console.log(dateDimension.group().all());




  console.log('oioi oioi oi');

  const pieChart = dc.pieChart(divRef)
    .width(500)
    .height(500)
    .dimension(dateDimension);

  return pieChart;
};

export const PiePerMonth = (props) => (
  <ChartTemplate title="Data Length per Month" chartFunction={piePerMonthFunc} />
);
