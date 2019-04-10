import React from 'react';
import * as dc from 'dc';
import * as d3 from 'd3';
import {ChartTemplate} from "./chartTemplate";

const barChartFunc = (divRef, dailies) => {
  const dateDimension = dailies.dimension(d => d.daily_date);
  const dateParse = d3.timeFormat("%d/%m/%Y");
  const dateExt = d3.extent(dateDimension.top(Infinity), d => d.daily_date);
  const dateGroupLength = dateDimension.group().reduceSum(d => d.cameras[0].data_length);

  console.log(dateExt);
  console.log(dateGroupLength.top(Infinity));


  const linechart = dc
    .lineChart(divRef)
    .width(800)
    .height(350)
    .margins({ top: 10, bottom: 50, right: 30, left: 50 })
    .dimension(dateDimension)
    .group(dateGroupLength)
    .yAxisLabel("Length")
    .renderHorizontalGridLines(true)
    .renderArea(true)
    .x(d3.scaleTime().domain(dateExt));

  return linechart;

};

export const BarChartJobs = (props) => (
  <ChartTemplate title="Lenght by day" chartFunction={barChartFunc} />
);
