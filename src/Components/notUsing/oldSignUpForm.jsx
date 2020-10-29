import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'

class SignUpForm extends React.Component{

    state = {
        first_name: "",
        last_name: "",
        username: "",
        password: ""
    }

    render(){

        let {first_name, last_name, username, password} = this.state

        return(
            <div>
                <h1>Sign Up</h1>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="first_name">First Name</label>
                    <input type="text"
                        name="first_name"
                        value={first_name}
                        onChange={this.handleChange}
                    />
                    <br></br>
                    <label htmlFor="last_name">Last Name</label>
                    <input type="text"
                        name="last_name"
                        value={last_name}
                        onChange={this.handleChange}
                    />
                    <br></br>
                    <label htmlFor="username">Username</label>
                    <input type="text"
                        name="username"
                        value={username}
                        onChange={this.handleChange}
                    />
                    <br></br>
                    <label htmlFor="password">Password</label>
                    <input type="password"
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                    />
                    <br></br>
                    <input type="submit" value="Welcome Back!"/>
                </form>
                <p>
                    Have an Account?
                    <Link to="/login">Log In!</Link>
                </p>
            </div>
        )
    }
}

// ACTION CREATOR
let createUser = (newUser) => {
    return {
        type: "SET_USER_INFO",
        payload: newUser
    }
}

// Sending information -> is a POJO that will be merged into the props of the component
let mapDispatchToProps = {
    createUser: createUser
}

export default connect(null, mapDispatchToProps)(withRouter(SignUpForm))