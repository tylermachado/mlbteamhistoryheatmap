function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var	width = 100,
	height = 1000
	square = 10,
	squarepadding = 5,
	n = 5;

var data = [];

var color = d3.scale.linear()
  .domain([-4, 0, 4])
  .range(["#ca0020","#f7f7f7","#0571b0"]);

var svg = d3.select("#chart").append("svg")
	.attr("width", width)
	.attr("height", height);

for (i=0; i<162; i++) {
	var obj = new Object();
	obj["game"] = i;
	obj["score"] = getRandomInt(-4, 4);
	if (obj["score"] == 0) {
		obj["score"] = 1;
	}
	data.push(obj);
}

function generateGrid() {
    var squares = svg.selectAll("rect")
			.data(data)
			.enter().append("rect")
			.attr("width",square)
			.attr("height",square)
			.attr("id",function(d) { console.log(d);return "game" + (d.game+1) } )
			.attr("x", function(d) { return (d.game % n) * (square+squarepadding) } )
			.attr("y", function(d) { return Math.floor(d.game/n) * (square+squarepadding) } )
			.style("fill", function(d) { return color(d.score) } );
}

generateGrid();