import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Tenor from './tenor.js'

// UI Logic

function displayFull(e) {
  const fullImage = document.querySelector("#full-gif");
  if (e.target.fullGif !== fullImage.src) {
    fullImage.src = e.target.fullGif;
    fullImage.classList.remove("d-none");
  }
}

function displayTenorSearch(response) {
  const topGifs = response["results"];

  // load the first GIFs in preview size (nanogif) and share size (gif)
  
  const thumbnailGroup = document.querySelectorAll("img.preview");

  for (let i = 0; i < 8; i++) {
    thumbnailGroup[i].src = topGifs[i]["media_formats"]["nanogif"]["url"];
    thumbnailGroup[i].fullGif = topGifs[i]["media_formats"]["gif"]["url"];
  }

  document.querySelector("div.images").classList.remove("d-none");
}

function handleSubmit(e) {
  e.preventDefault();

  const input = document.querySelector("#search-input");
  document.querySelector("#full-gif").classList.add("d-none");
  let promise = Tenor.getTenor(input.value);
  promise.then(response => displayTenorSearch(response), error => console.error(error));

  e.target.reset();
}

document.querySelector("form#search").addEventListener("submit", handleSubmit);
document.querySelectorAll(".preview").forEach(el => el.addEventListener("click", displayFull));