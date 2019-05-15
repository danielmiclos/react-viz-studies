import React from 'react';
import * as dc from 'dc';
import * as d3 from 'd3';
import { ChartTemplate } from "../chartTemplate";
import {print_filter} from '../util/print-filter';


const backupStatusPieFunc = (divRef, dalies) => {

  const backupStatus = dc.pieChart(divRef);

  const statusDimension = dalies.dimension(d => d.cameras[0].backup_to_lto_status);
  const statusGroup = statusDimension.group();
  const all = dalies.groupAll();
  const sumTotal = all.reduceSum(d => 1).value();

 // print_filter(statusGroup);

  backupStatus
    .width(150)
    .height(150)
    .radius(40)
    .innerRadius(30)
    .dimension(statusDimension)
    .group(statusGroup)
    .externalLabels(-35)
    .ordinalColors(['url(#pieBg)','rgb(255, 127, 14)'])
    .title(d => `${d.key}: ${Math.round((d.value / sumTotal) * 100)}%`)
    .label(d =>  `${d.key}: ${Math.round((d.value / sumTotal) * 100)}%`)
    .renderlet(function(chart){

      chart.select('.dc-chart .pie-slice.external')
        .attr('fill', 'white');

      const pieBG = d3.select(divRef)
                      .select('svg')
                      .append('defs')
                      .append("linearGradient");

      pieBG
        .attr("id", "pieBg")
        .attr("x1", "0")
        .attr("x2", "0")
        .attr("y1", "1")
        .attr("y2", "0");

      pieBG
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "rgb(31, 119, 180)")
        .attr("stop-opacity", "0.3");


      pieBG
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "rgb(31, 119, 180)")
        .attr("stop-opacity", "0.9");


    });

  return backupStatus;
};


export const BackupStatusPie = (props) => (
  <ChartTemplate title="Backup" chartFunction={backupStatusPieFunc} />
)
