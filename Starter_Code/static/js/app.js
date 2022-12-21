const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";



    // display default
    function init() {
        samples = d3.json(url)
        samples.then(function(d){
        let names= d.names;
        let metadata = d.metadata;
        let samples = d.samples;
        var dropdownMenu = d3.select("#selDataset");
        for (let i = 0; i < names.length; i++){
        dropdownMenu.append('option').text(names[i])
        }

        let sortedValues = SortNSlice(samples[0]);
        
        let bardata = [{
            x: sortedValues.map(object => object.sample_values),
            y: sortedValues.map(object => object.otu_id),
            text: sortedValues.map(object => object.otu_id),
            type: "bar",
            orientation: "h"
        }];
        
        Plotly.newPlot('bar', bardata)

        let allValues = PullAll(samples[0])
        
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
        }]
    
        Plotly.newPlot('bubble', bubbledata)

        updateMetadata(samples[0].id,metadata)


        //
        

    })


    }
    // function for when dropdown selection changes
    function optionChanged(id) {
        samples = d3.json(url)
        samples.then(function(d){
        let samples = d.samples;
        let metaData = d.metadata;

        for (i = 0; i < samples.length; i++){
            if(samples[i].id == id){
               
            var newBarValues = SortNSlice(samples[i])

            var newBubbleValues = PullAll(samples[i])
            }
        }
        // update bar chart
        updateBarChart(newBarValues)

        // update meta data
        updateMetadata(id, metaData)

        // update bubble chart
        updateBubbleChart(newBubbleValues)
        
        })
    }

    // update barchart function
    function updateBarChart(values){
        let x = [];
        let y = [];
        let text = [];

        x = values.map(object => object.sample_values);
        y = values.map(object => object.otu_id);
        text = values.map(object => object.otu_id);
        
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
            dicts.push(dict)
        }
        // sort the values
        let sorted = dicts.sort(function compareFunction(a,b){
            return b.sample_values-a.sample_values
        })

        // set top 10 bacterias slice to a var
        let top10 = sorted.slice(0,10)
        
        top10.reverse()
        // return top 10 as fucntion output
        return top10
        
        
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


