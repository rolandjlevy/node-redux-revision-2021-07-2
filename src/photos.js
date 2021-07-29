const axios = require('axios');
const photosUrl = 'https://jsonplaceholder.typicode.com/photos';

const getPhotos = () => {
  return new Promise((resolve, reject) => {
    axios.get(photosUrl)
    .then(photos => {
      let content = '';
      photos.data.forEach(photo => content += createPhoto(photo));
      resolve(content);
    })
    .catch(err => reject(err));
  })
}

const createPhoto = (photo) => {
  const { id, title, thumbnailUrl } = photo;
  return `
    <h3>${id}: ${title}</h3>
    <img src="${thumbnailUrl}" />
    <hr />
  `;
}

module.exports = { getPhotos }