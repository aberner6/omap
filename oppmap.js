d3.json("datasource.json", function(data) {

console.log(data.nodes[0]);
console.log(data.nodes[0].group);
console.log(data.nodes[0].tags[0]);
// console.log(data.links[0])

// var width = $('#omap').width();
// var height = $('#omap').height();



var width = 500; //for now
var height = 500; //for now

var force = d3.layout.force()
    .charge(-120)
    .linkDistance(45)
    .size([width, height]);

var svg = d3.select("#omap").append("svg")
    .attr("width", width)
    .attr("height", height);

force.nodes(data.nodes)
    .links(data.links)
    .start();

var link = svg.selectAll(".link")
    .data(data.links)
    .enter().append("line")
    .attr("class", "link")
    .style("stroke-width", function(d) { return Math.sqrt(d.value); });

var node = svg.selectAll(".node")
    .data(data.nodes)
    .enter().append("circle")
    .attr("class", "node")
    .attr("r", 10)
    .style("fill", function(d) {
      if(d.group == 1) {
        return "blue";
      } 
      if(d.group == 2) {
        return "green";
      }
      else {
        return "pink"; 
      }
    })
    .call(force.drag)

force.on("tick", function() {
      link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

      node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
    });



});