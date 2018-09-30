import React, { Component } from "react";
import Modal from 'react-responsive-modal'
import axios from 'axios'
import {connect} from 'react-redux'

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openMessage: '',
      open: false,
      editing: false,
      messages: []
    };

    // this.onOpenModal = this.onOpenModal.bind(this)
  }

componentDidMount () {
  axios.get(`/api/getMessage`).then((response) => {
    this.setState({
      messages: response.data
    })
  })
  
}

 onOpenModal = () => {
   
    axios.get(`/api/getMessage`).then((response) => {
      console.log(response.data)
    //  console.log(id)
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


  
handleDelete = (id) => {
  axios.delete(`/api/delete/${id}`).then(() => {
    this.onCloseModal()
  })
}

 

  render() {
  //  console.log(this.state.messages)
    

    
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
                  <i onClick={() => this.onOpenModal(message.id)} className="fas fa-ellipsis-h setting"></i>
                  
                </li>
                <Modal showCloseIcon={false} open={open} onClose={this.onCloseModal} >
                <span>{this.state.openMessage}</span>
               
                <button onClick={this.handleDelete}>Delete</button>
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

function mapStateToProps({id}) {
  return {
    id
  }
}

export default Messages;
