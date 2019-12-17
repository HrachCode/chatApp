import React, { Component } from 'react'
import { register } from './UserFunctions'
import {FormErrors} from './formerror'



class Register extends Component {
 state = {
   
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    formErrors: {email: '', password: ''},
    emailValid: false,
    passwordValid: false,
    formValid: false
  } 
  
  onChange = (e)=> {
    const name = e.target.name;
    const value = e.target.value;
      this.setState({ [name]: value },
      () => { this.validateField(name, value) })
     
  }
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
  switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '': ' is too short';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    emailValid: emailValid,
                    passwordValid: passwordValid
                  }, this.validateForm);
  }
  validateForm() {
    this.setState({formValid: this.state.emailValid &&
                              this.state.passwordValid});
  }
  onSubmit=(e)=> {
    e.preventDefault()
    
    this.setState({errors:''})
    const newUser = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password
    }

    register(newUser).then(res => {
     
        if (!res.data.error) {
            this.props.history.push(`/login`)
            }
        
          }).catch(console.log('error'))
         
  }
  errorClass(error) {
    
    return(error.length === 0 ? '' : 'is-invalid');
 }
  
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
           
          <div className='panel panel-default'>
                    <FormErrors formErrors={this.state.formErrors} />
          </div>
            <form noValidate onSubmit={this.onSubmit}>
          
              <div className="form-group">
                <label htmlFor="name">First name</label>
                <input
                  type="text"
                  className='form-control'
                  name="first_name"
                  placeholder="Enter your first name"
                  value={this.state.first_name}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Last name</label>
                <input
                  type="text"
                  className='form-control'
                  name="last_name"
                  placeholder="Enter your lastname name"
                  value={this.state.last_name}
                  onChange={this.onChange}
                /> 
              </div>
              <div className='form-grup'>
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className={`form-control ${this.errorClass(this.state.formErrors.email)}`}
                  name="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>
              <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className={`form-control ${this.errorClass(this.state.formErrors.password)}`}
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
                disabled={!this.state.formValid}
              >
                Register!
              </button>
            </form>
          </div>
        </div>
        
      </div>
     
    )
  }
}

export default Register