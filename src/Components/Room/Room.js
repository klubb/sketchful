import React, { Component } from "react";
import "./Room.css";
import styled from "styled-components";
import { Link } from "react-router-dom";
import io from 'socket.io-client'

const Background = styled.div`
  background-repeat: no-repeat;
  background-color: #4ab5ff;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  // -webkit-animation: bgcolor 20s infinite;
  // animation: bgcolor 10s infinite;
  // -webkit-animation-direction: alternate;
  // animation-direction: alternate;
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
  // -webkit-animation: bgcolor 20s infinite;
  // animation: bgcolor 10s infinite;
  // -webkit-animation-direction: alternate;
  // animation-direction: alternate;
`;

// const Select = styled.select`

// width: 200px;
// display: block; padding: 10px 70px 10px 13px !important; max-width: 100%; height: auto !important; border: 1px solid #e3e3e3; border-radius: 3px; background: url("https://image.ibb.co/iMeAJv/selectbox_arrow.png") right center no-repeat; background-color: #fff; color: #444444; font-size: 12px; line-height: 16px !important; appearance: none; /* this is must */ -webkit-appearance: none; -moz-appearance: none; 


// `;

const Info = styled.h2 `
color: white;
`

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };

    
    this.updateMessages = this.updateMessages.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
    this.joinSuccess = this.joinSuccess.bind(this);
  }



  componentDidMount() {
    this.socket = io("http://localhost:4444")
    this.socket.on('message dispatched', this.updateMessages)
    this.socket.on('welcome', this.setUserId)
    this.socket.on('room joined', this.joinSuccess)
    this.joinRoom()
  }

  updateMessages(message) {
    const updatedMessages = this.state.messages.slice()
    updatedMessages.push(message)
    this.setState({
      messages: updatedMessages
    })
  }

  sendMessage() {
    this.socket.emit('message sent', {
      message: this.refs.message.value,
      room: this.refs.room.value
    })
    this.refs.message.value = '';
  }

  joinRoom() {
    this.socket.emit('join room', {
      room: this.refs.room.value
    })
    
  }

  joinSuccess(room) {
    console.log("you successfully joined room " + room)
  }
 
  render() {
    const messages = this.state.messages.map((e,i) => {
      const styles = e.user === this.state.userID ? {alignSelf: "flex-end", backgroundColor: "#2d96fb", color: "white"} : {alignSelf: "flex-start", backgroundColor: "#e5e6ea"}
      return (
        <p key={i} style={styles}>{e.message}</p>
      )
    })
    return (
      <Background>
        <Container className="animated fadeInDownBig">
          {" "}
          <Logo> Sketchful </Logo>
          <Info>Join a Room</Info>
          <select ref='room' defaultValue='Global' onChange={this.joinRoom}>
            <option>Global</option>
            <option>Stark</option>
            <option>Lannister</option>
            <option>Targaryen</option>
            <option>Tyrell</option>
            <option>Baratheon</option>
            <option>Greyjoy</option>
          </select>

           
        <div className="messages">
          {messages}
        </div>
        <div className="input">
          <input ref="message" />
          <button onClick={this.sendMessage}>Send</button>
        </div>
          <Link to="/dashboard">
            <Button> Enter </Button>
          </Link>{" "}
          
        </Container>
      </Background>
    );
  }
}

export default Room;
