import React, { Component } from 'react'
import { login } from './UserFunctions'

class Login extends Component {
  state = {
      errors:'',
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
        this.setState({ [name]: value,errors:'' },
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

    const user = {
      email: this.state.email,
      password: this.state.password
    }

    login(user)
    .then(res => {
     
      if (res.islogined) {
     
         this.props.history.push(`/profile`)
      }
      this.setState({errors:'wrong username or password'})
    }).catch(()=>this.setState({errors:'wrong username or password'}) );
  }
  errorClass(error) {
    
    return(error.length === 0 ? '' : 'is-invalid');
 }

  render() {
   
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
             {(this.state.errors === '')? <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                                              :<h1 className="h3  mb-3 font-weight-normal" style={{color:"red"}}>{this.state.errors}</h1>}
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className={`form-control ${this.errorClass(this.state.formErrors.email)}`}
                  name="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>
              <div  className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
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
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login