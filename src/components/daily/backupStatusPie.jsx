import React from 'react';
import * as dc from 'dc';
import * as d3 from 'd3';
import { ChartTemplate } from "../chartTemplate";
import {print_filter} from '../util/print-filter';


const backupStatusPieFunc = (divRef, dalies) => {

  const backupStatus = dc.pieChart(divRef);

  const statusDimension = dalies.dimension(d => d.Backup);
  const statusGroup = statusDimension.group();
  const all = dalies.groupAll();
  const sumTotal = all.reduceSum(d => 1).value();

  print_filter(statusGroup);

  backupStatus
    .width(200)
    .height(200)
    .dimension(statusDimension)
    .group(statusGroup)
    .title(d => `${d.key}: ${Math.round((d.value / sumTotal) * 100)}%`)
    .label(d =>  `${d.key}: ${Math.round((d.value / sumTotal) * 100)}%`)

  return backupStatus;
};


export const BackupStatusPie = (props) => (
  <ChartTemplate title="Backup" chartFunction={backupStatusPieFunc} />
)
