import React from 'react';
import * as dc from 'dc';
import * as d3 from 'd3';
import { ChartTemplate } from "../chartTemplate";
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

const sizeByDateFunc = (divRef, dailies) => {

  const sizeByDate = dc.lineChart(divRef);
  const dateParse = d3.timeFormat("%d/%m/%Y");
  const dateDimension = dailies.dimension(d => d.ChegadaHD);
  const dateExt = d3.extent(dateDimension.top(Infinity), d => d.ChegadaHD);
  const dateGroupLength = dateDimension.group().reduceSum(d => d.Quantidade);

  //print_filter(dateGroupLength);

  sizeByDate
    .width(1800)
    .height(200)
    .renderDataPoints(true)
    .dimension(dateDimension)
    .group(accumulate_group(dateGroupLength))
    .renderHorizontalGridLines(true)
    .yAxisLabel("Tamanho")
    .elasticY(true)
    .renderHorizontalGridLines(true)
    .renderArea(true)
    .brushOn(false)
    .title(d => `${dateParse(d.key)}: ${Math.round(d.value)}GB`)
    .x(d3.scaleTime().domain(dateExt))


  return sizeByDate;

}


export const SizeByDate = (props) => (
  <ChartTemplate title="Consumo por data" chartFunction={sizeByDateFunc} />
);
