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

const useStyles = makeStyles((theme) =>
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

export const DailyList = (props) => {
  const classes = useStyles();

  const context = React.useContext(dcContext);
  const [chart, updateChart] = React.useState(null);
  const [content, setContent] = React.useState([]);
  const dailies = context.dailies;
  const div = React.useRef(null);


  React.useEffect(() => {
    const newChart = makeGridList(div.current, dailies);
    newChart.render();
    updateChart(newChart);
  }, 1);

  const makeGridList = (divRef, datum) => {

    const dateParse = d3.timeFormat("%d/%m/%Y");
    const dateDimension = datum.dimension(d => d.ChegadaHD);

    const gridList = (parent) => {
      const chart = {};

      chart.render = () => {

        console.log('my chart is rendering');
        const dataList = dateDimension.top(Infinity);
        if(content !== dataList) {
          setContent(dateDimension.top(Infinity));
        }

        return chart;
      };

      chart.redraw = () => {

        console.log('my chart is redraw');
        const dataList = dateDimension.top(Infinity);
        if(content !== dataList) {
          setContent(dateDimension.top(Infinity));
        }

        return chart;
      };
      return chart;
    }

    const testGrid = gridList(divRef);

    const maconha = dc.chartRegistry;

    maconha.register(testGrid);

    return testGrid;

  };

  const showList = (conteudo) => {
    return conteudo.map(d => {
      return (
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1c-content"
            id="panel1c-header"
          >
            <div >
              <Typography >{d.daily_name}</Typography>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography variant="caption">{d.daily_name}</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>

      )
    });
  };

  return (
    <div className="dc-table">
      <h2>Amapoa</h2>
      {showList(content)}
      <div ref={div} className="table-layout" />
    </div>
  )

};


