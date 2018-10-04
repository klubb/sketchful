import React, { Component } from 'react';
import {Background, Heading, Tech, List,} from '../styles/aboutStyles'



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