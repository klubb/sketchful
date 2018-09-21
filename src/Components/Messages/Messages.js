import React, { Component } from 'react';



class Messages extends Component {
    constructor(props) {
        super(props)
    }

    
  
    render() { 
        
        let displayMessage = this.props.messages.map((message) => {
            return <div key={message.key}>
                 <p>{message.name}: {message.message}</p>
                 
                 <hr/>
                 
            </div>
        })
        return ( 
            <div>
           {displayMessage}
            </div>
         );
    }
}
 
export default Messages;