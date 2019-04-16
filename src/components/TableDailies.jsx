import React, {useEffect} from 'react';
import uuid from 'uuid';
import {ChartTemplate} from "./chartTemplate";
import {dcContext} from "./dcContext";



export default function TableDailies(props) {

  const context = React.useContext(dcContext);
  const dailies = context.dailies;
  const dateDimension = dailies.dimension(d => d.daily_date);

  console.log('dailies', dateDimension.group().top(Infinity));

  const generateTable = () => {
    console.log('here')
    if(!props.tableData) {
      console.log('just returned');
      return;
    }
    return props.tableData.map(item => {
      return (
        <tr key={uuid()}>
          {this.getTableColumns(item, props.columns)}
        </tr>
      )
    })
  };

  const getTableColumns = (line, columns, tagName='td', opts={}) => {
    return columns.map(item => React.createElement(tagName,{...opts, key: uuid()}, [line[item]]))
  };

  const getTableHeaders = (columns, tagName='th', opts={}) => {
    return columns.map(item => React.createElement(tagName,{...opts, key: uuid(), className:'tleft'}, [item]))
  };



    return(
      <div className="table-dailies-component">
        <h2>Diárias</h2>
        <div className="sticktable">

          <div className="sticktable-body">
            <table className="table-layout">
              <thead>
                <tr>
                  {/*{this.getTableHeaders(props.colLabels)}*/}
                  {console.log('dailies', dateDimension.group().top(Infinity))}
                </tr>
              </thead>
              <tbody>
              {generateTable()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )

};


