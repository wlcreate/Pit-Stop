import './App.css'; // style
import React from 'react'
import {connect} from 'react-redux'
import {Link, Switch, Route, withRouter, Redirect} from 'react-router-dom'

// Components
import NavBar from './Components/NavBar'
import Home from './Components/Home'
import LogInForm from './Components/LogInForm'
import SignUpForm from './Components/SignUpForm'
import TripsContainer from './Components/Trips/TripsContainer'
import TripPage from './Components/Places/TripPage'
import ReflectionsContainer from './Components/Reflections/ReflectionsContainer';
import Footer from './Components/Footer'
import AccountPage from './Components/Account/AccountPage'
import UpdateAccountForm from './Components/Account/UpdateAccountForm'
import NotFoundPage from './Components/NotFoundPage'

class App extends React.Component{

  componentDidMount(){
    if(localStorage.token){
      fetch("http://localhost:3000/users/keep_logged_in", {
        // Any time that you want to CRUD user information, send the token to the backend
    
        // Any time that you send the token to the backend, the controller action needs a:
          // before_action :authorized
        method: "GET",
        headers: {
          "Authorization": localStorage.token
        }
      })
      .then(res => res.json())
      .then(response => {
        if(response.token){
          this.props.setUserInfo(response)
        }
      })
    }
  }

  renderPlaces = () => {
    if(this.props.token){
      return <TripPage />
    } else {
      return <Redirect to="/trips"/>
    }
  }

  renderReflections = () => {
    if(this.props.token){
      return <ReflectionsContainer />
    } else {
      return <Redirect to="/trips"/>
    }
  }

  render(){
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route path="/" exact component={Home}/>
          {/* <Route path="/foxes">
            <FoxContainer/>
          </Route> */}
          <Route path="/login" component={LogInForm}/>
          <Route path="/signup" component={SignUpForm}/>
          <Route path="/trips" exact component={TripsContainer}/>
          <Route path="/trips/:id/places" exact render={this.renderPlaces}/>
          <Route path="/trips/:id/places/:id/reflections" exact render={this.renderReflections}/>
          {/* <Route path="/trips/:id/places/:id/reflections" exact component={ReflectionsContainer}/> */}
          <Route path="/account" exact component={AccountPage}/>
          <Route path="/account/edit" exact component={UpdateAccountForm}/>
          <Route component={NotFoundPage} />
          {/* <Route render={ () => <p>Page not Found</p> } /> */}
        </Switch>
        <Footer />
      </div>
    ) 
  }
}

let mapStateToProps = (globalState) => {
  return {
      token: globalState.user.token
  }
}

// Action Creator
let setUserInfo = (userInfo) => {
  return {
    type: "SET_USER_INFO",
    payload: userInfo
  }
}

let mapDispatchToProps = {
  setUserInfo: setUserInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
