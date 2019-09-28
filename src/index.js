import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();    // To prevent my page from reloading the imported links and scripts.
}
serviceWorker.unregister();
