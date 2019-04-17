import React from 'react';
import * as crossfilter from 'crossfilter2';
import * as d3 from 'd3';
import 'dc/dc.css';

export const dcContext = React.createContext("dcContext");
export const dateFormaterSpecifier = "%Y-%m-%d";
export const dateFormat = d3.timeFormat(dateFormaterSpecifier);
export const dateFormatParser = d3.timeParse(dateFormaterSpecifier);
export const numberFormat = d3.format('.2f');

export class DataContext extends React.Component{
  constructor(props){
    super(props);
    this.state = {loading: false, hasDailies:false};
  }

  componentDidMount() {
    if(this.state.hasDailies) {
      return;
    }
    if(this.state.loading) {
      return;
    }

    this.setState({loading: true});
    fetch('./data/dailies.json')
      .then(res => res.json())
      .then((data) => {
        data.forEach(d => {
          d.daily_date = dateFormatParser(d.daily_date);
          d.daily_month = d3.timeMonth(d.daily_date);
          d.data_length = d.data_length_unit === "TB" ? d.data_length * 1000 : d.data_length;
        });

        console.log("sucess");

        this.dailies = crossfilter(data);
        this.setState({loading:false, hasDailies: true});
      }, (error) => console.log(error))

  }

  render(){
    if(!this.state.hasDailies) {
      return null;
    }

    return (
      <dcContext.Provider value={{dailies:this.dailies}}>
        <div ref={this.parent}>
          {this.props.children}
        </div>
      </dcContext.Provider>
    )
  }

}
