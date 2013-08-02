d3.json("datasource.json", function(data) {

// console.log(data.nodes[0]);
// console.log(data.nodes[0].group);

// console.log(data.nodes[0].tags.size);

// console.log(data.links)
var links = data.links;
var nodes = data.nodes;
// var width = $('#omap').width();
// var height = $('#omap').height();

var width = 1600; //for now
var height = 500; //for now
var strokey = 1;

var toggleVieww = 150; //svg toggle boxes height
var toggleViewh = 40; //svg toggle boxes height

var togglewidth = 100; //svg toggle boxes height
var toggleheight = 20; //svg toggle boxes height

var margin = width/2;
var wscale = height/5;
var scale = height/5;
var hescale = height/150;
// var x1 = scale*2;
// var y1 = h/2; 
var narrow = 1.5; //normal rect width
var thick = 4; //thickness for highlighting, mouseovers
var lmargin = 15; //left margin
textmargin = 5; //text justifications

var maxResponse = d3.max(data.nodes, function(d,i) { return i;} );
console.log(maxResponse);

var maxScore = d3.max(data.nodes, function(d) { return d.group;} );
console.log(maxScore);

//this doesn't work right
var maxTags = d3.max(data.nodes, function(d) { return d.tags;} ); //this doesn't work right
console.log(maxTags);
console.log("maxTags");
console.log(maxTags.length);

var maxLinks = d3.max(data.links, function(d){ 
  return d.target;
});
console.log(maxLinks);

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



//for wesley's
var sortview = d3.select("#click").append("svg")
.attr("width", toggleVieww)
.attr("height", toggleViewh);

var sortToggle = sortview.append("text")
.attr("x", lmargin)
.attr("y", toggleheight-textmargin)
.attr('fill','grey')
.attr('class','toggle')
.text("TOGGLE VIEW");

var svg = d3.select("#omap").append("svg")
  .attr({
        "width": "100%",
        "height": "100%"
      })
  .attr("viewBox", "0 0 " + width + " " + height )
  .attr("preserveAspectRatio", "xMinYMin")
  .attr("pointer-events", "all")

var sectionview = d3.select("#clicked").append("svg")
// .attr("width", width)
// .attr("height", height)
.attr({
        "width": "100%",
        "height": "100%"
      })
    .attr("viewBox", "0 0 " + width + " " + height )
    .attr("preserveAspectRatio", "xMinYMin")
     .attr("pointer-events", "all")
     ///////////will this work
    //  .append("g")
    // .call(d3.behavior.zoom().scaleExtent([1, 8]).on("zoom", zoom))
    // .append("g")
//to change 


function doNodes(){
  b = 1; //for toggle
var blue = "#8ED8F8";
var green = "#b9d989";
var pink = "#F6ADCD"; 

var prevClicked = null;
// var width = $('#graphHolder').width();
// var height = $('#graphHolder').height();

var force = d3.layout.force()
    .charge(-120)
    .linkDistance(45)
    .size([width, height]);

var foci = [{x: 150, y: 150}, {x: 350, y: 250}, {x: 700, y: 400}];

var p0 = [width/2, height/2, 240],
    p1 = [width/2, height/2, 480],
    p2 = [width/2+125, height/2],
    p3 = [width/2+245, height/2];

var legend1 = [width - 50, 100];
var legend2 = [width - 50, 100];
var legend3 = [width - 50, 100];

sectionview.selectAll("circle")
    .data([p0, p1])
    .enter().append("circle")
    .attr("cx", function(d) { return d[0]; })
    .attr("cy", function(d) { return d[1]; })
    .attr("r", function(d) { return d[2] / 2 - .5; })
    .attr("fill", "none")
    .attr("stroke", "gray");

sectionview.selectAll("text")
  .data([p2, p3])
  .enter().append("text")
  .attr("x", function(d) { return d[0]; })
  .attr("y", function(d) { return d[1]; })
  .text(function(d) {
    if(d[0] < 850) {
      return "NEAR";
    } else return "FAR";
  })
  .attr("font-family", "Gotham, sans-serif") //this should be class based
  .attr("font-weight", 700)
  .attr("font-size", "18px")
  .attr("fill", "#555");

force.nodes(data.nodes)
    .links(data.links)
    .start();

var link = sectionview.selectAll(".link")
    .data(data.links)
    .enter().append("line")
    .attr("class", "link")
    .style("stroke-width", function(d) { return Math.sqrt(d.value); });

// var div = d3.select("#graphHolder").append("div")   
//     .attr("class", "tooltip")               
//     .style("opacity", 0);
// define the nodes

//THIS IS FOR THE ZOOM TIMES
function redraw() {
  node.attr("transform",
      "translate(" + d3.event.translate + ")"
      + " scale(" + d3.event.scale + ")");
}

var node = sectionview.selectAll(".node")
    .data(data.nodes)
    .enter().append("circle")
    .attr("class", "node")
    .attr("r", 10)
    .style("fill", function(d) {
      if(d.group == 1) {
        return blue;
      } 
      if(d.group == 2) {
        return green;
      }
      else {
        return pink; 
      }
    })
    .call(force.drag)
    //ADDED THIS
    .on('mouseover', function(d,i){
    d3.select(this)
    .attr("stroke","gray")
    })
    .on('mouseout', function(d,i){
    d3.select(this)
    .attr("stroke", "white")
    })

    // .on("mouseover", function(d) {
    //   // showInformation(d.id);
    //   div.transition()        
    //     .duration(200)      
    //     .style("opacity", .9);      
    //   div .html(d.name)  
    //     .style("left", (d3.event.pageX - 80) + "px")     
    //     .style("top", (d3.event.pageY - 60) + "px"); 
    // })
    // .on("mouseout", function(d) {
    //   div.transition()        
    //     .duration(500)      
    //     .style("opacity", 0);   
    // })
    .on("click", function(d) {
      showInformation(d.id);
    });

  force.on("tick", function() {
      link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

      node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
    });

function zoom() {
  sectionview.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}
}
var b=0;
var a=0;

//not node.on
sortToggle.on('click', function(d,i) {
  console.log("sectiontoggleOn")
  if (b===0){
    //call the section names up
    doNodes();
    //show them slowly
      $("#clicked").show("slow",function(){
        })
      $("#omap").hide("slow",function(){
      })
    }
  else if (b===1){
    //if you click the section toggle button go back to the original visual
     goBack();
    //and hide the section spread
    $("#omap").show("slow",function(){
      // rect()
      // console.log(data)
      })
      $("#clicked").hide("slow",function(){
      })
    }
});
function goBack(){
  b=0;
}
//special jquery library for a nice mouseover headline / title per rectangle
 $('circle').tipsy({ 
        gravity: 'nw', 
        html: true, 
        //fade: true,
        title: function() {
          var d = this.__data__;
          // return d.score+" ("+d.section+")";
          // var intit = parseInt(d.score);
          // return (intit)+" pts";
        }
      });

 function showInformation(id) {
    var name = graph.nodes[id].name;
    var logo = graph.nodes[id].logo;
    var images = graph.nodes[id].images;
    var group = graph.nodes[id].group;
    if(group == 1) {
      $('#toolbox').css("background", blue);
      $('#toolbox').css("border", "1px solid " + blue);
      $('#tray-handle').css("background", blue);
      $('.tag').css("background-color", blue);
      $('#toolbox .title').text('IDEAL PERFORMANCE');
    } else if (group == 2) {
      $('#toolbox').css("background", green);
      $('#toolbox').css("border", "1px solid " + green);
      $('#tray-handle').css("background", green);
      $('#toolbox .title').text("ADAPTIVE ENVIRONMENTS");
      $('.tag').css("background-color", green);
    } else {
      $('#toolbox').css("background", pink);
      $('#toolbox').css("border", "1px solid " + pink);
      $('#tray-handle').css("background", pink);
      $('.tag').css("background-color", pink);
      $('#toolbox .title').text("PROGRAMMED SERENDIPITY");
    }
    if(logo) {
      $('#toolbox #concept_content').html("<img src="+logo+">");
    } else {
      $('#toolbox #concept_content').text(name);
    }
  node.exit().remove();

}

rect()
var rect = svg.selectAll("rect")
function rect(){
  var thistag;
  // var a;
  var rect = svg.selectAll("rect")
  .data(function(d){ 
    return data.nodes;
  })
 .enter().append("rect")
 .attr("opacity", ".2")
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
.attr("stroke","blue")
.attr("fill", function(d){
  return "blue";
})
.on('mouseover', function(d,i){
  a=0;
  var thisid = d.id;
  thistag = d.tags;
  console.log(thistag);
  d3.select(this)
  .attr("stroke", "black")
  .attr("stroke-width", "8")
  makeArc(thisid)
 // tagCircle(thistag) //not working right
  })
.on('mouseout', function(d,i){
  a=1;
  var thisid = d.id;
  makeArc(thisid)
  d3.select(this)
  .attr("stroke", "blue")
});

      $('rect').tipsy({ 
        gravity: 'nw', 
        html: true, 
        title: function() {
          var d = this.__data__;
          console.log(d)
          makeArc(d.id)
          return d.name;
        }
      });  
}


//not working
function tagCircle(takeTag){
//here i'm going to say:
//of the tags that you have
//if any match tags in any other object
//then color this rect red
console.log(takeTag[0]);
rect
 .transition()
 .duration(500)
.attr("width",function(d,i){
 // if (thistag!=null){
    console.log(takeTag[0])
    console.log(maxTags.length)
    for (var z = 0; z< 6; z++){
        console.log(takeTag[z])
        console.log(d.name)
      if (takeTag[z]===d.tags){
        console.log(takeTag[z])
        console.log(d.tags)
       return 100
      }
      else {
        return 10
      }
    }
})
.attr("fill", function(d){
    for (var z = 0; z< maxTags; z++){
      if (takeTag[z]===d.tags){
       return "red"
      }
      else {
        return "blue"
      }
    }
  })
}







//each piece of data has an ID
//each ID has a source and a target
//source is ID
//target is to other's ID
//here is the most basic version of connections between connections! 
//if you ignore the fact that it's lines not arcs, it works properly in that it links the data correctly
// var circle = svg.selectAll("circle")

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
return i*20;
  })
  //   function(d,i){
  //   console.log("source")
  //   console.log(d.source)
  //   var thingmid = (alongWidth(d.source)-alongWidth(d.target));
  //   if (thingmid>0){
  //   return alongWidth(d.target)+(thingmid/2);
  //   }
  //   else {
  //     var posmid = thingmid*(-1);
  //     return alongWidth(d.target)-(posmid/2);
  //   }
  // })
  .attr("cy", height/2)
  .attr("r", 0)
  .transition()
  .duration(3000)
        // .ease("elastic")
  .attr("r", function(d,i){
return i*20;
  })
  //   function(d,i){
  //   var thingmid = (alongWidth(d.source)-alongWidth(d.target));
  //   if (thingmid>0){
  //   return thingmid/2;
  // }
  // else{
  //     var posmid = thingmid*(-1);
  //     // console.log(posmid);
  //     return posmid/2;
  //   }
  // })
  .attr("fill", "none")
  .attr("stroke",function(d,i){
    console.log(d.source)
    if (d.source==id && id!=null){
    return "grey";
  } else {
    return "black"; //"pink"
  }
  })
  .attr("stroke-width", 3);
if (a==1){
  circle.remove();
  // rect.remove();
}
}


});