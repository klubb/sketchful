import React, { Component } from "react";
import "./Chat.css";
import io from "socket.io-client";
import { getUserData } from "../../ducks/reducer";
import { connect } from "react-redux";
import Messages from "../Messages/Messages";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // words: ["cat", "dog", "sun", "cup", "pie", "bug", "snake", "tree"],
      messages: [],
      message: "",
      correct: '',
      typing: false,
      timeout: undefined,
      
    };
    this.socket = io.connect("http://localhost:4444");
  }

  
  componentDidMount() {
    this.socket.on("chat", msg => {
      let messages = this.state.messages
      messages.push(msg)
      this.setState({
        messages: messages 
      })
      
    });
  }

  componentWillUnmount() {
    this.socket.close();
  }

  updateMessage = e => {
    this.setState({
      message: e.target.value
    });
  };

  handleEnter = e => {
    
    if(this.state.message) {
    if (e.key === "Enter" ) {
      this.socket.emit("chat", {
        name: this.props.user.username,
        message: this.state.message,
        timestamp: new Date().toISOString()
      });
      this.setState({
        message: ""
      });

      let words = this.props.words;
      for (let i = 0; i < words.length; i++) {
        if (this.state.message === this.props.word) {
          this.setState({
            correct: 'Correct!'
          })
        }
      }
      
    }
  }
  };


   
  

  render() {


    return (
      
      <div className="chat">
        <Messages  messages={this.state.messages} user={this.props.user.username}/>
        <p>{this.state.correct}</p>

        

        <textarea
          value={this.state.message}
          onKeyPress={this.handleEnter}
          onChange={this.updateMessage}
          className="message"
          placeholder="Type a message... "
          type="text"
        />

        
        
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
)(Chat);
