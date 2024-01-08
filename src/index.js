import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Business Logic

function httpGet(url, callback) {
  let request = new XMLHttpRequest();

  request.addEventListener("loadend", () => {
    
    if (request.status === 200) {
      callback(request.responseText);
    }
  });

  request.open("GET", url, true);
  request.send();

  return;
}

function getData(searchTerm, callback) {
  const apiKey = process.env.API_KEY;
  const clientKey = "gif-gifer-project";
  const limit = 8;

  const searchUrl = `https://tenor.googleapis.com/v2/search?q=${searchTerm}&key=${apiKey}&client_key=${clientKey}&limit=${limit}`;

  httpGet(searchUrl, callback);
}

// UI Logic

// callback for the top 8 GIFs of search
function displayTenorSearch(responseText) {
  const responseObject = JSON.parse(responseText);
  const topGifs = responseObject["results"];

  // load the first GIFs in preview size (nanogif) and share size (gif)
  
  const thumbnailGroup = document.querySelectorAll("img.preview");

  for (let i = 0; i < 8; i++) {
    thumbnailGroup[i].src = topGifs[i]["media_formats"]["nanogif"]["url"];
    thumbnailGroup[i].fullGif = topGifs[i]["media_formats"]["gif"]["url"];
  }

  return;
}

function handleSubmit(e) {
  e.preventDefault();

  const input = document.querySelector("#search-input");
  getData(input.value, displayTenorSearch);
  document.querySelector("div.images").classList.remove("d-none");

  e.target.reset();
}

function displayFull(e) {
  const image = document.querySelector("#full-gif");
  if (e.target.fullGif !== image.src) {
    image.src = e.target.fullGif;
  }
}

document.querySelector("form#search").addEventListener("submit", handleSubmit);
document.querySelectorAll(".preview").forEach(el => el.addEventListener("click", displayFull));