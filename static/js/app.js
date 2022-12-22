const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

    // display default
    function init() {
        // pull data from json and store as variables
        samples = d3.json(url)
        samples.then(function(d){
        let names= d.names;
        let metadata = d.metadata;
        let samples = d.samples;

        // set up dropdwon menu
        var dropdownMenu = d3.select("#selDataset");
        for (let i = 0; i < names.length; i++){
        dropdownMenu.append('option').text(names[i])
        };
        
        // pull data for bar chart 
        let sortedValues = SortNSlice(samples[0]);
        
        //set up inital bar cahrt
        let bardata = [{
            x: sortedValues.map(object => object.sample_values),
            y: sortedValues.map(object => object.otu_id),
            text: sortedValues.map(object => object.otu_label),
            type: "bar",
            orientation: "h"
        }];
        
        Plotly.newPlot('bar', bardata);

        // pull data for bubble chart
        let allValues = PullAll(samples[0]);
        
        // set up initial bubble chart
        let bubbledata = [{
            x: allValues.map(object => object.otu_id),
            y: allValues.map(object => object.sample_values),
            
            text: allValues.map(object => object.otu_label),
            mode: 'markers',
            marker:{
                color: allValues.map(object => object.otu_id),
                size: allValues.map(object => object.sample_values)
            },
            type: 'bubble'
        }];
    
        Plotly.newPlot('bubble', bubbledata);

        // update metadata
        updateMetadata(samples[0].id,metadata);

        // set up guage chart
        var data = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                title: { text: "Belly Button Washing Frequency" },
                marker: {size: 28},
                type: "indicator",
                mode: "gauge+number",
                value: metadata[0].wfreq,
                gauge: {
                    axis: {
                        range:[null, 9],
                        tickmode: 'array',
                        tickvals: [1,2,3,4,5,6,7,8,9],
                        ticks:'outside'
                    },
                    bar: {color: "darkblue"},
                    steps: [
                        {range: [0,1], color:'rgb(204, 102, 0)'},
                        {range: [1,2], color:'rgb(255, 204, 0)'},
                        {range: [2,3], color:'rgb(255, 255, 102)'},
                        {range: [3,4], color:'rgb(204, 255, 102)'},
                        {range: [4,5], color:'rgb(153, 255, 102)'},
                        {range: [5,6], color:'rgb(102, 255, 102)'},
                        {range: [6,7], color:'rgb(0, 255, 0)'},
                        {range: [7,8], color:'rgb(0, 204, 102)'},
                        {range: [8,9], color:'rgb(51, 153, 102)'},
                    ]
                }
            }
        ];
        
        var layout = { 
            width: 600, 
            height: 500, 
            margin: { t: 0, b: 0 }
        };
        Plotly.newPlot('gauge', data, layout);

        })


    }
    // function for when dropdown selection changes
    function optionChanged(id) {
        samples = d3.json(url);
        samples.then(function(d){
        let samples = d.samples;
        let metaData = d.metadata;
        
        // find new data based off selected id
        for (i = 0; i < samples.length; i++){
            if(samples[i].id == id){
               
            var newBarValues = SortNSlice(samples[i]);

            var newBubbleValues = PullAll(samples[i])
            };
        };

        // update bar chart
        updateBarChart(newBarValues);

        // update meta data
        updateMetadata(id, metaData);

        // update bubble chart
        updateBubbleChart(newBubbleValues);

        //update gauge chart
        updateGaugeChart(id, metaData);
        
        })
    }

    // update barchart function
    function updateBarChart(values){
        let x = [];
        let y = [];
        let text = [];

        x = values.map(object => object.sample_values);
        y = values.map(object => object.otu_id);
        text = values.map(object => object.otu_label);
        
        Plotly.restyle('bar', 'x', [x]);
        Plotly.restyle('bar', 'y', [y]);
        Plotly.restyle('bar', 'text', [text]);
    }

    // update bubblechart function
    function updateBubbleChart(values){
        let bubbleX = [];
        let bubbleY = [];
        let bubbleText = [];
        bubbleMarkers = [];

        bubbleX = values.map(object => object.otu_id)
        bubbleY = values.map(object => object.sample_values)
        bubbleText = values.map(object => object.otu_label)
        bubbleMarkers = {
            color: bubbleX,
            size: bubbleY
        }

        Plotly.restyle('bubble', 'x', [bubbleX])
        Plotly.restyle('bubble', 'y', [bubbleY])
        Plotly.restyle('bubble', 'text', [bubbleText])
        Plotly.restyle('bubble', 'marker', [bubbleMarkers])
        
    }
            
    // update metaData function
    function updateMetadata(id, metaData){
        for(i=0; i < metaData.length; i++){
            if (metaData[i].id == id){
                var bioData = metaData[i]
            }
        }

        d3.select('#id').text(`ID: ${bioData.id}`);
        d3.select('#ethnicity').text(`Ethnicity: ${bioData.ethnicity}`);
        d3.select('#gender').text(`Gender: ${bioData.gender}`);
        d3.select('#age').text(`Age: ${bioData.age}`);
        d3.select('#location').text(`Location: ${bioData.location}`);
        d3.select('#bbtype').text(`Bely button type: ${bioData.bbtype}`);
        d3.select('#wfreq').text(`Wash frequency: ${bioData.wfreq}`);

    }

    // update gauge chart function
    function updateGaugeChart(id, metaData){
        for(i=0; i < metaData.length; i++){
            if (metaData[i].id == id){
                var bioData = metaData[i]
            }
        }

        Plotly.restyle('gauge', 'value', bioData.wfreq)
    }
    // sort top 10 function
    function SortNSlice(values){
    
        // create empty list to hold dictionaries
        dicts = []
        // loop through data and append to the list of dicts
        for (let i = 0; i < values.sample_values.length; i ++){
            
            dict = {
                sample_values: values.sample_values[i],
                otu_id: `OTU ${values.otu_ids[i]}`,
                otu_label: values.otu_labels[i]
            }
            dicts.push(dict);
        }
        // sort the values
        let sorted = dicts.sort(function compareFunction(a,b){
            return b.sample_values-a.sample_values
        })

        // set top 10 bacterias slice to a var
        let top10 = sorted.slice(0,10);
        
        top10.reverse();
        // return top 10 as fucntion output
        return top10;
        
        
    };

    // pull all data function
    function PullAll(values){
        // create empty list to hold dictionaries
        dicts = []
        // loop through data and append to the list of dicts
        for (let i = 0; i < values.sample_values.length; i ++){
            
            dict = {
                sample_values: values.sample_values[i],
                otu_id: values.otu_ids[i],
                otu_label: values.otu_labels[i]
            }
            dicts.push(dict)

            
        }
    return dicts
    }

init()


