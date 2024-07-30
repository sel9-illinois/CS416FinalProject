const heightStart = 5;
const heightEnd = 35;
const ageStart = 6;
const ageEnd = 35;  
const totalNoOfBreedsToLoad = 120;

const margin = {top: 20, right: 120, bottom: 50, left: 50},
    svgWidth = 900,
    svgHeight = 600,
    width = svgWidth - margin.left - margin.right,
    height = svgHeight - margin.top - margin.bottom;

var parseTime = d3.timeParse("%Y");
var formatValue = d3.format(",");
var floatFormatValue = d3.format(".3n");

const colors = ["blue","red","yellow","green","black","blue","gray", "lightgray", "orange"];

const chart = d3.select('#chart')
    .attr("width", svgWidth)
    .attr("height", svgHeight)

const innerChart = chart.append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// x,y values
var xScale = d3.scaleLinear().range([0,width]);
var yScale = d3.scaleLinear().range([height, 0]);    

// x,y axis
var xAxis = d3.axisBottom().scale(xScale);
var yAxis = d3.axisLeft().scale(yScale);

// line chart related
var valueline = d3.line()
    .x(function(d){ return xScale(d.date);})
    .y(function(d){ return yScale(d.value);})
    .curve(d3.curveLinear);


// Adds the svg canvas
var g = innerChart
    // .call(zoom)
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);    

$('.close').click(function() {
    $('.alert').hide();
})

$('.alert').hide();

$("#to_step2").click(function() {
    //d3.selectAll("path").remove();
    innerChart.selectAll("g").remove();
    hide('#step1');
    show('#step2');    
    draw("Small", false, 0);
    draw("Small", false, 1);
    draw("Small", false, 2);
})

$("#to_step3").click(function() {
    //d3.selectAll("path").remove();
    innerChart.selectAll("g").remove();
    hide('#step2');
    show('#step3');
    draw("Medium", false, 0);
    draw("Medium", false, 1);
    draw("Medium", false, 2);
})

$("#to_step4").click(function() {
    //d3.selectAll("path").remove();
    innerChart.selectAll("g").remove();
    hide('#step3');
    show('#step4');
    draw("Large", false, 0);
    draw("Large", false, 1);
    draw("Large", false, 2);
})

$("#startover").click(function() {
    innerChart.selectAll("g").remove();
    hide("#step4");
    //d3.selectAll("path").remove();
    show("#step1");
    draw("Breed", false, 0);
    draw("Breed", false, 1);
    draw("Breed", false, 2);
})

$("input[name='type']").click(function() {
    draw('Breed', $('input:radio[name=type]:checked').val());
})


async function init() {
	const allSizeData = await d3.csv('https://github.com/sel9-illinois/CS416FinalProject/blob/6c62da1e7cd5e963c35fd1eedfa4153714797a70/dog_breeds.csv');
	const smallData = await d3.csv('https://github.com/sel9-illinois/CS416FinalProject/blob/f69a52e60740f7dd504e8c9fb4a585324c2d4977/small_dog_breeds.csv');
	const mediumData = await d3.csv('https://github.com/sel9-illinois/CS416FinalProject/blob/f69a52e60740f7dd504e8c9fb4a585324c2d4977/medium_dog_breeds.csv');
	const largeData = await d3.csv('https://github.com/sel9-illinois/CS416FinalProject/blob/f69a52e60740f7dd504e8c9fb4a585324c2d4977/large_dog_breeds.csv');
}

function drawChart(size, color){
	if(size == "Small"){
		data == smallData;
	} else if(size == "Medium"){
		data == mediumData;
	} else if(size == "Large"){
		data == largeData;
	} else if(size == "Total"){
		data == allSizeData;
	}

        xScale.domain([heightStart - 1, heightEnd + 1]);
        yScale.domain([ageStart - 1, ageEnd + 1]);

        // Add the X Axis
        innerChart
            .append('g')
            .attr('transform', "translate(0," + height + ")")
            .call(xAxis);

        innerChart
            .append("text")             
            .attr("transform",
                "translate(" + (width/2) + " ," + 
                                (height + margin.top + 20) + ")")
            .style("text-anchor", "middle")
            .text("Height (in)");

        // Add the Y Axis
        innerChart
            .append('g')
            .call(yAxis)
            .attr("y", 6);

        innerChart
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Life Expectancy (yrs)");

	innerChart
            .selectAll("dot")
            .data(data)
            .enter().append("circle")
            .attr("r", 5)
            .attr("cx", data.AverageHeight)
            .attr("cy", data.AverageHLongevity)
        
    }
}

// utility functions
function show(step){
    $(step).show();
}

function hide(step){
    $(step).hide();
}
