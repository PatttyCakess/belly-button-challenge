const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
samples = d3.json('../samples.json')
samples.then(function(d){
    let names= d.names;
    let metadata = d.metadata;
    let samples = d.samples;
    let dropdownMenu = d3.select("#selDataset");
    for (let i = 0; i < names.length; i++){
        dropdownMenu.append('option').text(names[i])
    }
    let id = dropdownMenu.property("onchange");

    // display default
    function init() {
        let data = [{
            values: SortNSlice(samples[0].sample_values),
            type: "bar",
            orientation: "h"
        }];
        
        Plotly.newPlot('bar', data)
    }

    // sort function
    function SortNSlice(values){
        let sorted = values.sort(function compareFunction(a,b){
            return b-a
        })

        let top10 = sorted.slice(0,10)
        console.log(top10)
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