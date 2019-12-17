import React from 'react'
import './ErrorComponent.css'




const close = ()=>{
    localStorage.removeItem('myusertoken')
   
}
 const ErrorComponent =()=> 
  
<div className="err">
<div className="alert alert-dismissible alert-danger">
   <a href="/"> <button type="button" onClick={close} className="close" data-dismiss="alert">&times;</button></a>
        <strong>Oh snap!</strong> <a href="/" 
            className="alert-link">Change a few things up</a> and try submitting again.
</div>
        <p id="err">404 Error</p>
        <h1>Sorry, we can’t seem to find what you’re looking for.</h1>
        <h2>You've landed on a URL that doesn't seem to exist on CSS-Tricks. Here's some options:</h2>
          <ul>
              <li>If you think this is an error on our part, please let us know.</li>
              <li>You could try a search up <span>↗</span>  there in the header, that should turn up whatever you were looking for.</li>
              <li>If you'd like to just browse, header over to the articles page.</li>
          </ul>
</div>
  
 export default ErrorComponent
    
