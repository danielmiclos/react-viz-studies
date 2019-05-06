import React from 'react';
import * as dc from 'dc';
import * as d3 from 'd3';
import {ChartTemplate} from "../chartTemplate";
import {print_filter} from '../util/print-filter';

function accumulate_group(source_group) {
  return {
    all:function () {
      var cumulate = 0;
      return source_group.all().map(function(d) {
        cumulate += d.value;
        return {key:d.key, value:cumulate};
      });
    }
  };
}

const composedChartFunc = (divRef, dailies) => {

  const composedChart = dc.compositeChart(divRef);

  const sizeByDate = dc.lineChart(composedChart);
  const linechart = dc.barChart(composedChart);
  const dateDimension = dailies.dimension(d => d.ChegadaHD);
  const dateExt = d3.extent(dateDimension.top(Infinity), d => d.ChegadaHD);
  const dateGroupLength = dateDimension.group().reduceSum(d => d.Quantidade);

  const accumulatedGroup = accumulate_group(dateGroupLength);



  sizeByDate
    //.renderDataPoints(true)
    //.dimension(dateDimension)
    .group(accumulatedGroup, 'grupob')
    //.renderHorizontalGridLines(true)
    //.yAxisLabel("Tamanho (em Teras)")
    //.elasticY(true)
    //.renderHorizontalGridLines(true)
    //.renderArea(true)
    //.dotRadius(5)
  ;

  linechart
    //.renderDataPoints(true)
    //.curve(d3.curveBasis)
    .dimension(dateDimension)
    .group(dateGroupLength, 'grupo a')
    //.yAxisLabel("Length")
    .elasticY(true)
    .useRightYAxis(true)
    .colors(d3.scaleOrdinal().range(d3.schemeSet2))
    //.renderHorizontalGridLines(false)
    //.renderArea(false)
  ;

  composedChart
    .margins({top:20, bottom:50, left:60, right:50})
    .width(1400)
    .height(250)
    .dimension(dateDimension)
    .colors(d3.scaleOrdinal().range(d3.schemeSet2))
    .x(d3.scaleTime().domain(dateExt))
    .compose([sizeByDate, linechart]);


  return composedChart;
}

export const ComposedDailyData = (props) => (
  <ChartTemplate title="Composed" chartFunction={composedChartFunc} />
);
