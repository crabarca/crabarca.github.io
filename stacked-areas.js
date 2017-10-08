


const WIDTH3 = 960;
const HEIGHT3 = 680;
const MARGIN3 = { TOP: 40, BOTTOM: 40, LEFT: 50, RIGHT: 50 };
const PADDING3 = 30;
const MAX_RADIUS3 = 50;

const width3 = WIDTH3 - MARGIN3.RIGHT - MARGIN3.LEFT;
const height3 = HEIGHT3 - MARGIN3.TOP - MARGIN3.BOTTOM;

const colors3 = [];

const container3 = d3.select(".container3").append("svg")
    .attr("width", width + MARGIN3.left + MARGIN3.right)
    .attr("height", height + MARGIN3.top + MARGIN3.bottom)
    .append("g")
    .attr("transform", "translate(" + MARGIN3.left + "," + MARGIN3.top + ")");


var parseDate = d3.timeParse("%Y %b %d");

var x = d3.scaleTime().range([0, width3]),
    y = d3.scaleLinear().range([height3, 0]),
    z = d3.scaleOrdinal(d3.schemeCategory10);

var stack = d3.stack();

var area = d3.area()
    .x(function(d, i) { return x(d.data.date); })
    .y0(function(d) { return y(d[0]); })
    .y1(function(d) { return y(d[1]); });

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("data.tsv", type, function(error, data) {
  if (error) throw error;

  var keys = data.columns.slice(1);

  x.domain(d3.extent(data, function(d) { return d.date; }));
  z.domain(keys);
  stack.keys(keys);

  var layer = g.selectAll(".layer")
    .data(stack(data))
    .enter().append("g")
      .attr("class", "layer");

  layer.append("path")
      .attr("class", "area")
      .style("fill", function(d) { return z(d.key); })
      .attr("d", area);

  layer.filter(function(d) { return d[d.length - 1][1] - d[d.length - 1][0] > 0.01; })
    .append("text")
      .attr("x", width - 6)
      .attr("y", function(d) { return y((d[d.length - 1][0] + d[d.length - 1][1]) / 2); })
      .attr("dy", ".35em")
      .style("font", "10px sans-serif")
      .style("text-anchor", "end")
      .text(function(d) { return d.key; });

  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(10, "%"));
});

function type(d, i, columns) {
  d.date = parseDate(d.date);
  for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = d[columns[i]] / 100;
  return d;
}
