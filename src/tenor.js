export default class Tenor {
  
  static getTenor(searchTerm) {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      const searchUrl = `https://tenor.googleapis.com/v2/search?q=${searchTerm}&key=${process.env.API_KEY}&client_key=${"gif-gifer-project"}&limit=${8}`;
      request.addEventListener("loadend", function() {
        const response = JSON.parse(this.responseText);
        if (this.status === 200) {
          resolve(response);
        } else {
          reject(response["error"]["message"]);
        }
      });
      request.open("GET", searchUrl, true);
      request.send();
    });
  }
}