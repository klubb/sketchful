import React, { Component } from "react";
import "./Room.css";
import {Container, Button, Info, Background, Header, Menu, Logo, BodyContainer, Description, User, Img, UserDiv, GoBack, Input, ModalContainer} from '../styles/roomStyles'
import io from "socket.io-client";
import Modal from 'react-responsive-modal'



class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      value: this.props.value,
      open: false,
      input: '',
      password: process.env.REACT_APP_PASS
    };

    this.joinRoom = this.joinRoom.bind(this);
    this.joinSuccess = this.joinSuccess.bind(this);
  }

  componentDidMount() {
    this.socket = io(process.env.REACT_APP_SERVERADDRESS);
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

  onCloseModal = () => {
    this.setState({
      open: false
    })
  }

  handleEnter = () => {
    
    if(this.props.value === 'Snow') {
      this.setState({
        open: true
      })
    } else {this.props.handleEnter()}
   
  }

  handlePassword = (e) => {
    this.setState({
      input: e.target.value
    })
  }

  handleEnterPrivate = () => {
    if(this.state.input === this.state.password) {
      this.props.handleEnter()
    } else {
      alert('Wrong Password')
    }
  }



  render() {
    console.log(this.props.value);

    // if (this.props.value === "Snow" && this.props.user.id != 12) {
    //   window.location.reload();
    //   alert("Access Denied");
    //  }

  
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
       
        <Modal showCloseIcon={false} open={this.state.open} onClose={this.onCloseModal}>
        <ModalContainer>
        <Input onChange={this.handlePassword}placeholder='password' type="text"/>
        <Button onClick={this.handleEnterPrivate}>Enter</Button>
        </ModalContainer>
        </Modal>
          
          <Button onClick={this.handleEnter}> Enter </Button>
          
          
        </Container>
      </Background>
    );
  }
}

export default Room;
