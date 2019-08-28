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

    console.log('CAN I HAZ PORT:', process.env);


    if(process.env.NODE_ENV === "development") {

    }

    //console.log('CAN I HAZ location part 2:', this.findGetParameter("q"));

    if(this.state.hasDailies) {
      return;
    }
    if(this.state.loading) {
      return;
    }

    const env_url = `${process.env.REACT_APP_SCHEMA}://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_HOST_PORT}`;
    console.log('app url: ', env_url);

    this.setState({loading: true});
    fetch(`${env_url}/get_lab_data/${this.findGetParameter("d")}`)
      .then(res => res.json())
      .then((data) => {
        console.log("raw data:", data);
        data.forEach(d => {
          d.ChegadaHD = dateFormatParser(d.daily_date);
          d.daily_month = d3.timeMonth(d.daily_date);
        });

        console.log("sucess");

        this.dailies = crossfilter(data);
        this.datum = data;


        this.setState({loading:false, hasDailies: true});
      }, (error) => console.log("ERROR: ", error))

  }

  findGetParameter(parameterName) {
    var result = null,
      tmp = [];
    window.location.search
            .substr(1)
            .split("&")
            .forEach(function (item) {
              tmp = item.split("=");
              if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
            });
    console.log('result:', result);
    return result;
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
