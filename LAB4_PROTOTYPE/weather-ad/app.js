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
        this.getPokemon();
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
                    document.querySelector("#graden").innerHTML = data.currently.temperature ;
                })
                .catch(err => {
                    console.log(err);
                });
        }else{
            console.log("data from storage");
            document.querySelector("#graden").innerHTML = localStorage.getItem("temperature");
        }
    }

    getPokemon(){
        const apiData = {
            url: 'https://pokeapi.co/api/v2/',
            type: 'pokemon',
            id: Math.floor(Math.random() * 400) + 1,
        }
        const {url, type, id} = apiData;
        const apiUrl = `${apiData.url}${apiData.type}/${apiData.id}`;

        console.log(apiUrl);

        let graden = document.getElementById('graden').innerText;
        console.log(graden);

        if(graden <= 20){
            
            fetch(apiUrl)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    document.querySelector(".pokemon").src=`${data.sprites.front_default}`;
                    document.getElementById('name').innerText=`${data.name}`;
                })
                .catch(err => {
                    console.log(err);
                })
        }else{
            console.log("het is warmer dan 20 graden");
            document.querySelector(".pokemon").src='https://media1.tenor.com/images/9c7ec77c489fb154c0e4bf44bfec583d/tenor.gif';
            document.getElementById('todo').innerText="It's a great time to go outside!"
        }
    }


    errorLocation(result){
        console.log(err);
    }

}

let app = new App;