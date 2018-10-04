import React, { Component } from "react";
import "./Chat.css";
import io from "socket.io-client";
import { getUserData } from "../../ducks/reducer";
import { connect } from "react-redux";
import Messages from "../Messages/Messages";
import axios from "axios";
import styled from "styled-components";

const Typing = styled.p`
font-family: Quicksand;
font-size: 12px;
float: left;
`;



class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // typing: "",
      // words: ["cat", "dog", "sun", "cup", "pie", "bug", "snake", "tree"],
      messages: [],
      message: "",
      correct: "",
      typing: false,
      timeout: undefined
    };
    
    this.handleEnter = this.handleEnter.bind(this);
  }

  componentDidMount() {
    this.socket = io.connect(process.env.REACT_APP_SERVERADDRESS);

    this.socket.emit("join room", {
      room: this.props.value
    });

    this.socket.on("typing", this.userTyping);

    this.socket.on("chat", msg => {
      console.log("test");
      let messages = this.state.messages;
      messages.push(msg);
      this.setState({
        messages: messages
      });
    });
  }

  componentWillUnmount() {
    this.socket.close();
  }

  updateMessage = e => {
    this.setState({
      message: e.target.value
    });
    this.socket.emit("typing", {
      user: this.props.user.username,
      room: this.props.value
    });
  };

  async handleEnter(e) {
    if (this.state.message) {
      if (e.key === "Enter")  {
        this.socket.emit("chat", {
          name: this.props.user.username,
          message: this.state.message,
          timestamp: new Date().toISOString(),
          room: this.props.value
          
        });
        e.preventDefault()
        this.setState({
          message: ""
        });
        

        const response = await axios.post(`/api/create`, {
          message: this.state.message
        });
        this.props.getUserData(response);

        let words = this.props.words;
        for (let i = 0; i < words.length; i++) {
          if (this.state.message === this.props.word) {
            this.setState({
              correct: "Correct!"
            });
          }
        }
      }
    }
  }

  handleClick = () => {
    console.log("clicked");
  };

  userTyping = user => {
    this.setState({
      typing: `${user} is typing...`
    });
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.setState({ typing: "" });
    }, 1000);
  };

  delete = () => {
    this.setState({
      messages: []
    })
  }
  render() {
    console.log(this.state.message);
    console.log(this.state.messages)
    return (
      
      <div className="chat">
        <Messages
          delete={this.delete}
          messages={this.state.messages}
          user={this.props.user.username}
        />
        <Typing>{this.state.typing}</Typing>
        <p>{this.props.joined}</p>
        <div className='sep'>
        <textarea
          value={this.state.message}
          onKeyPress={this.handleEnter}
          
          onChange={this.updateMessage}
          className="message"
          placeholder="Type a message... "
          type="text"
          
        />
        <span onClick={this.handleEnter} id='sendicon' className="fas fa-chevron-circle-right sendicon fa-2x"></span>
        
        </div>
        
      </div>
      
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    id: state.id
  };
}

export default connect(
  mapStateToProps,
  { getUserData }
)(Chat);
