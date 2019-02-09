import React from 'react';
import {Provider} from './store';
import Routing from './Routing';
import Header from './Header';

const App = () => {
  return (
      <div className="App">
        <Provider>
            <Header />
            <Routing/>
        </Provider>
      </div>
  );
}

export default App;
