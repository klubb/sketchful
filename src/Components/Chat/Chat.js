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
      message: ""
    };
    this.socket = io.connect("http://localhost:4444");
  }

  componentDidMount() {
    this.socket.on("chat", message => {
      message.key = JSON.stringify(message);
      this.setState(prevState => {
        let messages = prevState.messages;
        messages.push(message);
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
  };

  handleEnter = e => {
    // e.preventDefault();
    if (e.key === "Enter") {
      this.socket.emit("chat", {
        name: this.props.user.username,
        message: this.state.message,
        timestamp: new Date().toISOString()
      });
      this.setState({
        message: ""
      });
    }
  };

  // handleGuess = () => {

  //   if(this.state.message === this.state.word) {
  //     console.log('you guessed it')
  //   }
  // }

  render() {
    let words = this.props.words;
    for (let i = 0; i < words.length; i++) {
      if (this.state.message === this.props.words[i]) {
        console.log("correct");
      }
    }

    return (
      <div className="chat">
        <Messages messages={this.state.messages} />

        <textarea
          value={this.state.message}
          onKeyPress={this.handleEnter}
          onChange={this.updateMessage}
          className="message"
          placeholder="Type a message..."
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
