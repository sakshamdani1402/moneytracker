import React, { useState } from 'react';
import { useLocation } from 'wouter';
import register from "../images/register.svg"

const Signup = (props) => {
    const [location, setLocation] = useLocation();
  const [credentials, setCredentials] = useState({ email: "", password: "", name: "", cpassword: "" });
  const handleSubmit = async (e) => {
    const { name, email, password } = credentials;
    e.preventDefault();
    const response = await fetch("http://localhost:5000/auth/register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password })
    });
    const json = await response.json();
    console.log(json);
    if (json.success === true) {
      //props.showAlert("Account Created successfully","success");
      setLocation('/login');
    }
    else {
     // props.showAlert("Invalid Credentials","danger");
    }
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div className='row my-4 signup-page d-flex'>
      <div className="col-md-6">
        <h3 className='pb-4'>Join Trackspense</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control input" id="email" name="email" value={credentials.email} aria-describedby="emailHelp" onChange={onChange} required />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control input" id="password" name="password" value={credentials.password} onChange={onChange} required minLength={4} />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control input" id="cpassword" name="cpassword" value={credentials.cpassword} onChange={onChange} required minLength={4} />
          </div>
          <button type="submit" className="btn blue btn-lg" >Submit</button>
        </form>
      </div>
      <div className="col-6 me-0 d-none d-md-flex signup-img justify-content-center align-items-center">
        <img src={register} alt="" />
      </div>
    </div>);
};

export default Signup;