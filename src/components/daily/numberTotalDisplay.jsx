import React from 'react';
import * as dc from 'dc';
import * as d3 from 'd3';
import { ChartTemplate } from "../chartTemplate";
import {print_filter} from '../util/print-filter';


const numberTotalDisplayFunc = (divRef, dailies) => {

  const numberTotal = dc.numberDisplay(divRef);
  const all = dailies.groupAll();
  const sumTotal = all.reduceSum(d => d.Quantidade);



  numberTotal.group(sumTotal)
             .valueAccessor(d => d)
    .formatNumber(d3.format('.3d'))
    .html({
      one: '%number Gb',
      some: '%number Gbs',
      none: '0'
    });



  return numberTotal;
};


export const NumberTotalDisplay = (props) => (
  <ChartTemplate title="Total" chartFunction={numberTotalDisplayFunc} />
);
