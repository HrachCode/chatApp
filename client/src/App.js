import React, { Component } from 'react'
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom'

import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
import ErrorComponent from './components/ErrorComponent/ErrorComponent'

class App extends Component {
  state = {
    hasError:false
  }
  componentDidCatch(){
    this.setState({hasError:true})
   
      }
  render() {
    if(this.state.hasError) {
     return  <ErrorComponent />
       }
    return (
    
      <Router>
     
        <div className="App">
          <Navbar />
          <Switch>
          <Route exact path="/" component={Landing} />
          
          <React.Fragment >
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            {/* <Redirect to="/" /> */}
            {/* <Route render = {ErrorComponent} /> */}
          </React.Fragment>
         
          </Switch>
        </div>
        
      </Router>
        
     
    )
  }
}

export default App