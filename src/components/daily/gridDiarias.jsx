import React from 'react';
import ReactDOM from 'react-dom';
import {dcContext} from "../dcContext";
import * as dc from "dc";
import * as d3 from "d3";
import {print_filter} from '../util/print-filter';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

//
import clsx from 'clsx';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    icon: {
      verticalAlign: 'bottom',
      height: 20,
      width: 20,
    },
    details: {
      alignItems: 'center',
    },
    column: {
      flexBasis: '33.33%',
    },
    helper: {
      borderLeft: `2px solid ${theme.palette.divider}`,
      padding: theme.spacing(1, 2),
    },
    link: {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  }),
);


export const GridDiarias = (props) => {
  const context = React.useContext(dcContext);
  const classes = useStyles();
  const [chart, updateChart] = React.useState(null);
  const dailies = context.dailies;
  const div = React.useRef(null);
  React.useEffect(() => {
    const newChart = makeTable(div.current, dailies, props.setSelectedDaily);
    newChart.render();
    updateChart(newChart);
  }, 1);

  // injetando coisas aqui



  const makeTable = (divRef, datum, setDaily) => {
    const dailyTable = dc.dataGrid(divRef);
    const dateParse = d3.timeFormat("%d/%m/%Y");

    const dateDimension = datum.dimension(d => d.ChegadaHD);

    // print_filter(dateDimension);


    const makeExpansionPanel = (d) => {
      return `
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1c-content"
        id="panel1c-header"
      >
        <div >
          <Typography >${d.daily_name}</Typography>
        </div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography variant="caption">${d.daily_name}</Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
    `
    };



    dailyTable
      .dimension(dateDimension)
      .section(d => d.daily_name)
      .size(100)
      .htmlSection(function (d) {
        return ""
      })
      .html(function (d) {
        //return makeExpansionPanel(d);
        return returnSomething(d, this);
      })
      .sortBy(d => d.ChegadaHD)
      .order(d3.ascending);

    dailyTable
      .renderlet(function (chart) {
        chart.selectAll('div').html((d) => makeExpansionPanel(d));
        chart.selectAll('div').on('click', (d) => setDaily(d));
      });



    return dailyTable;
  };




  // terminando de injetar coisas

  return (
    <div className="dc-table">
      <h2>Diárias</h2>
      <div ref={div} className="grid-layout">
      </div>
    </div>
  )

}

const returnSomething = (d, item) => {
  console.log(item);
  const nanana =  <ExpansionPanel>
    <ExpansionPanelSummary>{d.daily_name}</ExpansionPanelSummary>
  </ExpansionPanel>;

  //return ReactDOM.render(nanana, item);
};

