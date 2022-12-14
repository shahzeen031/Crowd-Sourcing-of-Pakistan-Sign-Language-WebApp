import axios from 'axios';
import { setAlert } from './alert';

import { GIVE_REVIEW, REVIEW_ERROR, SEARCH, SEARCH_ERROR, CANCEL_SEARCH } from './types';

//Give Review
export const giveReview = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post('/api/dictionary', formData, config);
    dispatch({
      type: GIVE_REVIEW,
      payload: res.data,
    });

    dispatch(setAlert('Review Given', 'success'));
  } catch (err) {
    dispatch({
      type: REVIEW_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//Save review
export const saveReview = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    console.log('Hello give review')
    const res = await axios.post('/api/review', formData, config);
    console.log(res)
    
    dispatch(setAlert('Review saved successfully', 'success'));
  } catch (err) {
    dispatch({
      type: REVIEW_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//search
export const search = (word) => async (dispatch) => {
  try {
    console.log(word);
    console.log('Hello');
    const res = await axios.get(`api/dictionary/search/${word}`);

    dispatch({
      type: SEARCH,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SEARCH_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//search
export const searchByCategory = (category) => async (dispatch) => {
  try {
    const res = await axios.get(`api/dictionary/search/category/${category}`);

    dispatch({
      type: SEARCH,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SEARCH_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//Go back
export const cancelSearch = () => async (dispatch) => {
  try {
    dispatch({
      type: CANCEL_SEARCH,
      payload: [],
    });
  } catch (err) {
  }
};
