import React, { Component } from 'react'
import ChatInput from '../ChatMessage'
import {MdAccountBox} from "react-icons/md";
import {MdAccountCircle} from "react-icons/md";
import { GoMail } from "react-icons/go";

export default class ProfileInfo extends Component {
   
    render() {
      
        return (
            <div>
            <div className="jumbotron mt-5">
    <div className="col-sm-8 mx-auto">
      <h1 className="text-center">PROFILE</h1>
    </div>
    <table className="table col-md-6 mx-auto table-warning">
      <tbody>
        <tr>
          <td>Fist Name <span><MdAccountBox/></span></td>
          <td>{this.props.first_name}</td>
        </tr>
        <tr>
          <td>Last Name <span><MdAccountCircle/></span></td>
          <td>{this.props.last_name}</td>
        </tr>
        <tr>
          <td>Email <span><GoMail /></span></td>
          <td>{this.props.email}</td>
        </tr>
      </tbody>
    </table>
    <div>

      <ChatInput onSubmitMessage={messageString=> this.props.onSubmitMessage(messageString)}
      addroom={this.props.addroom} />

    </div>
  </div>
            </div>
        )
    }
}
