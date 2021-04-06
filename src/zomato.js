function getRestraunts(url) {
    let data = null;
    let restaurants = [];

    const xhr = new XMLHttpRequest();

    // set `onerror` handeler
    xhr.onerror = (e) => console.log("error");

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {

            // this means we have all the info
            let obj = JSON.parse(this.responseText);
            let restaurantData;

            for (let i = 0; i < obj.restaurants.length; i++) {
                //console.log(`${obj.restaurants[i]}`);

                //setup data
                restaurantData = {
                    rName: obj.restaurants[i].restaurant.name,
                    rAddress: obj.restaurants[i].restaurant.location.address,
                    rCity: obj.restaurants[i].restaurant.location.city,
                    rCuisine: obj.restaurants[i].restaurant.cuisines
                }
                restaurants.push(restaurantData);
            }



            /* List out the data */
            for (let j in restaurants) {
                let item = restaurants[j];
                //console.log("item: " + item);
                let li = document.createElement("li");
                //let restList = document.querySelector("#restaurantList");
                restaurantList.appendChild(li);
                li.innerHTML = (`<h2>${item.rName}</h2>
                            <h3>Location: ${item.rAddress} </h3>
                            <p>City: ${item.rCity}</p>
                            <p>Cuisine: ${item.rCuisine}</p>
                            </div>`);
            }


            //otherwise if no results
            if(obj.restaurants.length == 0)
            {
                cleared.innerHTML = "Search complete! There were no matches... ";
            }
            else{
                //tell the user search is complete when done! - if data
            cleared.innerHTML = "Search complete! Here are your results: ";
            }
            

        } else {

            //let the user know we are searching
            cleared.innerHTML = "Loading your search... ";
        }
    });

    //set onload
    xhr.onload = (e) => {

        // nothing should happen here...

    };

    xhr.open("GET", url);
    //console.log("load URL: " + url);

    xhr.send(data);
}

export { getRestraunts };