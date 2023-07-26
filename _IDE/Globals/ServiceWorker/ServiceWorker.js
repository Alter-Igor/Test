
console.log("Loading SW 952");

let url =
    '<link rel="manifest" href="https://demo-aus.sharedo.tech/_ideFiles/Globals/ServiceWorker/swm.json"></link>';

//$("head").append(url);

let calculatedURL = "https://demo-aus.sharedo.tech/_ideFiles/Globals/ServiceWorker/sw.js";
let calculatedScope = "https://demo-aus.sharedo.tech";

function loadServiceWorker() {
  if ("serviceWorker" in navigator) {
   
    navigator.serviceWorker
      .register(calculatedURL, { type: "classic", scope: calculatedScope })
      .then(
        function (registration) {
          console.log("Service worker registration succeeded 952:", registration);
        },
        function (error) {
          console.log("Service worker registration failed:", error);
        }
      );
  }
}
loadServiceWorker();

