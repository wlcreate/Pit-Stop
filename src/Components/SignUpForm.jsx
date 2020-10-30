import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import { Input, Form, Button } from 'semantic-ui-react'

class SignUpForm extends React.Component{

    state = {
        first_name: "",
        last_name: "",
        username: "",
        password: ""
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
            if (res.error) {
                console.error(res.error)
                alert(res.error)
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

        return(
            <div>
                <h1>Sign Up</h1>
                <Form>
                    <Form.Field id="first_name"
                        control={Input}
                        label="First name"
                        placeholder="First name"
                        name="first_name"
                        value={first_name}
                        onChange={this.handleChange}
                        width={8}
                    />
                    <Form.Field id="last_name"
                        control={Input}
                        label="Last name"
                        placeholder="Last name"
                        name="last_name"
                        value={last_name}
                        onChange={this.handleChange}
                        width={8}
                    />
                    <Form.Field id="username"
                        control={Input}
                        label="Username"
                        placeholder="Username"
                        name="username"
                        value={username}
                        onChange={this.handleChange}
                        width={8}
                    />
                    <Form.Field id="password"
                        control={Input}
                        label="Password"
                        placeholder="Password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                        width={8}
                    />
                    <Form.Field
                        id='submit'
                        control={Button}
                        content='Sign Up'
                        onClick={this.handleClick}
                    />
                </Form>
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