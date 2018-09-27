import React, { Component } from "react";
import "./Room.css";
import styled from "styled-components";
import { Link } from "react-router-dom";
import pencil from "./pencil1.png";
// import background from './roomsbackground.png'

const Background = styled.div`
  
background-repeat: no-repeat;
background-color: #4ab5ff;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

 
    -webkit-animation: bgcolor 20s infinite;
    animation: bgcolor 10s infinite;
    -webkit-animation-direction: alternate;
    animation-direction: alternate;

`;

const Container = styled.div`
  //   background-color: white;
  height: 500px;
  width: 450px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 100px;
`;

const Button = styled.button`
  width: 15.4vw;
  height: 6vh;
  background-color: #1F2833
  border: 2px solid #1F2833
  color: white;
  font-size: 20px;
    font-family: Oswald
    margin: 10px;
    cursor: pointer;
`;

const Input = styled.input`
  width: 15vw;
  height: 6vh;
  border: solid 2px black;
  font-size: 20px;
  font-family: Montserrat
  text-align: center;
  
  &::placeholder{text-align: center}

`;

const Logo = styled.h1`
  font-family: Lobster;
  font-size: 70px;
  -webkit-animation: bgcolor 20s infinite;
  animation: bgcolor 10s infinite;
  -webkit-animation-direction: alternate;
  animation-direction: alternate;
`;

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Background>
        <Container className="animated fadeInDownBig">
          {" "}
          <Logo> Sketchful </Logo>
          <Input placeholder="Enter Pin" />{" "}
          <Link to="/dashboard">
            <Button> Enter </Button>
          </Link>{" "}
        </Container>
      </Background>
    );
  }
}

export default Room;
