import config from "./config";
import uuid from "uuid";
import { SET_IDOLS } from "./actions";

const idols_collection_url = config.rest_endpoint_url + "idol/"

const setIdols = (dispatch, idols) => {
  dispatch({
    type: SET_IDOLS,
    payload: idols
  });
}

export const searchIdols = (term) => {
  return new Promise(function(resolve, reject) {
    fetch(idols_collection_url+"search/"+term, {
        mode: 'cors'
      })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          resolve(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          reject(error);
        }
      )
      .catch((err) => reject(err))
  })
}

export const getIdols = (dispatch) => {
  return new Promise(function(resolve, reject) {
    fetch(idols_collection_url, {
        mode: 'cors'
      })
      .then(res => res.json())
      .then(
        (result) => {
          setIdols(dispatch,result);
          resolve(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          reject(error);
        }
      )
      .catch((err) => reject(err))
  })
}

export const getIdolByPageId = (page_id) => {
  return new Promise(function(resolve, reject) {
    fetch(idols_collection_url+"page_id/"+page_id, {
        mode: 'cors'
      })
      .then(res => res.json())
      .then(
        (result) => {
          resolve(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          reject(error);
        }
      )
      .catch((err) => reject(err))
  })
}

export const checkFollow = (dispatch,idol,user) => {
  return new Promise(function(resolve, reject) {

    idol.page_id = uuid();

    fetch(idols_collection_url, {
        mode: 'cors',
        method: "POST",
        body: JSON.stringify(idol),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(
        (result) => {
          getIdols(dispatch);
          resolve(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          reject(error);
        }
      )
      .catch((err) => reject(err))
  })
}

export const createIdol = (dispatch,idol) => {
  return new Promise(function(resolve, reject) {

    idol.page_id = uuid();

    fetch(idols_collection_url, {
        mode: 'cors',
        method: "POST",
        body: JSON.stringify(idol),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(
        (result) => {
          getIdols(dispatch);
          resolve(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          reject(error);
        }
      )
      .catch((err) => reject(err))
  })
}

export const updateIdol = (dispatch,idol) => {
  return new Promise(function(resolve, reject) {

    fetch(idols_collection_url+idol.id, {
        mode: 'cors',
        method: "PUT",
        body: JSON.stringify(idol),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(
        (result) => {
          getIdols(dispatch);
          resolve(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          reject(error);
        }
      )
      .catch((err) => reject(err))
  })
}

export const deleteIdol = (dispatch,idol_id) => {
  return new Promise(function(resolve, reject) {

    fetch(idols_collection_url+idol_id, {
        mode: 'cors',
        method: "DELETE"
      })
      .then(res => {
        getIdols(dispatch);
        resolve(res);
      })
      .catch((err) => reject(err))
  })
}
