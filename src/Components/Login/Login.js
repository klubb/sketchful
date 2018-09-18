import React, { Component } from "react";
import "./Login.css";
// import logo from "./large_sketch.png";
import pencil1 from "./pencil1.png";

class Login extends Component {
  state = {};



  login = () => {
    let { REACT_APP_DOMAIN, REACT_APP_CLIENT_ID } = process.env;
    let url = `${encodeURIComponent(window.location.origin)}/auth/callback`;
    window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${url}&response_type=code`;
  };

  render() {
    return (
      <div className="background">
        <div className="container">
          <div className="side">
            <img className="art" src={pencil1} alt="" />
          </div>
          <div className="info">
            <h1>Sketchful</h1>

            <h3>Draw and Chat with Friends</h3>
            <button className='login' onClick={this.login}>Get Started</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
