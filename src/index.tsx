import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import MainView from './views/main-view/main-view';

// Import statement to indicate that you need to bundle `./index.scss`

import './index.scss';
import { store } from './redux/store';
import { BrowserRouter } from 'react-router-dom';

// Main component (will eventually use all the others)
const MyFlixApplication = () => (
  <Provider store={store}>
    <BrowserRouter>
      <MainView />
    </BrowserRouter>
  </Provider>
);

// Finds the root of your app
const container = document.querySelector('#root');
if (container) {
  const root = createRoot(container);

  // Tells React to render your app in the root DOM element
  root.render(<MyFlixApplication />);
}
