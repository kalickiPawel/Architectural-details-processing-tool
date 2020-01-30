import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';

import { createStore, /*applyMiddleware*/ } from 'redux';
//import { createLogger } from 'redux-logger';

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_X':
            state = {
                ...state,
                mouseCoords: {
                    ...state.mouseCoords,
                    x: [...state.mouseCoords.x, action.payload]
                }
            }
            break;
        case 'ADD_Y':
            state = {
                ...state,
                mouseCoords: {
                    ...state.mouseCoords,
                    y: [...state.mouseCoords.y, action.payload]
                }
            }
            break;
        case 'ADD_Z':
            let z_values = [];
            for (var element in action.payload) {
                z_values.push(parseFloat(action.payload[element]));
            }
            state = {
                ...state,
                mouseCoords: {
                    ...state.mouseCoords,
                    z: z_values
                }
            }
            break;
        case 'ADD_METHOD':
            state = {
                ...state,
                method: action.payload
            }
            break;
        case 'ADD_INTERP':
            let x_table = [];
            let y_table = [];
            let z_table = [];
            action.payload.map((value) => {
                x_table.push(value.x);
                y_table.push(value.y);
                z_table.push(value.z);
                return 0;
            });
            state = {
                ...state,
                interpCoords: {
                    ...state.interpCoords,
                    x: x_table,
                    y: y_table,
                    z: z_table
                }
            };
            break;
        case 'REMOVE_X':
            state = {
                ...state,
                mouseCoords: {
                    ...state.mouseCoords,
                    x: [...state.mouseCoords.x.slice(0, action.payload)]
                }
            }
            break;
        case 'REMOVE_Y':
            state = {
                ...state,
                mouseCoords: {
                    ...state.mouseCoords,
                    y: [...state.mouseCoords.y.slice(0, action.payload)]
                }
            }
            break;
        case 'REMOVE_Z':
            state = {
                ...state,
                mouseCoords: {
                    ...state.mouseCoords,
                    z: [...state.mouseCoords.z.slice(0, action.payload)]
                }
            }
            break;
        default:
            break;
    }
    return state;
};

const initialState = {
    mouseCoords: { x: [], y: [], z: [] },
    interpCoords: { x: [], y: [], z: [] },
    method: "",
};

// let logger = createLogger()

let store = createStore(
    reducer,
    // applyMiddleware(logger)
)

store.subscribe(() => {
    // console.log(store.getState())
});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
