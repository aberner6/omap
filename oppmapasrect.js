d3.json("datasource.json", function(data) {

// console.log(data.nodes[0]);
// console.log(data.nodes[0].group);

// console.log(data.nodes[0].tags.size);

console.log(data.links)
var links = data.links;
var nodes = data.nodes;
// var width = $('#omap').width();
// var height = $('#omap').height();

var width = 1600; //for now
var height = 500; //for now
var strokey = 1;
var maxResponse = d3.max(data.nodes, function(d,i) { return i;} );
console.log(maxResponse);

var maxScore = d3.max(data.nodes, function(d) { return d.group;} );
console.log(maxScore);

var maxTags = d3.max(data.nodes, function(d) { return d.tags;} );
console.log(maxTags);
console.log("maxTags");
console.log(maxTags.length);

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
  .range([20, 100]);

function toTagStroke(id) {
  // var thisisit = id;
      // console.log("hey")
  return (function(d){ 
    if (d.nodes.id==id){
      console.log("hey")
    console.log(d.nodes.tags);
  }
  })
  // var thingie = d3.selectAll("circle")
    // .data(function(d){ return data.nodes })
    // .enter().append("circle")
    // .attr("stroke-width", function(d,i){
    //   if (id==d.id){
    //     console.log("hey");
    //   }
    // })
}

var svg = d3.select("#omap").append("svg")
  .attr({
        "width": "100%",
        "height": "100%"
      })
  .attr("viewBox", "0 0 " + width + " " + height )
  .attr("preserveAspectRatio", "xMinYMin")
  .attr("pointer-events", "all")


var rect = svg.selectAll("rect")
  .data(function(d){ 
    return data.nodes;
    // console.log(d3.ascending(d.group, d.group));
  })
 .enter().append("rect")
 .attr("opacity", ".2")
 //  function(d,i){
 //  if (d.tags!=null){
 //    return tagWeight(d.tags.length);
 //  }
 //  else {
 //    return .1;
 //  }
 // })
 .attr("x", function(d,i){
    return alongWidth(i);
    })
 .attr("y", height/2)
 .attr("width", function(d,i){
  if (d.tags!=null){
    return tagWeight(d.tags.length);
  }
  else {
    return 6;
  }
 })
 .attr("height", function(d,i){
  if (d.tags!=null){
    console.log(d.tags)
    return tagWeight(d.tags.length);
  }
  else {
    return 6;
  }
 })
.attr("fill", "blue");

//each piece of data has an ID
//each ID has a source and a target
//source is ID
//target is to other's ID
//here is the most basic version of connections between connections! 
//if you ignore the fact that it's lines not arcs, it works properly in that it links the data correctly


var circle = svg.selectAll("circle")
  .data(function(d){
    return data.links;
  })
  .enter().append("circle")
  .attr("class", "circ")
  .attr("opacity", .2)
  .attr("cx", function(d,i){
    var thingmid = (alongWidth(d.source)-alongWidth(d.target));
    if (thingmid>0){
    return alongWidth(d.target)+(thingmid/2);
    }
    else {
      var posmid = thingmid*(-1);
      // console.log(posmid);
      // return posmid+(posmid/2);
      // return alongWidth(d.target)+(posmid/2);
      return alongWidth(d.target)-(posmid/2);
    }
  })
  .attr("cy", height/2)
  .attr("r", function(d,i){
    var thingmid = (alongWidth(d.source)-alongWidth(d.target));
    if (thingmid>0){
    return thingmid/2;
  }
  else{
      var posmid = thingmid*(-1);
      // console.log(posmid);
      return posmid/2;
    }
  })
  .attr("fill", "none")
  .attr("stroke",function(d,i){
// console.log(strokey)
    var thingmid = (alongWidth(d.source)-alongWidth(d.target));
    if (thingmid>0){
      return "red";
    } 
    else {
      return "blue";
    }
  })
  
  .attr("stroke-width", function(d,i){
    var thisis = goBack(i);
    return thisis;
  });
// circle.exit();

// svg.enter().append("circle")
//   .data(data.nodes)
//   .attr("stroke-width", function(d,i){
//     // var thisis = goBack()
//     // console.log(thisis)
//     // return thisis;
//       if (data.nodes.tags!=null){
//     return tagWeight(data.nodes.tags.length);
//   }
//   else {
//     return .5;
//   }

//   });
// circle.exit();


function goBack(i){
// svg.selectAll("circ")
console.log(data.nodes)
var other = data.nodes;
// circ
//   .data(data.nodes)
//   .enter()
  // .append("ul")
  // function(d){
  if (other.tags!=null){
    return tagWeight(other.tags.length);
  }
  else {
    return .5;
  }
}

  // .attr("class", "circ")
  // .transition()
//   .attr("stroke-width", function(d){ 
//     if (d.tags!=null){
//       console.log("hey")
//       console.log(tagWeight(d.tags.length))
//       var thisis = tagWeight(d.tags.length)
//       return thisis;
//     }
//     else {
//       return .5;
//     }
//   })
// }


//    .attr("cx", function(d,i){
//     var thingmid = (alongWidth(d.source)-alongWidth(d.target));
//     if (thingmid>0){
//     return alongWidth(d.target)+(thingmid/2);
//     }
//     else {
//       var posmid = thingmid*(-1);
//       // console.log(posmid);
//       // return posmid+(posmid/2);
//       // return alongWidth(d.target)+(posmid/2);
//       return alongWidth(d.target)-(posmid/2);
//     }
//   })
//   .attr("cy", height/2)
//   .attr("r", function(d,i){
//     var thingmid = (alongWidth(d.source)-alongWidth(d.target));
//     if (thingmid>0){
//     return thingmid/2;
//   }
//   else{
//       var posmid = thingmid*(-1);
//       // console.log(posmid);
//       return posmid/2;
//     }
//   })
//   .attr("fill", "none")
//   .attr("stroke",function(d,i){
// // console.log(strokey)
//     var thingmid = (alongWidth(d.source)-alongWidth(d.target));
//     if (thingmid>0){
//       return "red";
//     } 
//     else {
//       return "blue";
//     }
//   });


// svg.selectAll("circ")
//   .data(data.nodes)
//   .enter().append("circle")
//   .attr("class", "circ")
//   // .transition()
//   .attr("stroke-width", function(d){ 
//     if (d.tags!=null){
//       console.log("hey")
//       console.log(tagWeight(d.tags.length))
//       return tagWeight(d.tags.length);
//     }
//     else {
//       return .5;
//     }
//   });






//access different set of data to give proper stroke weights
// circle
//   .data(function(d){ 
//     return data.nodes;
//     // console.log(d3.ascending(d.group, d.group));
//   })
//  .enter().append("circle")
//  .transition()
//  .attr("opacity", function(d,i){
//   if (d.tags!=null){
//     console.log("hey")
//     return tagWeight(d.tags.length);
//   }
//   else {
//     return .1;
//   }
//  });





var line = svg.selectAll("line")
  .data(function(d){ 
    return data.links;
    // console.log(d3.ascending(d.group, d.group));
  })
 .enter().append("line")
 .attr("opacity", .2)
  .attr("x1", function(d,i){   // if (d.source==2 && d.target==0){
  // if (d.target==0){
    // console.log(d.source);
    return alongWidth(d.source);
  // }
  // else {
  //   return "-10";
  // }
 })
 .attr("y1", function(d,i){ return ((height/2)-i) })
 .attr("x2", function(d,i){
  // if (d.target==0){
    return alongWidth(d.target);
  // }
  // else {
  //   return "-10";
  // }
 })
 .attr("y2", height/2)
  .attr("stroke",function(d,i){
    var thingmid = (alongWidth(d.source)-alongWidth(d.target));
    if (thingmid>0){
      return "red";
    } 
    else {
      return "blue";
    }
  })
 .attr("stroke-width", 3)
 .attr("fill", "pink");











//just does a horizontal force layout
// var force = d3.layout.force()
//     .charge(-60)
//     .linkDistance(60)
//     .size([width, height]);

// force
//     .gravity(0)
//     .nodes(data.nodes)
//     .links(data.links)
//     .start();

// var line = svg.selectAll("line")
//       .data(data.links)
//       .enter().append("svg:line")
//       .attr("opacity", ".3")
//       .attr("stroke", "grey")
//       .attr("stroke-width",3)
//       .attr("fill","grey")
//       .attr("x1", function(d, i) { return alongWidth(i); }) //d.source.x
//       .attr("y1", function(d) { return height/2; }) //d.source.y
//       .attr("x2", function(d) { return (d.target.x); }) //d.target.x
//       .attr("y2", function(d) { return height/2; }); //d.target.y

// var node = svg.selectAll(".node")
//     .data(data.links)
//     .enter().append("circle")
//     .attr("class", "node")
//     .attr("r", 10)
//     .attr("opacity", ".3")
//     .attr("fill", "blue")
//     //   function(d) {
//     //   if(d.group == 1) {
//     //     return "blue";
//     //   } 
//     //   if(d.group == 2) {
//     //     return "green";
//     //   }
//     //   else {
//     //     return "pink"; 
//     //   }
//     // })
//     .call(force.drag)

//   force.on("tick", function(e) {
//     line.attr("x1", function(d, i) { return alongWidth(i); }) //d.source.x;
//         .attr("y1", function(d) { return height/2 }) //d.source.y;
//         .attr("x2", function(d) { return (d.target.x); }) //d.target.x;
//         .attr("y2", function(d) { return height/2 }); //d.target.y;

//       node.attr("cx", function(d,i) { return alongWidth(i); }) // alongWidth(i)
//         .attr("cy", function(d) { return height/2; }); //not d.y
//   });

//here are a series of attempts at drawing arcs etc. properly
// var lineFunction = d3.svg.line()
//   .x(function(d){ return alongWidth(d.source) })
//   .y (function(d){ return height/2 })
//   .interpolate("basis");

// var lineGraph = svg.append("path")
//   .attr("d", lineFunction(data.links))
//   .attr("stroke","blue")
//   .attr("stroke-width", 2)
//   .attr("fill","none");

//an attempt at drawing paths based on data - doesn't work
// var linet = d3.svg.line()
//     .interpolate("bundle")
//     .tension(.85)
//     .x(function(d,i) { return alongWidth(i) })
//     .y(function(d){ return height/2 });

//   svg.selectAll("path")
//       .data(data.links)
//     .enter().append("path")
//       .attr("class", "link")
//       .attr("d", linet);

//set up that works for force directed diagram
// force.on("tick", function() {
//   link.attr("x1", function(d) { return d.source.x; })
//     .attr("y1", function(d) { return d.source.y; })
//     .attr("x2", function(d) { return d.target.x; })
//     .attr("y2", function(d) { return d.target.y; });

//what an arc should look like
// var arc = d3.svg.arc()
//     .innerRadius(100)
//     .outerRadius(99)
//     .startAngle(-1.9) //converting from degs to radians
//     .endAngle(1.9) //just radians

//but when you construct it this way it is problematic to attribute data 
// var arcis = svg.selectAll("arc")
//   .data(function(d){
//     return data.links;
//   })
//   .enter().append("path")
//   .attr("d", arc)
//   .attr("transform", function(d,i){
//     return "translate("+200+","+200+")"
// })








//attempts at drawing lines and paths etc.
// var lineFunction = d3.svg.line()
//     .x(function(d, i){ return alongWidth(i); })
//      .y(function(d){ return height/4; })
//      .interpolate("linear");

// var lineGraph = svg.append("path")
//     .attr("d", lineFunction(data.links))
//     .attr("stroke", "grey")
//     .attr("stroke-width", 1)
//     .attr("fill", "none");
// var link = d3.svg.diagonal()
//      .projection(function(d)
//      {
//          return [d.y, d.x];
//      });

// svg.selectAll(".link")
//      .data(links)
//      .enter()
//      .append("svg:path")
//      .attr("class", "link")
//      .attr("d", link);

});