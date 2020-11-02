import React from 'react'
import {connect} from 'react-redux'
import {withRouter, NavLink} from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

class NavBar2 extends React.Component{

    state = {

    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    handleClick = (evt) => {
        // debugger
        localStorage.clear()
        // console.log(handleLogOut())
        this.props.handleLogOut()
    }

    render(){

        const { activeItem } = this.state

        return(
            <div>
                 <div class="ui secondary menu">
                    <div class="header item">Re-Travel</div>
                    <a class="active item">Home</a>
                    <a class="item">Messages</a>
                    <a class="item">Friends</a>
                    <div class="right menu">
                        <a class="item">Logout</a>
                    </div>
                 </div>
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

export default connect(null, mapDispatchToProps)(withRouter(NavBar2))