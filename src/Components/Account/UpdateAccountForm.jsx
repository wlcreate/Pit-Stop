import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

class UpdateAccountForm extends React.Component{

    state = {
        first_name: this.props.user.first_name,
        last_name: this.props.user.last_name,
        username: this.props.user.username,
        password: "",
        confirm_password: ""
    }

    handleChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    handleUpdate = (evt) => {
        evt.preventDefault()
        let {first_name, last_name, username, password, confirm_password} = this.state
        fetch(`http://localhost:3000/users/${this.props.user.id}`, {
            method: "PATCH",
            headers: {
                "Content-type": "Application/json",
                "Authorization": this.props.token
            },
            body: JSON.stringify({
                first_name,
                last_name,
                username,
                password,
                confirm_password
            })
        })
        .then(res => res.json())
        .then(response => {
            console.log(response)
            this.props.updateUser(response)
            this.props.history.push("/account")
        })
    }

    render(){

        let {first_name, last_name, username} = this.state
        
        return(
            <div id="update-account-form">
                <h1>Update Your Account</h1>
                <form onSubmit={this.handleUpdate}>
                    <label htmlFor="first_name">First name</label>
                    <input type="text" className="update-account-input"
                        name="first_name"
                        value={first_name}
                        onChange={this.handleChange}
                    />
                    <br></br>
                    <label htmlFor="last_name">Last name</label>
                    <input type="text" className="update-account-input"
                        name="last_name"
                        value={last_name}
                        onChange={this.handleChange}
                    />
                    <br></br>
                    <label htmlFor="username">username</label>
                    <input type="text" className="update-account-input"
                        name="username"
                        value={username}
                        onChange={this.handleChange}
                    />
                    <br></br>
                    <label htmlFor="password">Password</label>
                    <input type="" className="update-account-input"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                    <br></br>
                    <label htmlFor="confirm_password">Confirm Password</label>
                    <input type="password" className="update-account-input"
                        name="confirm_password"
                        value={this.state.confirm_password}
                        onChange={this.handleChange}
                    />
                    <br></br>
                    <input id="update-account-submit" type="submit" value="Submit"/>
                </form>
            </div>
        )
    }
}

// get information
let mapStateToProps = (globalState) => {
    return {
        user: globalState.user.user,
        token: globalState.user.token
    }
}

// Action creator
let updateUser = (updatedInfo) => {
    return{
        type: "SET_USER_INFO",
        payload: updatedInfo
    }
}

// setting information
let mapDispatchToProps = {
    updateUser: updateUser
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UpdateAccountForm))