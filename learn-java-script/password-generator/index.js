const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];
const lastAlpha=51;
const lastNum=61;
const lastSymbol=91;
let passwordLength = 12;
let password1 = "";
let password2 = "";
let generateBtn = document.getElementById("generate-btn");
let password1Btn = document.getElementById("password1");
let password2Btn = document.getElementById("password2");


generateBtn.addEventListener("click", function() {
    password1 = generatePassword(passwordLength);
    password2 = generatePassword(passwordLength);
    password1Btn.textContent = password1;
    password2Btn.textContent = password2;
});
password1Btn.addEventListener("click", function() {
    navigator.clipboard.writeText(password1);
    alert("Password 1 copied to clipboard!");
});
password2Btn.addEventListener("click", function() {
    navigator.clipboard.writeText(password2);
    alert("Password 2 copied to clipboard!");
});
function generatePassword(length) {
    let password = "";
    for (let i = 0; i < length; i++) {
        password += characters[Math.floor(Math.random() * characters.length)];
    }
    return password;
}