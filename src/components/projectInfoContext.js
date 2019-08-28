import React from 'react';

export const infoContext = React.createContext("infoContext");


export class InfoContext extends React.Component{
  constructor(props){
    super(props);
    this.state = {loading: false, hasData:false};
  }

  componentDidMount() {
    console.log('CAN I HAZ PROPS: ', this.props.token);

    if(this.state.hasData) {
      return;
    }
    if(this.state.loading) {
      return;
    }
    const env_url = `${process.env.REACT_APP_SCHEMA}://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_HOST_PORT}`;

    this.setState({loading: true});
    fetch(`${env_url}/get_project_info/${this.findGetParameter("info")}`)
      .then(res => res.json())
      .then((data) => {


        console.log(data);

        console.log("success info");

        this.info = data ;


        this.setState({loading:false, hasData: true});
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
    return result;
  }

  render(){
    if(!this.state.hasData) {
      return null;
    }

    return (
      <infoContext.Provider value={{info: this.info}}>
        <div ref={this.parent}>
          {this.props.children}
        </div>
      </infoContext.Provider>
    )
  }

}
