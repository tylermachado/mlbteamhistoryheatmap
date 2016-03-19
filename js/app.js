var	width = 1620,
	height = 1000
	square = 10,
	squarepadding = 0,
	n = 162;

var differentials = [];

function diffPush(a, b, c) {
	var obj = new Object();
	obj["diff"] = parseInt(a);
	obj["day"] = b;
	differentials[c] = obj;
	if (c == 161) {
		console.log(differentials);
		generateGrid();
	}
}


	for (m=3; m<11; m++) {
		month = m.toString();
		if (month.length == 1) { month = "0" + month};
		for (d=1; d<32; d++) {
			day = d.toString();
			if (day.length == 1) { day = "0" + day};
			$.getJSON( "http://mlb.mlb.com/gdcross/components/game/mlb/year_" + 2015 + "/month_" + month + "/day_" + day + "/master_scoreboard.json", function( json ) {
			  var array = json.data.games.game;
			  for (i=0; i<array.length; i++) {
			  	if (array[i].home_name_abbrev == "BOS" && array[i].game_type == "R" && (array[i].status.status == "Completed Early" || array[i].status.status == "Final")) {
			  		var diff = array[i].linescore.r.home - array[i].linescore.r.away;
			  		var gameIndex = (parseInt(array[i].home_win) + parseInt(array[i].home_loss));
			  		diffPush(diff, json.data.games.day, gameIndex-1);

			  	} else if (array[i].away_name_abbrev == "BOS" && array[i].game_type == "R" && (array[i].status.status == "Completed Early" || array[i].status.status == "Final")) {
			  		var diff = array[i].linescore.r.away - array[i].linescore.r.home;
			  		var gameIndex = (parseInt(array[i].away_win) + parseInt(array[i].away_loss));
			  		diffPush(diff, json.data.games.day, gameIndex-1);

			  	}
			  }
			});
		}
	}


var color = d3.scale.linear()
  .domain([-10, 0, 10])
  .range(["#ca0020","#f7f7f7","#0571b0"]);

var svg = d3.select("#chart").append("svg")
	.attr("width", width)
	.attr("height", height);


function generateGrid() {
    var squares = svg.selectAll("rect")
			.data(differentials)
			.enter().append("rect")
			.attr("width",square)
			.attr("height",square)
			.attr("data-game",function(d, i) { return (i+1) } )
			.attr("data-diff",function(d, i) { return d.diff } )
			.attr("x", function(d, i) { return (i % n) * (square+squarepadding) } )
			.attr("y", function(d, i) { return Math.floor(i/n) * (square+squarepadding) } )
			.style("fill", function(d, i) { return color(d.diff) } );
}

