import React, { Component } from 'react'
import PropTypes from 'prop-types'


class ChatInput extends Component {
  static propTypes = {
    onSubmitMessage: PropTypes.func.isRequired,
  }
  state = {
    message: '',
  }
  
  render() {
    
    return (
     <div> <form
        action="."
        onSubmit={e => {
          e.preventDefault()
          this.props.onSubmitMessage(this.state.message)
          this.setState({ message: '' })
        }}
      > 
        <input
          type="text"
          placeholder={'Enter message...'}
          value={this.state.message}
          onChange={e => this.setState({ message: e.target.value })}
          className="form-control"
          style={{ float: "left !important", width: '30%',display: 'inline'}}
        />
        <input className="btn btn-outline-success" type="submit" value={'Send'} />
       
      </form>
      
      </div>
    )
  }
}

export default ChatInput
