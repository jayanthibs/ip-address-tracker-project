//importing secret api key from secret.js file
import { key } from "./secret.js";
//selecting elements and assigning it to variables
const searchForm = document.getElementById("search-form");
const ipAddressInput = document.getElementById("ipAddressInput");
const searchButton = document.getElementById("search-button");
//selecting span element to show error messages
const inputError = document.getElementById("inputError");

const apiData = document.getElementById("api-data");
const ipAddressSpan = document.getElementById("ip-address");
const locationSpan = document.getElementById("location");
const timezoneSpan = document.getElementById("timezone");
const ispSpan = document.getElementById("isp");
const mapSection = document.getElementById("map");

//adding validateIPAddress function to validate the input filed
function validateIPAddress() {
  const regex =
    /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/;
  if (ipAddressInput.validity.valueMissing) {
    ipAddressInput.setCustomValidity("IP Address is required");
  } else if (!regex.test(ipAddressInput.value)) {
    ipAddressInput.setCustomValidity("Enter valid IP Address.");
  } else {
    ipAddressInput.setCustomValidity("");
  }
  inputError.textContent = ipAddressInput.validationMessage;
  return ipAddressInput.checkValidity();
}

//adding event listener to validate the input field
ipAddressInput.addEventListener("input", validateIPAddress);

//adding event listener on the form to validate and search for IP Address
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const isIPAddressValid = validateIPAddress();

  if (!isIPAddressValid) {
    return;
  }
  //calling the function to fetch API Data
  fetchAPIData(ipAddressInput.value);
});

//function to fetch API Data
async function fetchAPIData(ipAddress) {
  try {
    const response = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=${key}&ipAddress=${ipAddress}`,
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    //console.log(data);
    //console.log(
    // `ip: ${data.ip}\nLocation: ${data.location.city}, ${data.location.region}\n${data.location.postalCode}\nTimeZone: UTC${data.location.timezone}\nisp: ${data.isp}`);

    renderAPIData(data);

  } catch (error) {
    if (error instanceof NetworkError) {
      console.log("Network Error", error.message);
    } else if (error instanceof DataError) {
      console.log("Data Error", error);
    } else {
      console.error("Unknown Error:", error);
    }
  }
}

function renderAPIData(data) {

  ipAddressSpan.textContent = data.ip;
  locationSpan.textContent = `${data.location.city}, ${data.location.region}\n${data.location.postalCode}`;
  timezoneSpan.textContent = `UTC ${data.location.timezone}`;
  ispSpan.textContent = data.isp;

}

//Here we create a map in the 'map' div, add tiles of our choice, and then add a marker with some text in a popup:
let map = L.map('map').setView([0, 0], 2);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//L.marker([51.5, -0.09]).addTo(map);
    // .bindPopup('A pretty CSS popup.<br> Easily customizable.')
    // .openPopup();

const customIcon = L.icon({
  iconUrl: './images/icon-location.svg',      // path to your image
  iconSize: [30, 25],         // size of the icon
  iconAnchor: [20, 40],       // point of the icon which corresponds to marker location
  popupAnchor: [0, -40]       // point from which the popup should open
});

L.marker([51.5, -0.09], { icon: customIcon }).addTo(map);



