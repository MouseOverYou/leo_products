document.getElementById("sunny").addEventListener("mousedown", (event)=>{
    changeWeather("sunny")
    makeItRain(false)
    makeItStorm(false)
    makeItSunny(true)
})

document.getElementById("rainy").addEventListener("mousedown", (event)=>{
    changeWeather("rainy")
    makeItRain(true)
    makeItStorm(false)
    makeItSunny(false)
})

document.getElementById("stormy").addEventListener("mousedown", (event)=>{
    changeWeather("stormy")
    makeItRain(true)
    makeItStorm(true)
    makeItSunny(false)
})

document.getElementById("download-file").addEventListener("mousedown", (event)=>{
    console.log("download pdf")
})

let isRaining = false
let isStorming = false
function changeWeather(weather){
    console.log(weather)
    
}

let currentRainState = false
function makeItRain(state){
    if(currentRainState != state){
        if(state){
            console.log("START RAIN")
            rain = BABYLON.ParticleHelper.CreateAsync("rain", scene, false).then((set) => {
                console.log(set)
                rainSystems = set
                for (const sys of set.systems) {
                    sys.emitRate = 600
                    sys.maxSize = 5
        
                }
                set.start();
            });
        }
        else {
            console.log("STOP RAIN")
            rainSystems.dispose()
        }
    }
    currentRainState=state

}

let currentStormState = false
function makeItStorm(state){
    if(currentStormState != state){
        if(state){
            console.log("START STORM")
            lightningIsHapenning = true
            SpawnLightningBolt()
        }
        else{
            console.log("STOPSTORM")
            lightningIsHapenning = false
        }
    }
    currentStormState = state
}

let currentSunnyState = true
function makeItSunny(state){
    if (currentSunnyState != state){
        if(state){
            console.log("START SUNNY")
            ChangeSky("material.turbidity", skyboxMaterial.turbidity, 0)
            
        }
        else{
            console.log("STOP SUNNY")
            ChangeSky("material.turbidity", skyboxMaterial.turbidity, 200)
        }
    }
    currentSunnyState = state
}