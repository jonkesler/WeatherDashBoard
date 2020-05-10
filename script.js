var today = new Date();
var date = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear();
var qCity = localStorage.getItem("queryCity");
var searchList = document.querySelector("#search-list");
var searchCity = document.querySelector("#search-city");
var searchCount = 7;

var sCity = [];

init();

function renderLastSearches(){
   // Clear search-list element and update todoCountSpan
  searchList.innerHTML = "";
  
   // Render a new ul for each searched city
  for (var i = 0; i < searchCount; i++) {
    var Cities = sCity[i];
    console.log(Cities);
    var ul = document.createElement("ul");
    ul.textContent = Cities;
    ul.setAttribute("data-index", i);
    ul.setAttribute("class", "list-group-item");


    // li.appendChild(button);
    searchList.appendChild(ul);
    // console.log("qCity" + qCity);
  }
}

function init() {
  // Get stored cities from localStorage
  // Parsing the JSON string to an object
  var storedCities = JSON.parse(localStorage.getItem("sCity"));

  // If cities were retrieved from localStorage, update the todos array to it
  if (storedCities !== null) {
    sCity = storedCities;
  }

  // Render todos to the DOM
  renderLastSearches();
}


function buildQueryURL() {
  //my api key
  var APIKey = "fcdc0c08cd4ef4f4d5b9e090aff0fcd3";
    // Grab text the user typed into the search input, add to the queryParams object
    queryCity = $("#search-city")
    .val()
    .trim();
  // queryURL is the url we'll use to query the API
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?" + 
  "q=" + queryCity + "&appid=" + APIKey;

  $.ajax({
    url: queryURL,
    method: "GET"
  })
  
    .then(function(response) {

        console.log(queryURL);
        console.log(response);
        console.log(queryCity);
        console.log("qCity" + qCity);
        

        // Transfer content to HTML
        $(".city").html("<h1>" + response.name + " ("+ date +")</h1>");
        // var iconcode = a.weather[0].icon;
        // var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
        // $('#wicon').attr('src', iconurl);
        $(".wind").html("<h3>Wind Speed: " + response.wind.speed + "MPH</h3");
        $(".humidity").html("<h3>Humidity: " + response.main.humidity + "%</h3>");
        
        // Convert the temp to fahrenheit
        var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        // add temp content to html
        $(".tempF").html("<h3>Temp: " + tempF.toFixed(1) + "°F</h3>");
      });
}

// Store search city's
function storeCity(){
  localStorage.setItem("sCity", JSON.stringify(sCity));
}

// CLICK HANDLERS
// ==========================================================

// .on("click") function associated with the Search Button
$("#run-search").on("click", function(event) {
  event.preventDefault();

  // Build the query URL for the ajax request to the NYT API
  var queryURL = buildQueryURL();
  // localStorage.setItem("queryCity", JSON.stringify(queryCity));
  // localStorage.setItem("sCity", JSON.stringify(sCity));
  var iCity = searchCity.value;
  if (iCity === ""){
    return;
  }
  sCity.unshift(iCity);
  searchCity.value = "";

  storeCity();
  renderLastSearches();
})

document.getElementById("search-list").addEventListener("click",function(e) {
  // e.target is our targetted element.
  // try doing console.log(e.target.nodeName), it will result LI
  if(e.target && e.target.nodeName == "ul") {
      console.log(e.target.id + " was clicked");
  }
});
