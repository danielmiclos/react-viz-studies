import React from 'react';
import * as dc from 'dc';
import * as d3 from 'd3';
import {ChartTemplate} from "./chartTemplate";

dc.testChart = (parent, chartGroup) => {

  this.render = (data) => {console.log('render')};
  this.redraw = (data) => {console.log('redraw')};

};

const tableJobsFunc = (divRef, dailies) => {
  const dateDimension = dailies.dimension(d => d.daily_date);
  const dateParse = d3.timeFormat("%d/%m/%Y");


  const tableMake = dc.chartRegistry
                      .register(dc.testChart);



  return tableMake

};

export const Sandbox = (props) => (
  <ChartTemplate title="Job List" chartFunction={tableJobsFunc}/>
);
