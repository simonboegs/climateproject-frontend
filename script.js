document.getElementById("hurricane").addEventListener("click", () => {
    Array.from(document.getElementsByClassName("info")).forEach((i) => i.style.display = "none");
    document.getElementById("hurricaneInfo").style.display = "block";
    window.location.href = "#anchor";
});
document.getElementById("fire").addEventListener("click", () => {
    Array.from(document.getElementsByClassName("info")).forEach((i) => i.style.display = "none");
    document.getElementById("fireInfo").style.display = "block";
    window.location.href = "#anchor";
});
document.getElementById("temperature").addEventListener("click", () => {
    Array.from(document.getElementsByClassName("info")).forEach((i) => i.style.display = "none");
    document.getElementById("temperatureInfo").style.display = "block";
    window.location.href = "#anchor";
});
document.getElementById("flood").addEventListener("click", () => {
    Array.from(document.getElementsByClassName("info")).forEach((i) => i.style.display = "none");
    document.getElementById("floodInfo").style.display = "block";
    window.location.href = "#anchor";
});

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getResults);
    }
    else {
        console.log("negative");
    }
}

async function getResults(position) {
    document.getElementById("container").style.display = "none";
    var results = await get("/data/?latitude=" + position.coords.latitude + "&longitude=" +  position.coords.longitude);
    console.log(results);
    document.getElementById("otherContainer").style.display = "block";

    //HERE WILL GO ALL THE SPECIFIC DATA IN THEIR CORRECT PLACES
    if (results.hurricane == {}) {
        document.getElementById("hurricane").style.display = "none";
    }
    else {
        document.getElementById("hurricane").style.display = "flex";
        document.getElementById("hurrHistorical").innerHTML = results.hurricane.current;
        document.getElementById("hurrFuture").innerHTML = results.hurricane.future;
    }
    if (results.flood == {}) {
        document.getElementById("flood").style.display = "none";
    }
    else {
        document.getElementById("flood").style.display = "flex";
        document.getElementById("floodRisk2020").innerHTML = results.flood.risk2020 + "%";
        document.getElementById("floodRisk2050").innerHTML = results.flood.risk2050 + "%";
        document.getElementById("floodRiskTotal2020").innerHTML = results.flood.totalRisk2020;
        document.getElementById("floodRiskTotal2050").innerHTML = results.flood.totalRisk2050;
    }
    if (results.fire == {}) {
        document.getElementById("fire").style.display = "none";
    }
    else {
        document.getElementById("fire").style.display = "flex";
        document.getElementById("totalFire").innerHTML = results.fire;
    }
    document.getElementById("temperature").style.display = "flex";
    document.getElementById("tempHistorical").innerHTML = results.temperature.historical;
    document.getElementById("tempFuture").innerHTML = results.temperature.future;
}

function get(url) {
    return new Promise(async (resolve, reject) => {
        fetch(await fullUrl(url))
            .then((res) => res.json())
            .then((json) => {
                resolve(json);
            })
            .catch((err) => reject(err));
    });
}

function fullUrl(url) {
    return new Promise((resolve, reject) => {
        //resolve("http://127.0.0.1:5000" + url);
        resolve("https://climateproject.herokuapp.com" + url);
    });
}