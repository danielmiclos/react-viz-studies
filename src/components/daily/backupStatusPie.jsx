import React from 'react';
import * as dc from 'dc';
import * as d3 from 'd3';
import { ChartTemplate } from "../chartTemplate";
import {print_filter} from '../util/print-filter';


const backupStatusPieFunc = (divRef, dalies) => {

  const backupStatus = dc.pieChart(divRef);

  const statusDimension = dalies.dimension(d => d.Backup);
  const statusGroup = statusDimension.group();

  print_filter(statusGroup);

  backupStatus
    .width(200)
    .height(200)
    .dimension(statusDimension)
    .group(statusGroup)

  return backupStatus;
};


export const BackupStatusPie = (props) => (
  <ChartTemplate title="Backup" chartFunction={backupStatusPieFunc} />
)
