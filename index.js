const { app, port } = require('./src/app.js');
const { getPhotos } = require('./src/photos.js');

app.get('/', (req, res) => {
  getPhotos()
  .then(photos => res.send(photos))
  .catch(err => res.send(err));
});

app.listen(port, () => {
  console.log('Listening on port', port);
});