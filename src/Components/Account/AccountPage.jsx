import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import PasswordModal from './PasswordModal'

class AccountPage extends React.Component{

    render(){

        let {first_name, last_name, username} = this.props.user

        return(
            <div>
                <h1>My Account</h1>
                <p>First name: {first_name}</p>
                <p>Last name: {last_name}</p>
                <p>username: {username}</p>
                <PasswordModal />
                
            </div>
        )
    }
}

// getting information
let mapStateToProps = (globalState) => {
    return {
        user: globalState.user.user
    }
}

export default connect(mapStateToProps)(withRouter(AccountPage))