import React from 'react';
import * as dc from 'dc';
import * as d3 from 'd3';
import {ChartTemplate} from "./chartTemplate";

const lineChartFunc = (divRef, dailies) => {
  const dateDimension = dailies.dimension(d => d.daily_date);
  const dateParse = d3.timeFormat("%d/%m/%Y");
  const dateExt = d3.extent(dateDimension.top(Infinity), d => d.daily_date);
  const dateGroupLength = dateDimension.group().reduceSum(d => d.cameras[0].data_length);
  const volGroup = dateDimension.group();

  const dateAll = dateDimension.filterAll();
  //const dateGroupLength2 = dateDimension.group().reduceSum((d) => {return console.log(i)});

  console.log(dateGroupLength);

  function acc(arr) {
    console.log('aee');
    let accumulator = 0;
    return arr.map((item, index) => {
      accumulator += item.value;
      return {key: item.key, value: item.value, acc: accumulator};}
    );
  };

  //const heapByDate = dailies.heap.by(d => d.cameras[0].data_length);

  // function reduceAdd(p,v) {
  //   console.log('add', p);
  //   console.log('v', v.cameras[0].data_length);
  //   return p + Number(v.cameras[0].data_length);
  // }
  // function reduceRemove(p,v) {
  //   return p - Number(v.cameras[0].data_length);
  // }
  // function reduceInitial() {return 0}
  //
  // console.log(dateDimension.group().reduce(reduceAdd, reduceRemove, reduceInitial).all());
  //console.log(dateGroupLength.top(Infinity));


  const linechart = dc
    .lineChart(divRef)
    .width(800)
    .height(350)
    .margins({ top: 10, bottom: 50, right: 30, left: 50 })
    .dimension(dateDimension)
    .group(dateGroupLength)
    .yAxisLabel("Length")
    .elasticY(true)
    .renderHorizontalGridLines(true)
    .renderArea(true)
    .x(d3.scaleTime().domain(dateExt));

  return linechart;

};

export const LineChartJobs = (props) => (
  <ChartTemplate title="Lenght by day" chartFunction={lineChartFunc} />
);
