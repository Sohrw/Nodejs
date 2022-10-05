const API_KEY = "914e79a1a3273c447ea4b2dce1734554";

function onGeoOK(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&lang=kr&units=metric`
    fetch(url).then(response => response.json()).then(data => {
        const weather = document.querySelector("#weather span:first-child");
        const name = document.querySelector("#weather span:last-child");
        name.innerText = `당신의 위치 : ${data.name} `;
        weather.innerText = `현재 날씨 : ${ data.weather[0].main} `;
    });
}

function onGeoError() {
    alert("크롬으로 접속하시면 위치와 날씨도 떠요!");
}

navigator.geolocation.getCurrentPosition(onGeoOK,onGeoError);