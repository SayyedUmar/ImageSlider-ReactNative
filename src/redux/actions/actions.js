import { SHOW_IMAGE_DESCRIPTION, DATA_REQUESTED } from './types';


export const showImageDesc = (image) => (
  {
    type: SHOW_IMAGE_DESCRIPTION,
    data: image
  }
);


export const fetchImages = () => (
  {
    type: DATA_REQUESTED,
    data: ''
  }
);

