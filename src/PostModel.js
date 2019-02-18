import config from "./config";

const post_collection_url = config.rest_endpoint_url + "post/";

export const createPost = (post) => {
  return new Promise(function(resolve, reject) {

    fetch(post_collection_url, {
        mode: 'cors',
        method: "POST",
        body: JSON.stringify(post),
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

export const getPostByPageId = (page_id) => {
  return new Promise(function(resolve, reject) {

    fetch(post_collection_url+"page_id/"+page_id,{mode: 'cors'})
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

export const getPostByUserId = (user_id) => {
  return new Promise(function(resolve, reject) {

    fetch(post_collection_url+"/user_id/"+user_id,{mode: 'cors'})
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

export const getPostByParentId = (parent_id) => {
  return new Promise(function(resolve, reject) {

    fetch(post_collection_url+"/parent_id/"+parent_id,{mode: 'cors'})
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
