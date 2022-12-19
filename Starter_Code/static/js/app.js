// const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
samples = d3.json('samples.json')
samples.then(function(d){
    let names= d.names;
    let metadata = d.metadata;
    let samples = d.samples;
    let dropdownMenu = d3.select("#selDataset");
    for (let i = 0; i < names.length; i++){
        dropdownMenu.append('option').text(names[i])
    }
    let selectedId = dropdownMenu.property("onchange");

    // display default
    function init() {
        let sortedValues = SortNSlice(samples[0]);
        
        let data = [{
            x: sortedValues.map(object => object.sample_values),
            y: sortedValues.map(object => object.otu_id),
            text: sortedValues.map(object => object.otu_id),
            type: "bar",
            orientation: "h"
        }];
        
        Plotly.newPlot('bar', data)
    }
    // set up for when dropdown selection changes
    dropdownMenu.on("change", optionChanged)

    // funciton to update the plot
    function optionChanged() {
        for (i = 0; i < samples.length; i++){
            if(samples[i].id == selectedId){
                let newValues = SortNSlice(samples[i])

               let x = [];
               let y = [];
               let text = [];

               x = newValues.map(object => object.sample_values);
               y = newValues.map(object => object.otu_id);
               text = newValues.map(object => object.otu_label);

               Plotly.restyle('bar', 'x', [x]);
               Plotly.restyle('bar', 'y', [x]);
               Plotly.restyle('bar', 'text', [text]);
            }
        }

    }

    // sort function
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

    init()

})


// // function to grab data
// function getData(){

//     // Assign the value of the dropdown menu option to a letiable
//     let id = dropdownMenu.property("value");
//     for (let i = 0; i < samples.length; i++){
//             let data = [];
//             if (id == BBData.samples[i].id){

//             }
//     }
// }

// // display default
// function init() {
//     let data = [{
//         values: SortNSlice(BBData.samples.sample_values),
//         type: "bar",
//         orientation: "h"
//     }];

//     Plotly.newPlot('bar', data)
// }

// // sort function
// function SortNSlice(values){
//     let sorted = values.sort(function compareFunction(a,b){
//         return b-a
//     })

//     let top10 = sorted.slice(0,10)

//     return top10
// };

// set up dropdown menu


// init()