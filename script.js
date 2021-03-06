const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photos = [];
let initialLoad = true;

// Unsplash API
let count = 5;
const apiKey = "3lgeIYFtrf9GeSUdsamL9e6aD_CanlDLPYSpa0ITkVE";
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function initialLoadFunc() {
  if (!initialLoad) {
    count = 30;
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
  }
}

function imageLoaded() {
  imagesLoaded++;

  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
  totalImages = photos.length;
  // Run function for each object in photos
  photos.forEach((photo) => {
    //   Create <a> link to Unsplash
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // Create <img> for photo
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event Listener, check when each is finished loading
    img.addEventListener("load", imageLoaded);
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

// Check to see if scrolling near bottom of page, Load More Photos

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    imagesLoaded = 0;
    // loader.hidden = false;
    initialLoad = false;
    initialLoadFunc();
    getPhotos();
  }
});

// On Load
getPhotos();
