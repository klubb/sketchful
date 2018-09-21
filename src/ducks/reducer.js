


const initialState = {
    user: {},
    messages: []
}

const GET_USER_DATA = 'GET_USER_DATA'
const GET_MESSAGES = 'GET_MESSAGES'

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_USER_DATA:
            return Object.assign({}, state, {user: action.payload})

        case GET_MESSAGES:
            return Object.assign({}, state, {messages: action.payload})

        default: 
            return state
    }
}

export function getUserData(data) {
    return {
        type: GET_USER_DATA,
        payload: data
    }
}

export function getMessage(messages){
    return {
        type: GET_MESSAGES,
        payload: messages
    }
}