import config from "./config";
import {LOGIN_ACTION} from './actions';

const users_collection_url = config.rest_endpoint_url + "user";

export const loginUser = (dispatch, user) => {
  dispatch({
    type: LOGIN_ACTION,
    payload: {user, loading_state: false}
  });
}

export const logoutUser = (dispatch, payload) => {
  dispatch({
    type: "LOGOUT",
    payload: payload
  });
}

export const getUserByFirebaseUid = (firebase_uid) => {
  return new Promise(function(resolve, reject) {
    fetch(users_collection_url+"/firebase_uid/"+firebase_uid,{mode: 'cors'})
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

export const createUser = (user) => {
  return new Promise(function(resolve, reject) {
    console.log(user);
    fetch(users_collection_url, {
        mode: 'cors',
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json'
        }
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
