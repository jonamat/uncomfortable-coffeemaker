var root = document.getElementById("root");

var togglePower = document.getElementById("toggle-power");
var isCoffeeMakerOn = document.getElementById("isCoffeeMakerOn");
var isBoilerOn = document.getElementById("isBoilerOn");
var temperature = document.getElementById("temperature");
var isReadyForCoffee = document.getElementById("isReadyForCoffee");

// const host = "http://localhost:8020/proxy";
const host = ''

const powerOn = () => fetch(host + "/api/on");
const powerOff = () => fetch(host + "/api/off");

setInterval(function () {
  fetch(host + "/api/status").then((res) => {
    return res.json();
  }).then((status) => {
    console.log(status);
    isCoffeeMakerOn.innerHTML = status.isCoffeeMakerOn ? "ON" : "OFF";
    isBoilerOn.innerHTML = status.isBoilerOn ? "ON" : "OFF";
    temperature.innerHTML = `${Math.floor(status.temperature)}°C`;
    isReadyForCoffee.innerHTML = status.isReadyForCoffee ? "YES" : "NO";

    isCoffeeMakerOn.classList.toggle("green", status.isCoffeeMakerOn);
    isCoffeeMakerOn.classList.toggle("red", !status.isCoffeeMakerOn);
    isBoilerOn.classList.toggle("green", status.isBoilerOn);
    isBoilerOn.classList.toggle("red", !status.isBoilerOn);
    isReadyForCoffee.classList.toggle("green", status.isReadyForCoffee);
    isReadyForCoffee.classList.toggle("red", !status.isReadyForCoffee);

    if (status.isCoffeeMakerOn) {
      togglePower.addEventListener("click", powerOff, true);
      togglePower.removeEventListener("click", powerOn, true);
      togglePower.innerHTML = "STOP";
      togglePower.classList.add("bg-red");
      togglePower.classList.remove("bg-green");
    } else {
      togglePower.addEventListener("click", powerOn, true);
      togglePower.removeEventListener("click", powerOff, true);

      togglePower.innerHTML = "ACTIVATE";
      togglePower.classList.add("bg-green");
      togglePower.classList.remove("bg-red");
    }
  });
}, 1000);
