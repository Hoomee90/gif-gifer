import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// include: Search Tenor. Use this attribution as the placeholder text in your search box.

// Business Logic

function httpGet(url, callback) {
  let request = new XMLHttpRequest();

  request.addEventListener("loadend", () => {
    
    if (request.status === 200) {
      callback(JSON.parse(request.responseText));
    }
  });

  request.open("GET", url, true);
  request.send();
}