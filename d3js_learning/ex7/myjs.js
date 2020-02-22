
var scatterData = [{friends: 5, salary: 22000},
    {friends: 3, salary: 18000}, {friends: 10, salary: 88000},
    {friends: 0, salary: 180000}, {friends: 27, salary: 56000},
    {friends: 8, salary: 74000}];
let xExtent = d3.extent(scatterData,d=>d.friends);
let yExtent = d3.extent(scatterData,d=>d.salary);
let xScale = d3.scaleLinear().domain(xExtent).range([10,500]);
let yScale = d3.scaleLinear().domain(yExtent).range([10,500]);
d3.select('svg')
    .selectAll('circle')
    .data(scatterData)
    .enter()
    .append('circle')
    .attr('r',5)
    .attr('cx',d=>xScale(d.friends))
    .attr('cy',d=>yScale(d.salary));

let xAxis = d3.axisBottom().scale(xScale).tickSize(500);
d3.select('svg').append('g').attr('id','xAxisG').call(xAxis);
let yAxis = d3.axisRight().scale(yScale).tickSize(500);
d3.select('svg').append('g').attr('id','yAxisG').call(yAxis);

/*
var scatterData = [{friends: 5, salary: 22000},
    {friends: 3, salary: 18000}, {friends: 10, salary: 88000},
    {friends: 0, salary: 180000}, {friends: 27, salary: 56000},
    {friends: 8, salary: 74000}];
    let xExtent = d3.extent(scatterData,d=>d.friends);
let yExtent = d3.extent(scatterData,d=>d.salary);
    let xScale = d3.scaleLinear().domain(xExtent).range([10,500]);
    let yScale = d3.scaleLinear().domain(yExtent).range([10,500]);
   // var xScale = d3.scaleLinear().domain([0,180000]).range([0,500]);
  //  var yScale = d3.scaleLinear().domain([0,27]).range([0,500]);

    xAxis = d3.axisBottom().scale(xScale).tickSize(500)
    d3.select("svg").append("g").attr("id", "xAxisG").call(xAxis);
    yAxis = d3.axisRight().scale(yScale)
    .ticks(16).tickSize(500)
    d3.select("svg").append("g").attr("id", "yAxisG").call(yAxis);


    d3.select("svg").selectAll("circle")
    .data(scatterData).enter()
    .append("circle").attr("r", 5)
    .attr("cx", d => xScale(d.salary))
    .attr("cy", d => yScale(d.friends))
    */