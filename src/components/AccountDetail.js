import React, {Component} from 'react';
import {Button} from 'reactstrap';


class AccountDetail extends Component {
    constructor(props){
        super(props);
    }
    render(){
        if(this.props.isLogedIn){
            return(
                <div className="ml-auto">
                    <Button className="Log-OutButton" onClick={this.props.handleLogOut.bind(this)}>Log-Out</Button>
                    <h4>{this.props.username}</h4>
                </div>
            );
        }
        else{
            return(
                <div className="ml-auto">
                    <Button className="Log-InButton" onClick={this.props.toggleLogInModal.bind(this)}>Log-In</Button>
                    <Button className="Sign-UpButton" onClick={this.props.toggleSignUpModal.bind(this)}>Sign-Up</Button>
                </div>
            );
        }
    }
}

export default AccountDetail;