import React, { Component } from "react";
import "./Login.css";
import {Link} from 'react-router-dom'
import {Background, Header, Menu, Logo, BodyContainer, Button, Description } from '../styles/loginStyles'
import axios from 'axios'


class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: ''
    };
  }
  
  async componentDidMount () {
    let res = await axios.get('/api/user-data')
    if(res.data != 'Please Login') {
      this.setState({
        loggedIn: res.data
      })
    }
  }

  dash = () => {
    window.location.href = process.env.REACT_APP_DASH
  }

  

  login = () => {
    let { REACT_APP_DOMAIN, REACT_APP_CLIENT_ID } = process.env;
    let url = `${encodeURIComponent(window.location.origin)}/auth/callback`;
    window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${url}&response_type=code`;
  };

  render() {
  
    return (
      <div>
        <Background className='animated fadeInDown faster'>
          <Header>
            <Logo className='animated pulse' > Sketchful </Logo>
            <Menu>

             <Link style={{textDecoration: 'none', color: 'white'}}to='/about' ><li>About</li></Link>
             <Link style={{textDecoration: 'none', color: 'white'}}to='/contact' ><li>Links</li></Link>
              <li></li>
              
            </Menu>
          </Header>
          <BodyContainer >
            <Description className='animated bounceInDown fast'> Draw & Chat With Your Friends </Description>
           
            {this.state.loggedIn ? <Button onClick={this.dash} className='animated bounceInDown '> Go to Dashboard </Button> : <Button onClick={this.login} className='animated bounceInDown '> Get Started </Button>  }
           
          </BodyContainer>
        </Background>
      </div>
    );
  }
}

export default Login;
