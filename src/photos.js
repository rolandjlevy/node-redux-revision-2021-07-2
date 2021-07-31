const axios = require('axios');
const baseUrl = 'https://jsonplaceholder.typicode.com';
const photosEndpoint = '/photos';
const { store, initPhotos, addOnePhoto, setTotal } = require('./redux.js');

const getPhotos = () => {
  return new Promise((resolve, reject) => {
    axios.get(baseUrl + photosEndpoint)
    .then(result => {
      store.dispatch(setTotal());
      const currentTotal = store.getState().total;
      store.dispatch(initPhotos(result.data, currentTotal));
      const photos = store.getState().photos;
      let content = '<a href="/add">Add photo</a>';
      photos.forEach(photo => content += createPhoto(photo));
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
    let content = '<a href="/">See all photos</a>';
    axios.get(url)
    .then(photo => {
      store.dispatch(addOnePhoto(photo.data));
      store.dispatch(setTotal());
      const photos = store.getState().photos;
      const lastPhoto = photos[photos.length - 1];
      content += createPhoto(lastPhoto);
      console.log(store.getState())
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