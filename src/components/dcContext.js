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
    fetch('http://192.168.8.70:5010/get_lab_data/00651826-3cba-11e6-b303-06d697bf810e')
      .then(res => res.json())
      .then((data) => {
        data.forEach(d => {
          d.ChegadaHD = dateFormatParser(d.daily_date);
          d.daily_month = d3.timeMonth(d.daily_date);
        });

        console.log("sucess");

        this.dailies = crossfilter(data);
        this.datum = data;


        this.setState({loading:false, hasDailies: true});
      }, (error) => console.log("ERROR BURRÃO: ", error))

  }

  render(){
    if(!this.state.hasDailies) {
      return null;
    }

    return (
      <dcContext.Provider value={{dailies:this.dailies, datum: this.datum}}>
        <div ref={this.parent}>
          {this.props.children}
        </div>
      </dcContext.Provider>
    )
  }

}
