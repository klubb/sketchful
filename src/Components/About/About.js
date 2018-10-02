import React, { Component } from 'react';
import styled from 'styled-components'


const Background = styled.div `
background-repeat: no-repeat;
  background-color: #4ab5ff;
  height: 100vh;
  width: 100vw;
  // overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
 
  background-position: center;
  background-size: 98vh;
`

const Heading = styled.h1 `
    color: white;
    font-family: Quicksand;
    font-size: 100px;
    margin-top: 120px;
`

const Tech = styled.h1 `
color: white;
font-family: Quicksand;
font-size: 50px;
`
const List = styled.h1 `
margin: 20px;
display: flex;
font-size: 30px;
color: white;
font-family: Quicksand;
`
class About extends Component {
    state = {  }


    render() { 
        return ( <div>
            <Background>
                <Heading className='animated fadeInDown'> {`<THIS IS THE ABOUT PAGE>`} </Heading>
                <Tech className='animated fadeInRight'> Technologies Used  </Tech>
                <i className="fas fa-chevron-circle-down chevron fa-2x animated fadeIn"></i>
                <List className='animated fadeIn slower'> 
                    <li>React</li>
                    <hr/>
                    <li>Socket.io</li>
                    <hr/>
                    <li>Redux</li>
                    <hr/>
                    <li>Auth0</li>
                    <hr/>
                    <li>Express</li>
                    <hr/>
                    <li>Massive</li>
                    <hr/>
                    <li>React Router</li>

                </List>

            </Background>
        </div> );
    }
}
 
export default About;