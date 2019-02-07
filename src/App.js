import React from 'react';
import {Store, Provider} from './store';
import {FETCH_DATA,RESET_DATA} from './actions';
import Data from './Data';
import AuthExample from './Navigator';

const Controls = () => {
  const {dispatch} = React.useContext(Store);

  const fetchData = () => {

    console.log("FETCH_DATA");

    dispatch({
      type: FETCH_DATA,
      payload: "Hello world!"
    })

  };

  const reset = () => {
    console.log("RESET");
    dispatch({
      type: RESET_DATA,
      payload: null
    })
  };

  return (
    <div>
      <button onClick={fetchData}>
        Fetch data
      </button>
      <button onClick={reset}>
        Reset
      </button>
    </div>
  );
};

const App = () => {
  return (
      <div className="App">
        <Provider>

            <AuthExample/>

        </Provider>
      </div>
  );
}

export default App;
