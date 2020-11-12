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
                alert("Nice to see you again!")
                this.props.history.push("/trips")
            }
        })
    }

    render(){
        let {username, password, error_message} = this.state
        return(
            <div className="login-background">
                <div className="login">
                    <h1 id="login-h1">Welcome back!</h1>
                    <img className="animated-gif" src="https://media.giphy.com/media/dYUslDahf6Uw71gH3t/giphy.gif" alt="login welcome" />
                    <p id="login-p">Login to remember where you've gone and where you'll go</p>
                    <p className="error">{error_message}</p>
                    <form onSubmit={this.handleSubmit}>
                        <div class="input-icons">
                            <label htmlFor="username">
                                <i aria-hidden="true" class="user icon"></i>
                            </label>
                            <input className="login-input" type="text"
                                name="username"
                                placeholder="username"
                                value={username}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div class="input-icons">
                            <label htmlFor="password">
                                <i aria-hidden="true" class="key icon"></i>
                            </label>
                            <input className="login-input" type="password"
                                name="password"
                                placeholder="password"
                                value={password}
                                onChange={this.handleChange}
                            />
                        </div>
                        <input className="login-submit" type="submit" value="Login"/>
                    </form>
                    <p className="login-bottom">New to us?</p><Link className="login-bottom" to="/signup">Sign up!</Link>
                </div>
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