import React from 'react';
import * as dc from 'dc';
import * as d3 from 'd3';
import { ChartTemplate } from "../chartTemplate";
import {print_filter} from '../util/print-filter';

const diariasBarsFunc = (divRef, dailies) => {

  const diariasBarChart = dc.barChart(divRef);

  const diariaDimension = dailies.dimension(d => [d.daily_name, d.cameras[0].backup_to_lto_status]);
  const dateDimension = dailies.dimension(d => d.ChegadaHD);
  const dateExt = d3.extent(dateDimension.top(Infinity), d => d.ChegadaHD);
  const group = diariaDimension.group().reduceSum(d => d.cameras[0].data_length);

 print_filter(diariaDimension);
 //console.log(group.top(Infinity).length);
  console.log('after')
  print_filter(diariaDimension.group());




  diariasBarChart
    .width(1000)
    .height(250)
    .margins({top:20, bottom:50, left:60, right:10})
    .dimension(diariaDimension)
    .group(group)
    .alwaysUseRounding(true)
    .brush(true)
    .colorAccessor(d => d.key[1] === '1' ? 'blue' : 'orange')
    //.colors(d3.scaleOrdinal().domain(["OK", "NO"]))
    //.range(["blue", "orange"])
    .ordinalColors(['url(#barBg)','rgb(255, 127, 14)'])
    .x(d3.scaleBand().domain(group.all().map(d => d.key)))
    //.x(d3.scaleLinear().domain())
    .title(d => `${d.key[0]}: ${d.value}GB`)
    //.label(d => 'nada')
    .centerBar(false)
    .xUnits(dc.units.ordinal)

    .renderlet(function (chart) {

      const barBG = d3.select(divRef)
                      .select('svg')
                      .append('defs')
                      .append("linearGradient");


      barBG
        .attr("id", "barBg")
        .attr("x1", "0")
        .attr("x2", "0")
        .attr("y1", "200")
        .attr("y2", "00")
        .attr("gradientUnits", "userSpaceOnUse");

      barBG
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "rgb(31, 119, 180)")
        .attr("stop-opacity", "0.1");


      barBG
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "rgb(31, 119, 180)")
        .attr("stop-opacity", "1");

      chart.selectAll("g.x text")
        .attr('dx', '30')
        .attr('transform', "translate(-15,0) rotate(-90)")
        .attr('display', 'none');

      // chart.selectAll('.bar')
      //   .attr("fill", "url(#barBg)");
    })
    ;

  diariasBarChart.yAxis().ticks(5);

  return diariasBarChart;
}

export const DiariasBars = (props) => (
  <ChartTemplate title="Diarias" chartFunction={diariasBarsFunc} />
);
