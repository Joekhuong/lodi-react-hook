import config from "./config";

const follow_collection_url = config.rest_endpoint_url + "follow/"

export const checkFollow = (dispatch,idol,user) => {
  return new Promise(function(resolve, reject) {

    fetch(follow_collection_url, {
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
