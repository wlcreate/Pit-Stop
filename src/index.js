import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'semantic-ui-css/semantic.min.css' // adds semantic ui

// ROUTING STUFF
import {BrowserRouter} from 'react-router-dom'

// REDUX STUFF
import {createStore, combineReducers} from 'redux'
import {Provider} from 'react-redux'

// Reducer (aka function definition)
  // Return value of this becomes the global state

// ------ Categories Reducer ------
let initialStateOfCategoryReducer = {
  categories: []
}

let categoryReducer = (state = initialStateOfCategoryReducer, action) => {
  switch(action.type){
    case "SET_CATEGORIES":
      return {
        ...state,
        categories: action.payload
      }
    default:
      return state
  }
}

// ------ User Reducer ------
let initialStateOfUserReducer = {
  username: "",
  full_name: "",
  token: "",
  trips: [],
  chosen_trip: {},
  places: [],
  chosen_place: {},
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
      // console.log("IN userReducer LOG_OUT_USER")
      return initialStateOfUserReducer
    case "SET_PLACES":
      // console.log("THIS IS FROM TRIP CARD:", action.payload)
      return {
        ...state,
        chosen_trip: action.payload,
        places: action.payload.places
      } 
    case "SET_REFLECTIONS":
      // console.log("THIS IS FROM PLACE CARD:", action.payload)
      return {
        ...state,
        chosen_place: action.payload,
        reflections: action.payload.reflections
      }
    case "ADD_TRIP":
      let copyOfTrips = [...state.trips, action.payload]
      return {
        ...state,
        trips: copyOfTrips
      }
    case "ADD_PLACE":
      let copyOfPlaces = [...state.places, action.payload.place]
      return {
        ...state,
        trips: action.payload.user.trips,
        chosen_trip: action.payload.chosen_trip,
        places: copyOfPlaces
      }
    case "DELETE_TRIP":
      let copyOfAllTrips = [...state.trips].filter(tripObj => {
        return tripObj.id !== action.payload.id
      })
      return {
        ...state,
        trips: copyOfAllTrips
      }
    case "UPDATE_TRIP":
      let copyOfStateTrips = [...state.trips].map(tripObj => {
        if(tripObj.id === action.payload.id){
          return action.payload
        } else {
          return tripObj
        }
      })
      return {
        ...state,
        trips: copyOfStateTrips,
        chosen_trip: action.payload
      }
    case "DELETE_PLACE":
      let copyOfAllPlaces = [...state.places].filter(tripObj => {
        return tripObj.id !== action.payload.place.id
      })
      return {
        ...state,
        trips: action.payload.user.trips,
        places: copyOfAllPlaces
      }
    case "UPDATE_PLACE":
      let copyOfStatePlaces = [...state.places].map(placeObj => {
        if(placeObj.id === action.payload.place.id){
          return action.payload.place
        } else {
          return placeObj
        }
      })
      return {
        ...state,
        trips: action.payload.user.trips,
        places: copyOfStatePlaces,
        chosen_place: action.payload.place
      }
    case "ADD_REFLECTION":
      let copyOfReflections = [...state.reflections, action.payload.reflection]
      return {
        ...state,
        trips: action.payload.user.trips,
        chosen_place: action.payload.chosen_place,
        reflections: copyOfReflections
      }
    case "DELETE_REFLECTION":
      let copyOfAllReflections = [...state.reflections].filter(reflectionObj => {
        return reflectionObj.id !== action.payload.reflection.id
      })
      return {
        ...state,
        trips: action.payload.user.trips,
        reflections: copyOfAllReflections
      }
    case "UPDATE_REFLECTION":
      // debugger
      let copyOfStateReflections = [...state.reflections].map(reflectionObj => {
        if(reflectionObj.id === action.payload.reflection.id){
          return action.payload.reflection
        } else {
          return reflectionObj
        }
      })
      return {
        ...state,
        trips: action.payload.user.trips,
        reflections: copyOfStateReflections
      }
    default:
      return state
  }
}

// combineReducers takes in a POJO
  // the keys of the POJO become the highest level keys of global state
  // the values of the POJO are the reducers

// Any time that an action gets dispatched, all the reducers handle it

let thePojo = {
  categories: categoryReducer,
  user: userReducer
}

let rootReducer = combineReducers(thePojo)

let storeObj = createStore(
  rootReducer,
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