import Axios from 'axios';

export const fetchImages = () => {
  return Axios.get("https://picsum.photos/list")
  .then(res => res.data)
  .catch(e => console.log('error',e))
}