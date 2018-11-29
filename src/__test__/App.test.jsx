import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../app/App';
import { configureStore } from 'store/configureStore';

it('renders without crashing', () => {
    const store = configureStore();
    const div = document.createElement('div');
    ReactDOM.render(<App store={store}/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
