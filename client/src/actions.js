import {
  GET_ALL_OPINION_SUCCESS,
  ADD_OPINIONS_SUCCESS,
  DELETE_OPINION_SUCCESS,
  UPDATE_OPINION_SUCCESS,
} from './constants.js';

const baseUrl = '/retro/improvements/';

export const getAllOpinionSuccess = (data) => ({
  type: GET_ALL_OPINION_SUCCESS,
  payload: data,
})

export const getAllOpinion = () => {
  return (dispatch) => {
    return fetch(baseUrl, {
      method: 'GET',
      mode: 'cors',
    })
      .then(data => {
        return data.json();
      })
      .then(data => {
        const opinionsResponse = data.map(oneOpinion => {
          const { improvement, isImprovement, text, _id, createdDate} = oneOpinion;
          return {
            id: _id,
            createdDate,
            recommendation: improvement,
            isImprovement,
            text
          }
        });
        dispatch(getAllOpinionSuccess(opinionsResponse));
      })
      .catch(err => console.log(err));
  };
};

export const addOpinionsSuccess = (opinion) => ({
  type: ADD_OPINIONS_SUCCESS,
  payload: opinion,
})

export const addOpinions = (opinions) => {
  const opinionsToSend = opinions.map(oneOpinion => {
    const { recommendation, isImprovement, text} = oneOpinion;
    return {
      improvement: recommendation,
      isImprovement,
      text
    }
  });
  return (dispatch) => {
    return fetch(baseUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(opinionsToSend),
      })
      .then(data => {
        return data.json();
      })
      .then(data => {
        dispatch(addOpinionsSuccess(data));
      })
      .catch(err => console.log(err));
  };
}

export const updateOpinionSuccess = (opinion) => ({
  type: UPDATE_OPINION_SUCCESS,
  payload: opinion,
})

export const updateOpinion = (opinion) => {
  return (dispatch) => {
    return fetch(`/${opinion.id}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(opinion),
      })
      .then(data => {
        return data.json();
      })
      .then(data => {
        dispatch(updateOpinionSuccess(data));
      })
      .catch(err => console.log(err));
  };
}

export const deleteOpinionSuccess = (id) => ({
  type: DELETE_OPINION_SUCCESS,
  payload: id,
})

export const deleteOpinion = (id) => {
  return (dispatch) => {
    return fetch(`/${id}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(data => {
        return data.json();
      })
      .then(id => {
        dispatch(deleteOpinionSuccess(id));
      })
      .catch(err => console.log(err));
  };
}