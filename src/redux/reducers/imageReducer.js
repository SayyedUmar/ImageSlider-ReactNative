import { SHOW_IMAGE_DESCRIPTION, API_ERROR, API_SUCCESS } from '../actions/types';

const initialState = {
  imageList: []
}


const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case API_ERROR:
      return {
        ...state,
        // foodList: state.imageList.concat({
        //   key: Math.random(),
        //   name: action.data
        // })
      };
    case API_SUCCESS:
      return {
        ...state,
        imageList: action.data
      };
    default:
      return state;
  }
}

export default imageReducer;