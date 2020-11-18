# Pit Stop
Pit Stop is a travel journal web application that changes the way users remember their trips. Instead of creating daily journal entries, users add places they visited on a trip and create reflections on those places. This was inspired by the idea of [memory space (Les Lieux de Mémoire)](https://en.wikipedia.org/wiki/Memory_space_(social_science)) in that our memories are often tied to the places we have been.

[Link to backend](https://github.com/wlcreate/Mod5Project_backend)

## Getting Started
1. Clone down the [Rails backend](https://github.com/wlcreate/Mod5Project_backend) --git clone
2. Clone down this repo into local machine --git clone
3. cd into the directory
4. Install all dependencies 
```
npm install
```
5. Start the Rails server
6. Open up a new terminal and run this app
```
npm start
```

## Features

### Password Authentication
 * Validate current users and keep them logged in using JWT
 * Authenticate users' passwords with BCrypt
 
### Account
 * log into the application 
 * sign up to create an account
 * remain logged in if they never logged out
 * security: need to input the correct password in order to have access to the update account form
 
### Trips
 * create a new trip
 * see all of their trips
 * update information about a trip
 * delete a trip
 
### Map 
 * see a map with markers of all the places they visited on a trip
 * click on a marker will open a pop up of information for a place and center the marker on the viewport
 * close a popup with the escape key or clicking on the 'x' button
 * use geolocation to see where you are
 * see the latitude, longitude, and zoom on the map
 * navigation controls: the map can be full-screen and zoom control

### Places
 * see cards of all the places they visited on a trip
 * labels on the cards of their category and if they would revisit or not
 * can search places by name, filter by category, and filter by if they would revisit or not
 * the result(s) of the searched/filtered places are reflected on both the cards of places and the markers on the map
 * add a place and can use your current location for the latitude and longitude
 * update a place's information
 * deleting a place deletes their card as well as their marker from the map

### Reflections
 * see all reflections for a place
 * add reflections for a place
 * validation that a reflection's rating must be between 0 - 10
 * add a image to a reflection
 * update a reflection
 * delete a reflection
 
 ### Active Record Associations
 * There are 5 models that have the following associations ```has_many``` and ```belongs_to ```
 
 ## Domain Model
 * Coming soon!
 
 ## Tech Stack
 * React.js
 * Redux
 * Ruby on Rails API (Backend: https://github.com/wlcreate/Mod5Project_backend)
 * PostgreSQL
 * HTML/CSS
 * Active Record
 
 ## Tools
 * [Rack CORS](https://github.com/cyu/rack-cors)
 * [ActiveModel::Serializer](https://github.com/rails-api/active_model_serializers)
 * [Figaro](https://github.com/laserlemon/figaro)
 * [BCrypt](https://github.com/codahale/bcrypt-ruby)
 * [Mapbox API](https://docs.mapbox.com/mapbox-gl-js/api/)
 * [React-Map-Gl](https://visgl.github.io/react-map-gl/)
 * [Cloudinary API](https://cloudinary.com/documentation)
 * [react-country-region-selector](https://github.com/country-regions/react-country-region-selector)
 * [particles-bg](https://github.com/lindelof/particles-bg)
 * [Semantic UI](https://react.semantic-ui.com)
 * [React Router](https://reacttraining.com/react-router/web/guides/quick-start)
 
## Build Status
 * This project was completed in 11 days for the purpose of the project presentation.
 
## Future Features
 * Improve design elements
 * Implement IBM Watson Tone Analyzer to see what mood a reflection is
 * Have more of an international scope, especially for latitude and longitude, with Geocoding
 * Incorporate trip planner aspects
 * Notification when flights to places visited are cheap
 
## Acknowledgements
I would like to thank:
  * Sylwia Vargas
  * Eric Kim
  * Annie Zheng
  * the Code Bender Cohort
  
 ## Resources:
  * [LogoMakr](https://logomakr.com) to create Pit Stop's logo
  * Landing page video: Caelan Kelley from Pixabay
  * [Canva](https://www.canva.com) for video and image editing
  * Custom map marker: icon made by inipagistudio from Flaticon 
  * Leigh Halliday's [Mapbox - Interactive maps in React](https://www.youtube.com/watch?v=JJatzkPcmoI&t)
  * Sylwia Vargas' [Hiding your API keys](https://medium.com/better-programming/how-to-hide-your-api-keys-c2b952bc07e6 )
  * Reinald Reynoso's [How to Upload Files in a React and Rails App](https://medium.com/better-programming/how-to-upload-files-in-a-react-and-rails-app-69c31a9cf9b7)
  * Bruna's [Image Storage in Rails Apps Using Cloudinary and Active Storage](https://hackernoon.com/image-storage-in-rails-apps-using-cloudinary-and-active-storage-9w2u3yli)
