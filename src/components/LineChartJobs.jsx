import React from 'react';
import * as dc from 'dc';
import * as d3 from 'd3';
import {ChartTemplate} from "./chartTemplate";
import {print_filter} from './util/print-filter';


const lineChartFunc = (divRef, dailies) => {
  const dateDimension = dailies.dimension(d => d.ChegadaHD);
  const dateParse = d3.timeFormat("%d/%m/%Y");
  const dateExt = d3.extent(dateDimension.top(Infinity), d => d.ChegadaHD);
  const dateGroupLength = dateDimension.group().reduceSum(d => d.Quantidade);
  const volGroup = dateDimension.group();

  const dateAll = dateDimension.filterAll();
  //const dateGroupLength2 = dateDimension.group().reduceSum((d) => {return console.log(i)});

  //console.log('dateGroupLength', dateGroupLength);
  print_filter(dateGroupLength);

  const linechart = dc
    .lineChart(divRef)
    .width(1400)
    .height(200)
    .margins({ top: 10, bottom: 30, right: 30, left: 50 })
      .renderDataPoints(true)
    .curve(d3.curveBasis)
    .dimension(dateDimension)
    .group(dateGroupLength)
    .yAxisLabel("Length")
    .elasticY(false)
    .renderHorizontalGridLines(false)
    .renderArea(false)
    .x(d3.scaleTime().domain(dateExt))
    //.x(d3.scaleLinear().domain(d3.extent(dateGroupLength, d => )))
    ;

  linechart.yAxis().ticks(5);

  return linechart;

};

export const LineChartJobs = (props) => (
  <ChartTemplate title="Length by day" chartFunction={lineChartFunc} />
);
