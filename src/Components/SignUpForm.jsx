import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import { Input, Form, Button } from 'semantic-ui-react'

class SignUpForm extends React.Component{

    state = {
        first_name: "",
        last_name: "",
        username: "",
        password: "",
        errors: []
    }

    handleChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    } 

    handleClick = (evt) => {
        evt.preventDefault()
        let {first_name, last_name, username, password} = this.state
        fetch("http://localhost:3000/users",{
            method: "POST",
            headers: {
                "Content-type": "Application/json"
            },
            body: JSON.stringify({
                first_name,
                last_name,
                username,
                password
            })
        })
        .then(response => response.json())
        .then(res => {
            // console.log(res)
            // debugger
            if (res.errors) {
                // debugger
                console.error(res.errors)
                this.setState({
                    errors: res.errors
                })
                // alert(res.errors)
              }
              else {
                localStorage.token = res.token
                this.props.createUser(res)
                this.props.history.push("/trips")
              }
        })
    }

    render(){

        let {first_name, last_name, username, password} = this.state

        let showErrors = this.state.errors.map(error => {
            return <li key={error.id}>{error}</li>
        })
        // debugger
        return(
            <div id="signup-background">
                <div className="signup">
                    <h1 id="signup-h1">Nice to meet you!</h1>
                    <img className="animated-gif" src="https://media.giphy.com/media/toelXGUsYD6vtCN408/giphy.gif" alt="signup gif"/>
                    
                    <p id="signup-p">Sign up to keep track and reflect on where you've gone.</p>
                    <div>
                        <ul className="error">
                            {showErrors}
                        </ul>
                    </div>
                    <Form id="signup-form">
                        <Form.Field inline>
                            <label id="first_name">First name</label>
                            <Input 
                            placeholder="First name"
                            name="first_name"
                            value={first_name}
                            onChange={this.handleChange}
                            width={8}
                            />
                        </Form.Field>
                        <Form.Field inline>
                            <label id="last_name">Last name</label>
                            <Input
                            placeholder="Last name"
                            name="last_name"
                            value={last_name}
                            onChange={this.handleChange}
                            width={8}
                            />
                        </Form.Field>
                        <Form.Field inline>
                            <label id="username">Username</label>
                            <Input
                            placeholder="Username"
                            name="username"
                            value={username}
                            onChange={this.handleChange}
                            width={8}
                            />
                        </Form.Field>
                        <Form.Field inline>
                            <label id="password">Password</label>
                            <Input type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={this.handleChange}
                            width={8}
                            />
                        </Form.Field>
                        <Form.Field
                            id='submit'
                            control={Button}
                            content='Sign Up'
                            onClick={this.handleClick}
                        />
                    </Form>
                    <p className="login-bottom">Have an Account?</p><Link className="login-bottom" to="/login">Login</Link>
                </div>
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