//fast food
class Region {
    //address,city,country,keys,latitude,longitude,name,postalCode,province,websites
    constructor(row) {
        [this.address,this.city,this.country,this.keys,this.latitude, this.longitude,this.name,this.postalCode,this.province,this.websites] = row;
        this.latitude = +this.latitude;
        this.longitude = +this.longitude;
    }
}

//top 50
class Top {
    //Name,county,state,latitude,longitude,ranking,address,zip,website
    constructor(row) {
        [this.name,this.county,this.state,this.latitude,this.longitude,this.ranking, this.address, this.zip, this.website] = row;
        this.latitude = +this.latitude;
        this.longitude = +this.longitude;
    }
}

export { Region, Top };