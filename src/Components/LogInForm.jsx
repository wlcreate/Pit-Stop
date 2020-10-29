import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'

class LogInForm extends React.Component{

    state = {
        username: "",
        password: "",
        error_message: ""
    }

    handleChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    } 

    handleSubmit = (evt) => {
        evt.preventDefault()
        let {username, password} = this.state
        fetch("http://localhost:3000/users/login", {
            method: "POST",
            headers: {
                "Content-type": "Application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        .then(response => response.json())
        .then(res => {
            // debugger
            if(res.error){
                this.setState({
                    username: "",
                    password: "",
                    error_message: res.error
                })
            } else {
                this.props.setUserInfo(res)
                localStorage.token = res.token
                this.setState({
                    username: "",
                    password: ""
                })
                this.props.history.push("/trips")
            }
        })
    }

    render(){
        let {username, password, error_message} = this.state
        return(
            <div>
                <h1>Log In</h1>
                <p>{error_message}</p>
                <form onSubmit={this.handleSubmit}>
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
                    New to us?
                    <Link to="/signup">Sign up!</Link>
                </p>
            </div>
        )
    }
}

// ACTION CREATOR
let setUserInfo = (userInfo) => {
    return {
        type: "SET_USER_INFO",
        payload: userInfo
    }
}

// Sending information -> is a POJO that will be merged into the props of the component
let mapDispatchToProps = {
    setUserInfo: setUserInfo
}

export default connect(null, mapDispatchToProps)(withRouter(LogInForm))