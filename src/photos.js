const axios = require('axios');
const baseUrl = 'https://jsonplaceholder.typicode.com';
const photosEndpoint = '/photos';
const { store, initPhotos, addOnePhoto, setTotal } = require('./redux.js');

const getPhotos = () => {
  return new Promise((resolve, reject) => {
    axios.get(baseUrl + photosEndpoint)
    .then(photos => {
      store.dispatch(initPhotos(photos.data, 10));
      let content = '<a href="/add">Add photo</a>';
      photos.data.forEach(photo => content += createPhoto(photo));
      resolve(content);
    })
    .catch(err => reject(err));
  })
}

const addPhoto = () => {
    return new Promise((resolve, reject) => {
    store.dispatch(setTotal());
    const total = store.getState().total;
    const url = `${baseUrl}${photosEndpoint}/${total + 1}`;
    axios.get(url)
    .then(photo => {
      store.dispatch(addOnePhoto(photo.data));
      const content = createPhoto(photo.data);
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

module.exports = { getPhotos, addPhoto }