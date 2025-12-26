//other variables
let inputValue = 0;

//output variables
let lengthString = "";
let volumeString = "";
let massString = "";
let resultFeet=0;
let resultMeters=0;
let resultGallons=0;
let resultLiters=0;
let resultPounds=0;
let resultKilograms=0;


//variables to store conversion rates
const metersToFeet = 3.28084;
const feetToMeters = 0.3048;
const poundsToKilograms = 0.453592;
const kilogramsToPounds = 2.20462;
const litersToGallons = 0.264172;
const gallonsToLiters = 3.78541;

//layout Variables
const inputField = document.getElementById("input-field");
inputField.value = "0";
const convertButton = document.getElementById("convert-button");
const clearButton = document.getElementById("clear-button");
const lengthOutput = document.getElementById("length-output");
const volumeOutput = document.getElementById("volume-output");
const massOutput = document.getElementById("mass-output");

//---functions---//
function renderContents() {
    lengthOutput.textContent = lengthString;
    volumeOutput.textContent = volumeString;
    massOutput.textContent = massString;
}

function convertUnits() {
    inputValue= parseFloat(inputField.value);
    resultFeet = (inputValue * metersToFeet).toFixed(3);
    resultMeters = (inputValue * feetToMeters).toFixed(3);
    resultGallons = (inputValue * litersToGallons).toFixed(3);
    resultLiters = (inputValue * gallonsToLiters).toFixed(3);
    resultPounds = (inputValue * kilogramsToPounds).toFixed(3);
    resultKilograms = (inputValue * poundsToKilograms).toFixed(3);
    buildStrings();
    renderContents();
}
function clearInput() {
    inputField.value = "";
    lengthString = "";
    volumeString = "";
    massString = "";
    renderContents();
}
function buildStrings() {
    lengthString = `${inputValue} meters = ${resultFeet} feet | ${inputValue} feet = ${resultMeters} meters`;
    volumeString = `${inputValue} liters = ${resultGallons} gallons | ${inputValue} gallons = ${resultLiters} liters`;
    massString = `${inputValue} kilograms = ${resultPounds} pounds | ${inputValue} pounds = ${resultKilograms} kilograms`;

}


//---event listeners---//
convertButton.addEventListener("click", function(){
    convertUnits();
});
clearButton.addEventListener("click", clearInput);
inputField.addEventListener("click", clearInput);
