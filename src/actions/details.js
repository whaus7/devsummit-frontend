import axios from 'axios';
const baseUrl = 'http://localhost:5000';

export function getById(id) {
  return function(dispatch) {
    dispatch({
      type: 'MTR_DETAILS_GET_ID',
      payload: { id: id },
   });

    return axios.get(`${baseUrl}/details/${id}`)
    .then(resp => {
      dispatch({
        type: 'MTR_DETAILS_GET_ID_SUCCESS',
        payload: resp.data,
      });
    })
    .catch(err => {
      dispatch({
        type: 'MTR_DETAILS_GET_ID_FAILURE',
        payload: err.data,
      });
    });
  }
}
