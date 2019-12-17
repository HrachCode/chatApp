import React, { Component } from 'react'

export default class MessageFild extends Component {
  // scrollDown = ()=>{
	// 	const { container } = this.refs
	// 	container.scrollTop = container.scrollHeight
  // }
  // componentDidMount() {
	// 	this.scrollDown()
  // }
  // componentDidUpdate(prevProps, prevState) {
	// 	this.scrollDown()
	// }
    render() {
       let message
       const {state}= this.props;
      if(state.chatroom === 'room1'){
            message = state.room1;
      }else if(state.chatroom === 'room2'){
        message = state.room2;
      } 
      else if(state.chatroom === 'room3'){
        message = state.room3;
      }
      else {
        message = state.messages
      }
        return (
            
            <div ref='container' className="jumbotron mt-5 chats" >
      <div className="col-sm-12 mx-auto">
        <div>
        { 
          
          message.map((mes, index) =>
            {return(
              <div
                key={index}
                className={`message-container ${state.first_name === mes.username && 'right'}`}> 
                       <div className="time">{mes.data}</div>
                                <div className="data">
                    <div className="message">{mes.content}</div>
                    <div className="name">{mes.username}</div>
                </div>
            </div>
            ) }
                    )
          }
        </div>
      </div>
    </div>
          
        )
    }
}
