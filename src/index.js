import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Business Logic

function httpGet(url, callback) {
  let request = new XMLHttpRequest();

  request.addEventListener("loadend", () => {
    
    if (request.status === 200) {
      callback(request.responseText);
    } else {
      throw new Error(`An exception has occurred: ${request.status} ${JSON.parse(request.responseText)["error"]["message"]}`);
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

  document.querySelector("div.images").classList.remove("d-none");

  return;
}

function handleSubmit(e) {
  e.preventDefault();

  const input = document.querySelector("#search-input");
  const fullImage = document.querySelector("#full-gif");
  
  fullImage.classList.add("d-none");
  try {
    getData(input.value, displayTenorSearch);
  } catch (e) {
    console.error(e);
  }

  e.target.reset();
}

function displayFull(e) {
  const fullImage = document.querySelector("#full-gif");
  if (e.target.fullGif !== fullImage.src) {
    fullImage.src = e.target.fullGif;
    fullImage.classList.remove("d-none");
  }
}

document.querySelector("form#search").addEventListener("submit", handleSubmit);
document.querySelectorAll(".preview").forEach(el => el.addEventListener("click", displayFull));