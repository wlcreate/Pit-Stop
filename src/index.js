import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'semantic-ui-css/semantic.min.css' // adds semantic ui

// ROUTING STUFF
import {BrowserRouter} from 'react-router-dom'

// REDUX STUFF
import {createStore} from 'redux'
import {Provider} from 'react-redux'

// Reducer (aka function definition)
  // Return value of this becomes the global state

let initialStateOfUserReducer = {
  username: "",
  full_name: "",
  token: "",
  trips: [],
  places: [],
  reflections: []
}

let userReducer = (state = initialStateOfUserReducer, action) => {
  switch(action.type){
    case "SET_USER_INFO":
      // console.log(action.payload)
      return {
        ...state,
        username: action.payload.user.username,
        full_name: action.payload.user.full_name,
        token: action.payload.token,
        trips: action.payload.user.trips
      }
    case "LOG_OUT_USER":
      console.log("IN userReducer LOG_OUT_USER")
      return initialStateOfUserReducer
    case "SET_PLACES":
      // console.log("THIS IS FROM TRIP CARD:", action.payload)
      return {
        ...state,
        places: action.payload
      } 
    case "SET_REFLECTIONS":
      // console.log("THIS IS FROM PLACE CARD:", action.payload)
      return {
        ...state,
        reflections: action.payload
      }
    case "ADD_TRIP":
      let copyOfTrips = [...state.trips, action.payload]
      return {
        ...state,
        trips: copyOfTrips
      }
    case "ADD_PLACE":
      let copyOfPlaces = [...state.places, action.payload]
      return {
        ...state,
        places: copyOfPlaces
      }
    default:
      return state
  }
}

let storeObj = createStore(
  userReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
  <Provider store={storeObj}>
    <BrowserRouter>
     <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);