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

const SubHeading = styled.h1 `
color: white;
font-family: Quicksand;
font-size: 50px;
`
class Contact extends Component {
    state = {  }
    render() { 
        return (
            <div>

                <Background>
                    {/* <Heading>{`<LINKS HERE>`}</Heading> */}
                    <SubHeading> Nothing Here Yet... </SubHeading>
                 </Background>
            </div>
          );
    }
}
 
export default Contact;