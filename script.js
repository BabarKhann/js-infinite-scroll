const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photos = [];

// Unsplash API
const count = 10;
const apiKey = "3lgeIYFtrf9GeSUdsamL9e6aD_CanlDLPYSpa0ITkVE";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
  // Run function for each object in photos
  photos.forEach((photo) => {
    //   Create <a> link to Unsplash
    const item = document.createElement("a");
    item.setAttribute("href", photo.links.html);
    item.setAttribute("target", "_blank");
    // Create <img> for photo
    const img = document.createElement("img");
    img.setAttribute("src", photo.urls.regular);
    img.setAttribute("alt", photo.alt_description);
    img.setAttribute("title", photo.alt_description);
    //  Put <img> inside <a></a>, then put both inside in imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const res = await fetch(apiUrl);
    photos = await res.json();
    displayPhotos();
  } catch (error) {}
}

// On Load
// getPhotos();
