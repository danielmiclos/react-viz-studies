import React from 'react';
import * as dc from 'dc';
import * as d3 from 'd3';
import { ChartTemplate } from "./chartTemplate";

const tableJobsFunc = (divRef, dailies) => {
  const dateDimension = dailies.dimension(d => d.daily_date);
  const dateParse = d3.timeFormat("%d/%m/%Y");

  const tableJobs = dc.dataTable(divRef)
                      .width(800)
                      .height(600)
                      .dimension(dateDimension)
                      .showGroups(false)
                      .group(d => d.daily_date)
                      .columns(['job_name', {
                        label: 'daily_date',
                        format: d => dateParse(d.daily_date),
                      }, 'daily_name', {label: 'data_length', format: d => d.cameras[0].data_length}])
                      .sortBy(d => d.daily_date)
                      .order(d3.ascending);

  return tableJobs;
};

export const TableJobs = (props) => (
  <ChartTemplate title="Job List" chartFunction={tableJobsFunc}/>
);
