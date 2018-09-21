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
      words: ["cat", "dog", "sun", "cup", "pie", "bug", "snake", "tree", "fire", 'banana', 'cave', 'apple', 'rainbow', 'computer', 'mouse', 'car', 'train', 'chair', 'stop sign', 'mountain'],
      word: ''
    };
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
    })
  };

  render() {
    
    console.log(this.state.word)

    let { username, picture /* auth_id*/ } = this.props.user;
    console.log(this.props.user);
    return (
      <div>
        <div className="header">
          <h1 className="logo">
            <i className="fas fa-pencil-alt fa-1x" /> Sketchful{" "}
          </h1>
          <div />
          <div />
          <div className='worddisplay'><h4>{this.state.word}</h4> </div>
          <div>
            <button onClick={this.handleRandomWord} className="randombtn">
              Random Word
            </button>
          </div>
          <div className="userinfo">
            <h5>{username}</h5>
            <img className="picture" src={picture} alt="" />
            <a href="http://localhost:4444/logout">
              <button className="logout">Logout</button>{" "}
            </a>
          </div>
        </div>

        <div className="main-container">
        
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
