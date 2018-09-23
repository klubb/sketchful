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
          {
            
            this.props.user === message.name ? <div>  <li className="me start animated fadeInUp faster"><li className='name'>{message.name}</li>{message.message}</li></div> : <div> <li className="him start animated fadeInUp faster"><li className='name'>{message.name}</li>{message.message}</li></div>
          }

            

            

            
           
            
          </ul>
        </div>
      );
    });
    return <div>{displayMessage}</div>;
  }
}


export default Messages;
