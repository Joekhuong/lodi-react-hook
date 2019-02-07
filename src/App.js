import React from 'react';
import {Provider} from './store';
import Routing from './Routing';

const App = () => {
  return (
      <div className="App">
        <Provider>
            <Routing/>
        </Provider>
      </div>
  );
}

export default App;
