import React, { Component } from "react";
import "./Room.css";
import styled from "styled-components";

import io from "socket.io-client";
import pencil1 from "./pencil1.png";

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
    margin: 15px;
    cursor: pointer;
    &:hover {
      background: white;
      color: black;
      transition: all 0.4s ease 0s;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border: black;
        }
`;

const Info = styled.h2`
  color: white;
  font-size: 50px;
`;

const Background = styled.div`
 

  background-repeat: no-repeat;
  background-color: #4ab5ff;
  height: 100vh;
  width: 100vw;
  // overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  // background-image: url(${pencil1});
  background-position: center;
  background-size: 98vh;
  background-g
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

const Description = styled.h1`
  color: white;
  font-size: 70px;
`;

const User = styled.h1`
  color: white;
  font-family: Quicksand;
  font-size: 20px;
`;
const Img = styled.img`
  height: 30px;
  width: 30px;
  margin: 15px;
  border-radius: 15px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
const UserDiv = styled.div`
  display: flex;
  align-items: center;
`;
class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      value: this.props.value
    };

    this.joinRoom = this.joinRoom.bind(this);
    this.joinSuccess = this.joinSuccess.bind(this);
  }

  componentDidMount() {
    this.socket = io("http://localhost:4444");
    this.socket.on("message dispatched", this.updateMessages);
    this.socket.on("welcome", this.setUserId);
    this.socket.on("room joined", this.joinSuccess);
    // this.joinRoom()
  }

  joinRoom(e) {
    this.props.changeState(e.target.value);
    this.socket.emit("join room", {
      room: this.refs.room.value
    });
  }

  joinSuccess(room) {
    console.log("you successfully joined room " + room);
  }

  render() {
    console.log(this.props.value);

    if (this.props.value === "Snow" && this.props.user.id != 12) {
      window.location.reload();
      alert("Access Denied");
    }
    return (
      <Background>
        <Header>
          <Logo className="animated fadeInDown delay-1s"> Sketchful </Logo>
          <UserDiv className="animated fadeInDown delay-1s">
            <User> {this.props.user.username} </User>
            <Img src={this.props.user.picture} />
          </UserDiv>
        </Header>
        <Container className="animated fadeIn">
          {" "}
          <Info>Select a Room</Info>
          <div className="select ">
            <select
              className="selectroom"
              ref="room"
              defaultValue="Global"
              onChange={this.joinRoom}
            >
              <option>Global</option>
              <option>Stark</option>
              <option>Lannister</option>
              <option>Targaryen</option>
              <option>Tyrell</option>
              <option>Baratheon</option>
              <option>Greyjoy</option>
              <option>Snow</option>
            </select>
          </div>
          {/* <Link to="/dashboard"> */}
          <Button onClick={this.props.handleEnter}> Enter </Button>
          {/* </Link>{" "} */}
        </Container>
      </Background>
    );
  }
}

export default Room;
