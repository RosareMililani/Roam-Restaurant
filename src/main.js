import * as map from "./map.js";
import * as classes from "./classes.js";
import * as zomato from "./zomato.js";

let search;

const loadPHP = "src/zomato.php?";
let phpURL;
let restaurantList;
let searchWord;
function loadPOI() {
    search = document.querySelector("#searchterm").value;
    restaurantList = document.querySelector("#restaurantList");

    if (search != searchWord && search != null) {
        let restPHP = encodeURIComponent(search);

        //console.log(`link: ${restPHP}`);
        phpURL = `${loadPHP}restaurants=${restPHP}`;
        //console.log("php URL: " + phpURL);

        zomato.getRestraunts(phpURL);
        //console.log("search results:");
        //console.log(zomato.getRestraunts.restaurants);
    }
}


function init() {
    map.initMap();

    setupUI();
}

function setupUI() {
    ffBtn.onclick = () => {
        //load in fast food restraunts
        cleared.innerHTML = "Here are some fast food restraunts!";
        map.loadFFData();
        //console.log("I'm being clicked - ff");
    };

    topBtn.onclick = () => {
        //load in top 50
        cleared.innerHTML = "The Top 50 Restaurants, according to Yelp!";
        map.loadTopData();
        //console.log("im being clicked - top");
    }

    clearBtn.onclick = () => {
        //clear everything
        if(document.querySelector("#clearAll").checked)
        {
            map.removeAllMarkers();
            cleared.innerHTML = "Cleared and Reset!";
            restaurantList.innerHTML = "";
            document.querySelector("#searchterm").value = "";
        }
        if(document.querySelector("#clearMap").checked)
        {
            map.removeAllMarkers();
            cleared.innerHTML = "Cleared Map!";
        }
        if(document.querySelector("#clearResults").checked)
        {
            deleteList();
            cleared.innerHTML = "Cleared Results!";
        }
        //console.log('im clearing');
    }

    searchButton.onclick = () => {
        //search and clear any previous searches
        
        loadPOI();

        cleared.innerHTML = "Grabbing search ";
        //console.log("data loaded..");
    }
}

function deleteList() {
    let e = document.querySelector("ul");

    //e.firstElementChild can be used. 
    let child = e.lastElementChild;
    while (child) {
        e.removeChild(child);
        child = e.lastElementChild;
    }
}

function parseCSV(string) {
    //`regions ` will holf `Region` instances
    let regions = [];

    //currently the entire is one big string
    let rows = string.trim().split("\n");

    //loop through `rows` and split again
    // https://stackoverflow.com/questions/26664371/remove-more-than-one-comma-in-between-quotes-in-csv-file-using-regex?rq=1
    const regex = /,(?!(([^"]*"){2})*[^"]*$)/;
    for (let row of rows) {
        //replace the commas inside of quotes with a dash
        row = row.replace(regex, " - ");

        //get rid of all quotes in the `row`
        row = row.replace(/"/g, "");

        //the extra comma(s) and quotes are fone - now turn `row` into an array
        row = row.split(",");
        regions.push(new classes.Region(row));
    }

    return regions;
}
function parseTopCSV(string) {
    //`top ` will holf `Top` instances
    let top = [];

    //currently the entire is one big string
    let topRows = string.trim().split("\n");

    const regex = /,(?!(([^"]*"){2})*[^"]*$)/;
    for (let topRow of topRows) {
        //replace the commas inside of quotes with a dash
        topRow = topRow.replace(regex, " - ");

        //get rid of all quotes in the `topRow`
        topRow = topRow.replace(/"/g, "");

        //the extra comma(s) and quotes are fone - now turn `topRow` into an array
        topRow = topRow.split(",");
        top.push(new classes.Top(topRow));
    }

    return top;
}


export { init, parseTopCSV, parseCSV };
