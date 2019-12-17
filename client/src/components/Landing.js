import React, { Component } from 'react'

class Landing extends Component {
  render() {
    return (
     <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">WELCOME</h1>
          </div>
        </div>
        <div className="jumbotron">
  <h1 className="display-3">Hello, lets chat!</h1>
  <p className="lead">in order to start your communication you will first need to register. We wish you a pleasant chat with friends</p>
  <hr className="my-4"/>
  <p>join our friendly community..</p>
  <p className="lead">
    <a className="btn btn-primary btn-lg" href="/login" role="button">Sing In</a>
  </p>
</div>
             </div>
    )
  }
}

export default Landing