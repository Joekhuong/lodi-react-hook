import config from "./config";
import { FETCH_REGION } from "./actions";

const regions_collection_url = config.rest_endpoint_url + "region";

export const setRegions = (dispatch, regions) => {
  dispatch({
    type: FETCH_REGION,
    payload: regions
  });
};

export const getRegions = dispatch => {
  return new Promise(function(resolve, reject) {
    fetch(regions_collection_url, {
      mode: "cors"
    })
      .then(res => res.json())
      .then(
        result => {
          let regions = {};
          result.forEach((data, key) => {
            regions = {
              ...regions,
              [data.id]: data.name
            };
          });
          setRegions(dispatch, regions);
          resolve(regions);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          reject(error);
        }
      )
      .catch(err => reject(err));
  });
};
