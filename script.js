// Write your JavaScript code here!

window.addEventListener("load", function() {
  
        // let listedPlanets;
        // Set listedPlanetsResponse equal to the value returned by calling myFetch()
        let listedPlanetsResponse = myFetch();
        listedPlanetsResponse.then(function (result) {
            listedPlanets = result.json();
           // console.log(listedPlanets);
       listedPlanets.then(function(json) {
            console.log(listedPlanets);
            // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
    
           document.addEventListener("click", event =>{
               let planetChosen = pickPlanet(json);
                //document.getElementById("missionTarget").innerHTML = `Planet:${planetChosen.name}`
                addDestinationInfo(document, planetChosen.name, planetChosen.diameter, planetChosen.star, 
                    planetChosen.distance, planetChosen.moons, planetChosen.image) 
            })  
           
        });
    });
            
    
    let form = document.querySelector("form");
    let pilotInput = form.elements[0];//document.querySelector("input[name=pilotName]");
    let copilotInput = form.elements[1];//document.querySelector("input[name=copilotName]");
    let fuelLevelInput = form.elements[2];//document.querySelector("input[name=fuelLevel]");
    let cargoLevelInput = form.elements[3];//document.querySelector("input[name=cargoMass]");
    document.addEventListener("submit", event=>{
    
    formSubmission(pilotInput, copilotInput, fuelLevelInput, cargoLevelInput);
    event.preventDefault();
    });
    
    let pilotName = form.elements[0].value;
    let copilotName= form.elements[1].value;
    let fuelLevelVolume = form.elements[2].value;
    let cargoLevelKg = form.elements[3].value;
    
    
    
    document.addEventListener("submit", event=>{
    
    if (Number(fuelLevelVolume) < 10000){
        document.getElementById("faultyItems").style.visibility = "visible";
        document.getElementById("launchStatus").style.color= "red";
        document.getElementById("launchStatus").innerHTML = "Shuttle Not Ready For Launch";
    
        document.getElementById("pilotStatus").innerHTML = `Pilot ${pilotName} is ready for launch`;
        document.getElementById("copilotStatus").innerHTML = `Co-pilot ${copilotName} is ready for launch`;
        document.getElementById('fuelStatus').innerHTML =  'Fuel level is too low for launch';
        //document.getElementById('cargoStatus').innerHTML = 'Cargo mass is low enough for Launch';
    }
    
    if (Number(cargoLevelKg) > 10000){
    document.getElementById("faultyItems").style.visibility = "visible";
    document.getElementById("launchStatus").style.color= "red";
    document.getElementById("launchStatus").innerHTML = "Shuttle Not Ready For Launch";
    document.getElementById("pilotStatus").innerHTML = `Pilot ${pilotName} is ready for launch`;
    document.getElementById("copilotStatus").innerHTML = `Co-pilot ${copilotName} is ready for launch`;
    document.getElementById('cargoStatus').innerHTML = 'Cargo mass is too high for Launch';
    }
    
    if ((Number(cargoLevelKg) < 10000) && (Number(fuelLevelVolume) > 10000) && (Number(cargoLevelKg) > 0)){
        document.getElementById("faultyItems").style.visibility = "visible";
        document.getElementById("launchStatus").style.color= "green";
        document.getElementById("launchStatus").innerHTML = "Shuttle Ready For Launch";
        document.getElementById("pilotStatus").innerHTML = `Pilot ${pilotName} is ready for launch`;
        document.getElementById("copilotStatus").innerHTML = `Co-pilot ${copilotName} is ready for launch`; 
        document.getElementById('fuelStatus').innerHTML =  'Fuel level is high enough for launch';
        document.getElementById('cargoStatus').innerHTML = 'Cargo mass is low enough for Launch';
    }
    event.preventDefault();
        });
    
     });