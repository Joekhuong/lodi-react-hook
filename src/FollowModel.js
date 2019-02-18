import config from "./config";

const follow_collection_url = config.rest_endpoint_url + "follow/"

export const checkFollow = (user_id,idol_id) => {
  return new Promise(function(resolve, reject) {
    console.log('Check follow');
    fetch(follow_collection_url+`check_follow/${user_id}/${idol_id}`, {
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

export const followIdol = (user_id,idol_id) => {
  return new Promise(function(resolve, reject) {

    fetch(follow_collection_url+"follows_idol", {
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify({user_id,idol_id}),
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

export const unFollowIdol = (user_id,idol_id) => {
  return new Promise(function(resolve, reject) {

    fetch(follow_collection_url+"unfollows_idol", {
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify({user_id,idol_id}),
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
