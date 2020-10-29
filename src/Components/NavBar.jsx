import React from 'react'
import {connect} from 'react-redux'
import {withRouter, NavLink} from 'react-router-dom'

class NavBar extends React.Component {

    handleClick = (evt) => {
        // debugger
        localStorage.clear()
        console.log(handleLogOut())
        handleLogOut()
    }
    render(){
        return (
            <div>
                {
                    localStorage.token
                    ?
                    <ul className="nav">
                        <li>
                            <p>RE-TRAVEL</p>
                        </li>
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/trips">Trips</NavLink>
                        </li>
                        <li>
                            <NavLink to="/account">Account</NavLink>
                        </li>
                        <li onClick={this.handleClick}>
                            <NavLink to="/">Log Out</NavLink>
                        </li>
                    </ul>
                    :
                    <ul className="nav">
                        <li>
                            <p>RE-TRAVEL</p>
                        </li>
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/login">Log In</NavLink>
                        </li>
                        <li>
                            <NavLink to="/signup">Sign Up</NavLink>
                        </li>
                    </ul>
                }
            </div>
        )
    }
}

// ACTION CREATOR
let handleLogOut = () => {
    return {
        type: "LOG_OUT_USER"
    }
}

// Sending information -> is a POJO that will be merged into the props of the component
let mapDispatchToProps = {
    handleLogOut: handleLogOut
}

export default connect(null, mapDispatchToProps)(withRouter(NavBar))