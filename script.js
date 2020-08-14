// Unsplash API
const count = 10;
const apiKey = "3lgeIYFtrf9GeSUdsamL9e6aD_CanlDLPYSpa0ITkVE";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Get photos from Unsplash API

async function getPhotos() {
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    console.log(data);
  } catch (error) {}
}

// On Load
getPhotos();
