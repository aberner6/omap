d3.json("datasource.json", function(data) {

console.log(data.nodes[0]);
console.log(data.nodes[0].group);
// console.log(data.nodes[0].tags.size);
// console.log(data.links[0])

// var width = $('#omap').width();
// var height = $('#omap').height();

var width = 1200; //for now
var height = 500; //for now

var maxResponse = d3.max(data.nodes, function(d,i) { return i;} );
console.log(maxResponse);

var maxScore = d3.max(data.nodes, function(d) { return d.group;} );
console.log(maxScore);

var maxTags = d3.max(data.nodes, function(d) { return d.tags;} );
console.log(maxTags.length);
console.log(maxTags);
console.log("maxTags");

var heightScale = d3.scale.linear()
  .domain([0, maxScore]) //maxScore
  .range([10, height/8]);

var toggleScale = d3.scale.linear()
  .domain([0, maxScore]) //maxScore
  .range([0, height/1.5]);

var alongWidth = d3.scale.linear()
  .domain([0, maxResponse]) //gotta be total people
  .range([10, width-10]);

var alongHeight = d3.scale.linear()
  .domain([0, maxResponse]) //gotta be total people
  .range([10, 100]);

var tagWeight = d3.scale.linear()
  .domain([0, maxTags])
  .range([.5, 1]);

var svg = d3.select("#omap").append("svg")
    // .attr("width", width)
    // .attr("height", height);
  .attr({
        "width": "100%",
        "height": "100%"
      })
  .attr("viewBox", "0 0 " + width + " " + height )
  .attr("preserveAspectRatio", "xMinYMin")
  .attr("pointer-events", "all")

  var rect = svg.selectAll("rect")
 // .attr("class", "rollout")
  .data(function(d){ 
    return data.nodes;
    console.log(d3.ascending(d.group, d.group));
  })
 .enter().append("rect")
 .attr("opacity", function(d,i){
  if (d.tags!=null){
    return tagWeight(d.tags.length);
  }
  else {
    return .1;
  }
 })
 .attr("x", function(d,i){
    return alongWidth(i);
    })
 .attr("y", height/2)
 .attr("width", 6)
 .attr("height", 6)
  // function(d,i){ 
	 // return toggleScale(d.group);
  //   })
 .attr("fill", "blue");

});