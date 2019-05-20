import React from 'react';

export const infoContext = React.createContext("infoContext");


export class InfoContext extends React.Component{
  constructor(props){
    super(props);
    this.state = {loading: false, hasData:false};
  }

  componentDidMount() {
    if(this.state.hasData) {
      return;
    }
    if(this.state.loading) {
      return;
    }

    this.setState({loading: true});
    fetch('http://192.168.8.70:5010/get_project_info/cbb7c109-bbc8-4a7d-b7be-6d4c8841cde3')
      .then(res => res.json())
      .then((data) => {


        console.log(data);

        console.log("success info");

        this.info = data ;


        this.setState({loading:false, hasData: true});
      }, (error) => console.log("ERROR BURRÃO: ", error))

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
