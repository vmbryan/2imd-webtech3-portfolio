class App{
    constructor(){
        this.getLocation();
        this.lat;
        this.lng;
    }

    getLocation(){
        navigator.geolocation.getCurrentPosition(this.gotLocation.bind(this), this.errorLocation.bind(this));
    }
    
    gotLocation(result){
        console.log(result);
        this.lat = result.coords.latitude;
        this.lng = result.coords.longitude;
        this.getWeather();
        this.getGame();
    }

    getWeather(){
         
        let temperature = localStorage.getItem("temperature");
        setTimeout(() => {localStorage.removeItem("temperature");},1000*60*60);
        if(temperature == null || temperature == "null"){
            console.log("nodata");
            let url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/de41b82410acc0ea1e904b4c96eb9b1e/${this.lat},${this.lng}?units=si`;
            fetch(url)
                .then(response => {
                    return response.json();
                })
                .then(data =>{
                    temperature = localStorage.setItem("temperature",(data.currently.temperature));
                    document.querySelector("#weather").innerHTML = "Het is " + data.currently.temperature + " graden.";
                })
                .catch(err => {
                    console.log(err);
                });
        }else{
            console.log("data from storage");
            document.querySelector("#weather").innerHTML = "Het is " + localStorage.getItem("temperature") + " graden."
        }
    }
    getGame(){
        let graden = document.querySelector("#weather").innerHTML;
        if(graden <= 20){
            fetch("https://rawg-video-games-database.p.rapidapi.com/games", {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
                    "x-rapidapi-key": "9e620c3e1amsh83cc64223ab9646p1f70e9jsn4250c13eed9c"
                }
            })
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                console.log(err);
            });
        }
    }

    errorLocation(result){
        console.log(err);
    }

}

let app = new App;