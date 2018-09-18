import React, { Component } from 'react';
import './Dashboard.css'

import axios from 'axios'
import {getUserData} from '../../ducks/reducer'
import {connect } from 'react-redux'
import Chat from '../Chat/Chat'
import Canvas from '../Canvas/Canvas'


class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    async componentDidMount() {
        let res = await axios.get('/api/user-data')
        this.props.getUserData(res.data)
    }

    render() { 
        let {username, picture, /* auth_id*/} = this.props.user 
        console.log(this.props.user)
        return ( <div>
            <div className="header">
            <h1 className='logo'>Sketchful</h1>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div className="userinfo">
            <h5>{username}</h5>
            <img className='picture'src={picture} alt=""/>
            <a href='http://localhost:4444/logout'>
        <button className='logout'>Logout</button> </a>
            </div>
            </div>

            <div className="main-container">
            <Canvas />
            <Chat />
            </div>

        </div> );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}
 
export default connect(mapStateToProps, {getUserData})(Dashboard);