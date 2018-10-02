import React, { Component } from "react";
import "./Login.css";
// import logo from "./large_sketch.png";
import pencil1 from "./pencil1.png";

import styled from "styled-components";
import {Link} from 'react-router-dom'
const Background = styled.div`
 

  background-repeat: no-repeat;
  background-color: #4ab5ff;
  height: 100vh;
  width: 100vw;
  // overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url(${pencil1});
  background-position: center;
  background-size: 98vh;

`;

const Header = styled.div`
  width: 85vw;
  display: flex;
  // padding: 5px;
  justify-content: space-between;
  align-items: center;
  // border: solid black 1px;
  margin-top: 70px;
  // margin-left: 55px;
`;

const Menu = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  color: white;
  font-family: Montserrat;
`;

const Logo = styled.h1`
  font-family: Lobster;
  font-weight: bold;
  margin: 0;
  color: white;
`;

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  // border: solid 1px black;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  margin-bottom: 60px;
`;
const Button = styled.button`
  cursor: pointer;
  width: 268px;
  height: 65px;

  color: white;
  background: transparent;
  border: solid 1px white;
  // box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  // border-radius: 5px;
  font-size: 30px;
  font-family: "Quicksand";
  &:hover {
    background: white;
    color: black;
    transition: all 0.4s ease 0s;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
`;

const Description = styled.h1 `
color: white;
font-size: 70px;


`

class Login extends Component {
  state = {};

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
            <Button onClick={this.login} className='animated bounceInDown '> Get Started </Button>
          </BodyContainer>
        </Background>
      </div>
    );
  }
}

export default Login;
