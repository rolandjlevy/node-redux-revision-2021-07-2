const { createStore, applyMiddleware } = require('redux');
const logger = require('redux-logger').default;

const INIT_PHOTOS = 'INIT_PHOTOS';
const ADD_PHOTO = 'ADD_PHOTO';
const TOTAL_PHOTOS = 'TOTAL_PHOTOS';

const initPhotos = (photos, limit) => {
  return { 
    type: INIT_PHOTOS,
    payload: photos.filter(photo => Number(photo.id) < 10)
  }
};

const addOnePhoto = (photo) => {
  return {
    type: ADD_PHOTO,
    payload: photo
  }
};

const setTotal = () => {
  return { 
    type: TOTAL_PHOTOS
  }
};

const initialState = {
  photos: [],
  total: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_PHOTOS:
      return {
        ...state,
        photos: action.payload,
        total: state.photos.length
      }
    case ADD_PHOTO:
      const updatedPhotos = [...state.photos];
      updatedPhotos.push(action.payload);
      return {
        ...state,
        photos: updatedPhotos,
        total: updatedPhotos.length
      }
    case TOTAL_PHOTOS:
      return {
        ...state,
        total: state.photos.length
      }
    default: return state;
  }
}

// const store = createStore(reducer, applyMiddleware(logger));
const store = createStore(reducer);

module.exports = {
  store,
  initPhotos,
  addOnePhoto,
  setTotal
}