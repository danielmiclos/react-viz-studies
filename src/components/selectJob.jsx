import React from 'react';
import * as dc from 'dc';
// import * as d3 from 'd3';
import {ChartTemplate} from "./chartTemplate";


const selectJobFunc = (divRef, dailies) => {
  const jobDimension = dailies.dimension(d => d.job_name);
  const jobGroup = jobDimension.group();

  const selectJob = dc.selectMenu(divRef)
    .dimension(jobDimension)
    .group(jobGroup);

  return selectJob;
};

export const SelectJob = props => (
  <ChartTemplate chartFunction={selectJobFunc} title="Jobs"/>
);
