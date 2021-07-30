const { app, port } = require('./src/app.js');
const { getPhotos, addPhoto } = require('./src/photos.js');

app.get('/', (req, res) => {
  getPhotos()
  .then(photos => res.send(photos))
  .catch(err => res.send(err));
});

app.get('/add', (req, res) => {
  addPhoto()
  .then(photo => res.send(photo))
  .catch(err => res.send(err));
});

app.listen(port, () => {
  console.log('Listening on port', port);
});