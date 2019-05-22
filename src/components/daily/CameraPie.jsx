import React from "react";
import * as d3 from "d3";

class CameraPie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 170,
      height: 170
    };
    this.createLineChart = this.createLineChart.bind(this);
  }

  componentDidMount() {
    this.createLineChart();
  }

  createLineChart() {
    //const pieData = this.props.data;

    const { width, height } = this.state;

    const node = this.node;

    // const parseDate = d3.timeParse("%Y/%m/%d");
    // const formatTime = d3.timeFormat("%Y/%m");

    // const Nest = d3
    //   .nest()
    //   .key(function(d) {
    //     return formatTime(parseDate(d.ChegadaHD));
    //   })
    //   .rollup(function(v) {
    //     return d3.sum(v, d => d.Quantidade);
    //   })
    //   .entries(pieData);
    // //const data = this.state.pieData;
    // const data = Nest;

    const svg = d3
      .select(node)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    const radius = d3.min([width, height]) / 2;

    const pie = d3
      .pie()
      //.sort(null)
      //.startAngle(0)
      //.endAngle(6)
      .value(d => d.value);

    const path = d3
      .arc()
      .padAngle(0.001)
      .outerRadius(radius)
      .innerRadius(radius / 1.5);

    const label = d3
      .arc()
      .outerRadius(radius / 1.5)
      .innerRadius(radius / 2.5);

    const colorScale = d3.scaleOrdinal().range(['#4490e5','#2f4b66','#beb944','#faa030','#fd4778','#be9371']);

    const data = {a: 660, b: 240};
    const data_ready = pie(d3.entries(data));

    const arc = svg
      .selectAll(".arc")
      .data(data_ready)
      .enter()
      .append("g")
      .attr("class", "arc");

    const div = d3.select(node).append("div")
                  .attr("class", "tooltip")
                  .style("opacity", 0);

    arc
      .append("path")
      .attr("d", path)
      .attr("fill", d => colorScale(d.data.value))
      .on('mouseover', (d) => {
        div.transition()
           .duration(200)
           .style("opacity", .9);
        div .html(`<strong>${d.data.key} - ${d.data.value}</strong>`)
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function(d) {
        div.transition()
           .duration(500)
           .style("opacity", 0);
      });
    ;

    // arc
    //   .append("text")
    //   .attr("class", "label")
    //   .attr("transform", d => "translate(" + label.centroid(d) + ")")
    //   .attr("dy", "0.3em")
    //   .attr("font-size", "14px")
    //   .attr("fill", "#c9c9c9")
    //   .text(d => `${d.data.key} - ${d.data.value}`);

    //console.log(Nest);
  }

  render() {
    return (
      <div className="piechart">
        <div ref={node => (this.node = node)}  />
      </div>
    );
  }
}

export default CameraPie;
