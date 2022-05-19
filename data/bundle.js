var root = document.getElementById("root");

setInterval(function () {
    fetch("/api/status").then(res => {
        return res.json()
    }).then(status => {
        console.log(status)

        root.innerHTML = `
        <div>
            <h4>Coffee maker status</h4>

            <div>Power: <strong style="color: ${status.isCoffeeMakerOn ? "green" : "inherit"}">
            ${status.isCoffeeMakerOn ? "ON" : "OFF"}</strong></div>
            <div>Boiler status: <strong>${status.isBoilerOn ? "ON" : "OFF"}</strong></div>
            <div>Boiler current temperature: <strong>${Math.floor(status.temperature)}°C</strong></div>
            <div>Is ready for coffee?: <strong style="color: ${status.isReadyForCoffee ? "green" : "inherit"}">
            ${status.isReadyForCoffee ? "YES" : "NO"}</strong></div>
        </div>
        `
    })
}, 1000);


document.addEventListener("click", function (event) {
    switch (event.target.id) {
        case "on":
            fetch("/api/on");
            break;
        case "off":
            fetch("/api/off");
            break;
    }
})

var source = new EventSource('/events');

source.addEventListener('open', function (e) {
    console.log("Events Connected");
}, false);

source.addEventListener('error', function (e) {
    if (e.target.readyState != EventSource.OPEN) {
        console.log("Events Disconnected");
    }
}, false);

var logsDiv = document.getElementById("logs");

source.addEventListener('message', function (e) {
    var logRow = document.createElement("div");
    logRow.innerHTML = new Date().toLocaleTimeString() + " | " + e.data;

    logsDiv.insertBefore(logRow, logsDiv.firstChild);
}, false);
