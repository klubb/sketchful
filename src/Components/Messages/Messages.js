import React, { Component } from "react";

class Messages extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let displayMessage = this.props.messages.map(message => {
      return (
        <div key={message.key}>
          
          <ul>
          
            <li className="him start">{message.name}: {message.message}</li>
            
           
            {/* <li class="me end">By this User, fourth message</li> */}
          </ul>
        </div>
      );
    });
    return <div>{displayMessage}</div>;
  }
}

export default Messages;
