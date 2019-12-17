import React, { Component } from 'react'
import './sidbar.css'

export default class Sidbar extends Component {
    render() {
        const {addroom}= this.props
        return (
            <div className="jumbotron mt-5 " >
     
        <div className="barrContent">
        <h2>chat rooms</h2>
        <button type="button"  className="btn btn-danger btnbar" onClick={()=>{addroom("globalroom")}} >Global room</button>
      <button type="button"  className="btn btn-info btnbar" onClick={()=>{addroom("room1")}} >room1</button>
      <button type="button"  className="btn btn-primary btnbar" onClick={()=>{addroom("room2")}} >room2</button>
      <button type="button"  className="btn btn-secondary btnbar" onClick={()=>{addroom("room3")}} >room3</button>
        </div>
      </div>
  
            
           
        )
    }
}
