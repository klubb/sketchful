import React, { Component } from "react";
import "./Dashboard.css";

import axios from "axios";
import { getUserData } from "../../ducks/reducer";
import { connect } from "react-redux";
import Chat from "../Chat/Chat";
import Canvas from "../Canvas/Canvas";
import Room from '../Room/Room'
import io from 'socket.io-client'



class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      joinedRoom: '',
      value: 'Westeros (Global)',
      selectedRoom: false,
      username: "",
      editing: false,
      words: [
        "cat",
        "dog",
        "sun",
        "cup",
        "pie",
        "bug",
        "snake",
        "tree",
        "fire",
        "banana",
        "cave",
        "apple",
        "rainbow",
        "computer",
        "mouse",
        "car",
        "train",
        "chair",
        "stop sign",
        "mountain",
        "chip",
        "drink",
        "monitor"
      ],
      word: ""
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDeleteAccount = this.handleDeleteAccount.bind(this);
  }

  async componentDidMount() {
    this.socket = io.connect(process.env.REACT_APP_SERVERADDRESS);
    
    


    this.socket.on('join', this.userJoined)

    

    let res = await axios.get("/api/user-data");
  
    res.data === 'Please Login' ? window.location.href = process.env.REACT_APP_HOME : this.props.getUserData(res.data);

    this.socket.emit("join room", {
      room: this.state.value
    });

  }

  handleRandomWord = () => {
    let { words } = this.state;
    let random = words[Math.floor(Math.random() * words.length)];
    this.setState({
      word: random
    });
  };

  handleEdit = () => {
    this.setState({
      editing: !this.state.editing
    });
  };

  async handleSave() {
    const response = await axios.put("/api/edituser", {
      username: this.state.username
    });
    this.setState({
      editing: false
    });
    this.props.getUserData(response.data);
  }

  handleUsername = e => {
    this.setState({
      username: e.target.value
    });
  };

  handleDeleteAccount = () => {
    axios.delete("/api/deleteuser").then(res => {
      window.location.href = process.env.REACT_APP_HOME
    });
  };

  handleEnter = () => {
    this.setState({
      selectedRoom: !this.state.selectedRoom
      
    })
    this.socket.emit("join", {
      user: this.props.user.username,
      room: this.state.value
    });
 }

 changeState = (val) => {
   this.setState({
     value: val
   })
 }


 

 changeRoom = () => {
   window.location.reload()
 }
  
 logoClick = () => {
  window.location.href = process.env.REACT_APP_HOME
 }

 userJoined = (user) => {
  this.setState({
    joinedRoom: `${user} joined`
  })
  if (this.timeout) clearTimeout(this.timeout);
this.timeout = setTimeout(() => {
  this.setState({ joinedRoom: "" });
}, 4000);
 }


  render() {
    console.log(this.state.word);
    console.log(this.state.username);
    let { username, picture /* auth_id*/ } = this.props.user;
    console.log(this.props.user);
    console.log(this.state.joinedRoom)
    console.log('value', this.state.value)

    if(this.state.selectedRoom) {
    return (
      <div className="animated fadeIn faster">
        <div className="header">
          <h1 onClick={this.logoClick}className="logo animated jackInTheBox">Sketchful </h1>
          <div />
          <div />
          
          <div className="worddisplay">
          
            <h4>{this.state.word}</h4>{" "}
          </div>
          <div>
            
            <button onClick={this.handleRandomWord} className="randombtn">
              Random Word
            </button>
            <button onClick={this.changeRoom} className="randombtn">
              Change Room
            </button>
          </div>
          <div className="userinfo">
            <i onClick={this.handleEdit} className="fas fa-user-edit edit" />
            {this.state.editing ? (
              <div className="animated fadeInDown fast edit-container">
                {" "}
                <input
                  className="usernameinput "
                  onChange={this.handleUsername}
                  placeholder="change username"
                />
                <button className="savebtn" onClick={this.handleSave}>
                  Save
                </button>{" "}
                <button
                  onClick={this.handleDeleteAccount}
                  className="savebtn delete"
                >
                  Delete Account
                </button>
              </div>
            ) : null}

            <h5 className="animated pulse username">{username}</h5>
            <img className="picture animated pulse" src={picture} alt="" />
            <a href={process.env.REACT_APP_LOGOUT}>
              <button className="logout">Logout</button>{" "}
              
            </a>
          </div>
        </div>

        <div className="main">
              
          <Canvas value={this.state.value} />
          

          <Chat  joined={this.state.joinedRoom} value={this.state.value} words={this.state.words} word={this.state.word} />
        </div>
      </div>
    )} 
    else {
      return (

        <Room user={this.props.user} changeState={this.changeState} value={this.state.value} handleEnter={this.handleEnter} />
        
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(
  mapStateToProps,
  { getUserData }
)(Dashboard);
