import axios from 'axios';
const baseUrl = 'http://localhost:5000';

export function listAll() {
  return function(dispatch) {
    dispatch({ type: 'METEORITES_GET_LIST' });

    return axios.get(`${baseUrl}/list`)
    .then(resp => {
      dispatch({
        type: 'METEORITES_GET_LIST_SUCCESS',
        payload: resp.data,
      });
    })
    .catch(err => {
      dispatch({
        type: 'METEORITES_GET_LIST_FAILURE',
        payload: err.data,
      });
    });
  }
}
