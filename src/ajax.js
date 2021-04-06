function downloadFile(url,callbackRef){
    const xhr = new XMLHttpRequest();

    //set `onerror` handler
    xhr.onerror = (e) => console.log("error");

    //set `onload` handler
    xhr.onload = (e) => {
        const headers = e.target.getAllResponseHeaders();
        const jsonString = e.target.response;
        //console.log(`headers = ${headers}`);
        //console.log(`josnString = ${jsonString}`);
        callbackRef(jsonString);
    }; //end xhr.onload

    //open the connection using the HTTP GET method
    xhr.open("GET", url);

    //we could send request heades here if we wanted to 

    // finally request
    xhr.send();
}

export{downloadFile};