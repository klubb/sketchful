import React, { Component } from 'react';
import './Chat.css'


class Chat extends Component {
    state = {  }
    render() { 
        return ( <div className='chat'>
            <div className="typemessage">
            <input className='message' placeholder='Type a message...' type="text"/>
            </div>
        </div> );
    }
}
 
export default Chat;