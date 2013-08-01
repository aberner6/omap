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

rect()
var rect = svg.selectAll("rect")
function rect(){
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
 .attr("width", 10)
 .attr("height", 10)
 //function(d,i){
 //  if (d.tags!=null){
 //    console.log(d.tags)
 //    return tagWeight(d.tags.length);
 //  }
 //  else {
 //    return 10;
 //  }
 // })
.attr("fill", "blue")

.on('mouseover', function(d,i){
  a=0;
  d3.select(this)
  .style("stroke", "black")
  .attr("stroke-width","6")
  var thisid = d.id;
  makeArc(thisid);
  })
.on('mouseout', function(d,i){
  a=1;
  var thisid = d.id;
  makeArc(thisid)
  d3.select(this)
  .style("stroke", "none")
});
}

//each piece of data has an ID
//each ID has a source and a target
//source is ID
//target is to other's ID
//here is the most basic version of connections between connections! 
//if you ignore the fact that it's lines not arcs, it works properly in that it links the data correctly
var circle = svg.selectAll("circle")
function makeArc(id){
  console.log(id);
var circle = svg.selectAll("circle")
  .data(function(d){
    return data.links;
  })
// if (id!=null){
  circle.enter().append("circle")
  .attr("class", "circ")
  .attr("opacity", function(d,i){
    if (d.source==id && id!=null){
    return ".8";
  } else {
    return ".03";
  }
  })
  .attr("cx", function(d,i){
    var thingmid = (alongWidth(d.source)-alongWidth(d.target));
    if (thingmid>0){
    return alongWidth(d.target)+(thingmid/2);
    }
    else {
      var posmid = thingmid*(-1);
      return alongWidth(d.target)-(posmid/2);
    }
  })
  .attr("cy", height/2)
  .attr("r", 0)
  .transition()
  .duration(1000)
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
  // .attr("ry",10)
  .attr("fill", "none")
  .attr("stroke",function(d,i){
    console.log(d.source)
    // var thingmid = (alongWidth(d.source)-alongWidth(d.target));
    if (d.source==id && id!=null){
    return "grey";
  } else {
    return "black"; //"pink"
  }
  })
  .attr("stroke-width", 3); 
//may not be necessary
var hRect = svg.selectAll("hRect")
  .data(function(d){
    return data.links;
  })
  hRect.enter().append("rect")
  .attr("class","hRect")
  .attr("opacity", ".3")
  // .attr("x", function(d,i){ return i*20})
  .attr("x", function(d,i){
    var thingmid = (alongWidth(d.source)-alongWidth(d.target));
    if (thingmid>0){
    return alongWidth(d.target);
    }
    else {
      var posmid = thingmid*(-1);
      return alongWidth(d.target);
    }
  })
  .attr("y", height/2)
  .attr("width", 10)
  .attr("height",10)
  .attr("fill", "none")
  .attr("stroke", function(d){ 
    if (d.target==id && id!=null && a==0){
      return "black";
    } else {
      return "white";
      // return "none";
    }
  });
// if (a==0 && id!=null){
// var hCirc = svg.selectAll("hCirc")
//   .data(function(d){
//     return data.links;
//   })
//   hCirc.enter().append("circle")
//   .attr("class","hCirc")
//   .attr("opacity", ".1")
//   // .attr("x", function(d,i){ return i*20})
//   .attr("cx", function(d,i){
//     var thingmid = (alongWidth(d.source)-alongWidth(d.target));
//     if (thingmid>0){
//     return alongWidth(d.target);
//     }
//     else {
//       var posmid = thingmid*(-1);
//       return alongWidth(d.target);
//     }
//   })
//   .attr("cy", height/2)
//   .attr("r", 6)
//   // .attr("fill", "blue")
//   .attr("stroke-width",3)
//   .attr("stroke", function(d){ 
//     if (d.source==id && id!=null){
//       return "black";
//     } else {
//       return "white";
//       // return "none";
//     }
//   });
// }
if (a==1){
  circle.remove();
  // rect.remove();
}
}

//personal check references
// var line = svg.selectAll("line")
//   .data(function(d){ 
//     return data.links;
//     // console.log(d3.ascending(d.group, d.group));
//   })
//  .enter().append("line")
//  .attr("opacity", .2)
//   .attr("x1", function(d,i){   // if (d.source==2 && d.target==0){
//   // if (d.target==0){
//     // console.log(d.source);
//     return alongWidth(d.source);
//   // }
//   // else {
//   //   return "-10";
//   // }
//  })
//  .attr("y1", function(d,i){ return ((height/2)-i) })
//  .attr("x2", function(d,i){
//   // if (d.target==0){
//     return alongWidth(d.target);
//   // }
//   // else {
//   //   return "-10";
//   // }
//  })
//  .attr("y2", height/2)
//   .attr("stroke",function(d,i){
//     var thingmid = (alongWidth(d.source)-alongWidth(d.target));
//     if (thingmid>0){
//       return "red";
//     } 
//     else {
//       return "blue";
//     }
//   })
//  .attr("stroke-width", 3)
//  .attr("fill", "pink");
});