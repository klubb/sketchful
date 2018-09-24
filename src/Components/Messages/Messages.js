import React, { Component } from "react";
import Modal from 'react-responsive-modal'
import axios from 'axios'

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openMessage: '',
      open: false,
      editing: false
    };

    // this.onOpenModal = this.onOpenModal.bind(this)
  }

 onOpenModal = () => {
   
    axios.get(`/api/getMessage`).then((response) => {
      console.log(response.data)
      this.setState({
        openMessage: response.data[0].message
      })
    })
    
    this.setState({
      open: true
    })
  }

  onCloseModal = () => {
    this.setState({
      open: false
    })
  }


  


 

  render() {
    // console.log(this.state.openMessage)
    
    const {open} = this.state
    let displayMessage = this.props.messages.map(message => {
      return (
        <div key={message.key}>
          <ul>
            {this.props.user === message.name ? (
              <div>
                {" "}
                <li className="me start animated fadeInUp faster">
                
                  <li className="name">{message.name}:</li>

                  {message.message}
                  <i onClick={this.onOpenModal} className="fas fa-ellipsis-h setting"></i>
                  
                </li>
                <Modal open={open} onClose={this.onCloseModal} >
                <input value={this.state.openMessage} type="text"/>
                <button>Save</button> 
                <button>Delete</button>
                </Modal>
               
              </div>
            ) : (
              <div>
                {" "}
                <li className="him start animated fadeInUp faster">
                  <li className="name">{message.name}:</li>
                  {message.message}
                </li>
              </div>
            )}
          </ul>
        </div>
      );
    });
    return (
      <div className="messages">
        {displayMessage}
      </div>
    );
  }
}

export default Messages;
