let map = L.map('map'); 
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keyup", e => {
    if(e.key === 'Enter') { 
        let inputvalue = searchInput.value.trim();
        getLocationDetails(inputvalue)
    }    
})

const getLocationDetails = async (address = "") => {
    try {
        const res = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_1LiedoHxzzP5uOA71DNGnlkCfS8BI&domain=${address}`);
        const data = await res.json() 

        const lat = data.location.lat;
        const lng = data.location.lng;
        displayDetails(data);
        displayMap(lat, lng);
    } catch (error) {
        console.log(error)
    }
}
getLocationDetails()

const displayDetails = (data) => {
    document.querySelector(".ip").innerHTML = `${data.ip}`;
    document.querySelector(".location").innerHTML = `${data.location.city}, ${data.location.country}`;
    document.querySelector(".timezone").innerHTML = `UTC${data.location.timezone}`;
    document.querySelector(".isp").innerHTML = `${data.isp}`;
}

const displayMap = (lat, lng) => {
    map.setView([lat, lng], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibHVjYXNzbGwiLCJhIjoiY2wwZXducml4MG44MzNjcDlrNHo5MDk0MSJ9.ipqJ-CaiHJElAnKPPzx6YQ', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoibHVjYXNzbGwiLCJhIjoiY2wwZXducml4MG44MzNjcDlrNHo5MDk0MSJ9.ipqJ-CaiHJElAnKPPzx6YQ'
    }).addTo(map);

    let coords = [lat, lng];
    map.flyTo(coords, 17)
    let customIcon = L.icon ({ 
        iconUrl: './images/icon-location.svg',
        iconSize: [30,40],
    })
    L.marker([lat, lng], {icon: customIcon}).addTo(map);
}
