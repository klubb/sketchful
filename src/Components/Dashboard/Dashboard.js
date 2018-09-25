import React, { Component } from "react";
import "./Dashboard.css";

import axios from "axios";
import { getUserData } from "../../ducks/reducer";
import { connect } from "react-redux";
import Chat from "../Chat/Chat";
import Canvas from "../Canvas/Canvas";


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
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
    this.handleEdit = this.handleEdit.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleDeleteAccount = this.handleDeleteAccount.bind(this)
  }

  async componentDidMount() {
    let res = await axios.get("/api/user-data");
    this.props.getUserData(res.data);
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
    })
  }

  async handleSave () {
    const response = await axios.put('/api/edituser', {username: this.state.username})
    this.setState({
      editing: false
    })
    this.props.getUserData(response.data)

  }

  handleUsername = (e) => {
    this.setState({
  username: e.target.value
})
  }

  async handleDeleteAccount () {
    let response = await axios.delete('/api/deleteuser')

  }

  render() {
    console.log(this.state.word);
    console.log(this.state.username)
    let { username, picture /* auth_id*/ } = this.props.user;
    console.log(this.props.user);
    return (
      <div>
        <div className="header">
          <h1 className="logo animated jackInTheBox">
            <i className="fas fa-pencil-alt fa-1x" /> Sketchful{" "}
          </h1>
          <div />
          <div />
          <div className="worddisplay">
            <h4>{this.state.word}</h4>{" "}
          </div>
          <div>
            <button onClick={this.handleRandomWord} className="randombtn">
              Random Word
            </button>
          </div>
          <div className="userinfo">

          <i onClick={this.handleEdit} className="fas fa-user-edit edit"></i>
          {this.state.editing ? <div className='animated fadeInDown fast edit-container'> <input className='usernameinput 'onChange={this.handleUsername} placeholder='change username'></input> 
          <button className='savebtn' onClick={this.handleSave}>Save</button> <button onClick={this.handleDeleteAccount} className='savebtn delete' >Delete Account</button></div>
         
           : null}

            <h5 className='animated pulse username'>{username}</h5>
            <img className="picture animated pulse" src={picture} alt="" />
            <a href="http://localhost:4444/logout">
              <button className="logout">Logout</button>{" "}
            </a>
          </div>
        </div>

        {/* <div className="main-container">
          <Canvas />
          <Chat words={this.state.words} word={this.state.word} />
        </div> */}

        <div className="main">
          <Canvas />

          <Chat words={this.state.words} word={this.state.word} />
        </div>
      </div>
    );
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
