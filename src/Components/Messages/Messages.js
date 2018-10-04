import React, { Component } from "react";
import Modal from 'react-responsive-modal'
import axios from 'axios'
import styled from 'styled-components'



const User = styled.h4 `
color: black;
margin: 10px;
font-family: Quicksand;

`

const Message = styled.p `
color: white;
font-family: Quicksand;
`
const Container = styled.div `
display: flex;
align-items: center;
background-color: #4ab5ff;
border-radius: 5px;
margin: 6px;
width: 600px;

`

const Button = styled.button `
cursor: pointer;
width: 180px;
// height: 55px;

color: black;
background: transparent;
border: solid 1px black;
// box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
// border-radius: 5px;
font-size: 30px;
font-family: "Quicksand";
&:hover {
  background: white;
  color: black;
  transition: all 0.4s ease 0s;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
`
class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openMessage: '',
      open: false,
      editing: false,
      messages: [],
      
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
    let res = response.data.map((item, i) => {

      return (
        
      <Container key={i}>
        <User>{item.username}: </User> <Message>{item.message}</Message>
      </Container>
      
      )
      
    })
    
      this.setState({
        openMessage: res
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


  
handleDelete = () => {
  axios.delete('/api/deleteMessage').then((res) => {
    this.onCloseModal()
    this.props.delete()
  })
  
}

 

  render() {
  //  console.log(this.state.messages)
    

    console.log(this.state.openMessage)
    
    const {open} = this.state
    let displayMessage = this.props.messages.map(message => {
      return (
        <div key={message.key}>
          <ul>
            {this.props.user === message.name ? (
              <div>
                {" "}
                <li className="me start animated fadeInUp faster">
                
                  <li onClick={this.onOpenModal} className="name">{message.name}:</li>

                  {message.message}
                  
                  
                </li>
                <Modal showCloseIcon={false} open={open} onClose={this.onCloseModal}  >
                <span>{this.state.openMessage}</span>
               {this.state.openMessage.length >= 1 ? <Button onClick={this.handleDelete}>Delete</Button> : <Button>Nothing to delete</Button> }
                
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
