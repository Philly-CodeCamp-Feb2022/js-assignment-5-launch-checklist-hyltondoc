// Write your helper functions here!
// require('isomorphic-fetch');



function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   /*
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: </li>
                    <li>Diameter: </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: </li>
                    <li>Number of Moons: </li>
                </ol>
                <img src="">
   */
document.getElementById("missionTarget").innerHTML = 
` 
 <h2>Mission Destination</h2>
 <ol>
     <li>Name: ${name} </li>
     <li>Diameter: ${diameter}  </li>
     <li>Star: ${star} </li>
     <li>Distance from Earth: ${distance}  </li>
     <li>Number of Moons: ${moons}  </li>
 </ol>
 <img src="${imageUrl}">`
 ;
}

function validateInput(testInput) {
    if (testInput.value === ""){
          return "Empty";
    }
    if (isNaN(testInput.value)){
        return "Not a Number";
    }
    if (!(isNaN(testInput.value))){
        return "Is a Number";    
    } else{
        return testInput;
    }
}

function formSubmission(pilot, copilot, fuelLevel, cargoLevel) {

        if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || validateInput(fuelLevel) === "Empty" 
        || validateInput(cargoLevel) === "Empty") {
           alert("All fields required!");
           return false;
    
        }
        if (validateInput(fuelLevel) === "Not a Number" || validateInput(cargoLevel) === "Not a Number"){
           alert("Fuel level and Cargo Level must be valid numbers!")
           return false;
        }
        if (validateInput(pilot) === "Is a Number" || validateInput(copilot) === "Is a Number"){
           alert("Pilot and copilot names must be names using characters")
           return false;

        } else{
            return true;
        }

}

async function myFetch() {
    let planetsReturned;
    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json")
    // .then(function(response) {
    //         console.log(response.json())
    //});
    return planetsReturned;
}

function pickPlanet(planets) {
    //let index = 0;
    let planet;
    planet = planets[Math.floor(Math.random()*planets.length)];
    //index = Math.floor(Math.random()*planets.length);
    return planet;    
};

// module.exports.addDestinationInfo = addDestinationInfo;
// module.exports.validateInput = validateInput;
// module.exports.formSubmission = formSubmission;
// module.exports.pickPlanet = pickPlanet; 
// module.exports.myFetch = myFetch;


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

    //    document.addEventListener("load", event =>{
           let planetChosen = pickPlanet(json);
            //document.getElementById("missionTarget").innerHTML = `Planet:${planetChosen.name}`
            addDestinationInfo(document, planetChosen.name, planetChosen.diameter, planetChosen.star, 
                planetChosen.distance, planetChosen.moons, planetChosen.image) 
                // event.preventDefault();
        // })  
       
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