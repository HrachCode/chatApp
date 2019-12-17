import React, {
  Component
} from 'react'
import io from 'socket.io-client'
import jwt_decode from 'jwt-decode'
import ProfileInfo from './profileInfo/profileInfo'
import {getTime,getUser} from './UserFunctions'
import MessageFild from './messagFild/messageFild'
import Sidbar from './sidbar/sidbar'


const socketUrl = "http://localhost:5000";
const socket = io(socketUrl)

class Profile extends Component {
  state = {
    first_name: '',
    last_name: '',
    email: '',
    messages:[],
      room1:[],
      room2:[],
      room3:[],
      chatroom:''
  }

  componentDidMount() {
   
    if(this.state.messages.length === 0){
      getUser("/profile")
    .then(data=>{
           this.setState(state => ({
        messages: [...data]
        }))
    })
  }
    const token = localStorage.myusertoken
    const decoded = jwt_decode(token)
    this.setState({
      first_name: decoded.first_name,
      last_name: decoded.last_name,
      email: decoded.email
    })
    
    socket.on('msgs', (data) => {
      this.addChat(data)
    })
    socket.on("history", data => this.getDb(data))
      socket.on("new_msg", (data)=> {
        this.newMsg(data)
  })
      }

  flag = 0;
  addroom = (room)=>{
    this.setState({chatroom:room})
    
       
  }
  newMsg = (data)=>{
    if(data.roomNuber === 'room1'){
      this.setState(state => ({
        room1: [data.data, ...state.room1]
      }))
      }else if(data.roomNuber === 'room2'){
        this.setState(state => ({
          room2: [data.data, ...state.room2]
        }))
    }else{
      this.setState(state => ({
        room3: [data.data, ...state.room3]
      }))
    }
    
  }

  addChat = (chat) => {
  
    const obj = {
      id:chat.id,
      data:getTime(new Date(Date.now())),
      content:chat.content,
      username:chat.username
    }
    
        this.addMessage(obj)
  }

  addMessage = message => {
    this.setState(state => ({
      messages: [message, ...state.messages]
    }))

  }
    submitMessage = messageString => {
     this.flag = this.flag + 1;
     const room = this.state.chatroom;
    const msg = {
      content: messageString,
      username: this.state.first_name
    }
    if(!this.state.chatroom || room === 'globalroom'){
     return socket.emit('msg', msg)
    } 
    socket.emit('create',{msg:msg,room:this.state.chatroom})
        
  }
    render() {
     const state = this.state;
        return (
        <div className="container">
  <ProfileInfo first_name={state.first_name} last_name={state.last_name}
       email ={state.email} onSubmitMessage={this.submitMessage} />
        <div className="wraper">
        <Sidbar  addroom={this.addroom} />
       <MessageFild state={state} />
        </div>
  </div>



)

}

}

export default Profile