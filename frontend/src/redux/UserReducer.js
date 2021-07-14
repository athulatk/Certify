import { USER_LOGIN } from './UserActionTypes'

const initialState={
    loggedIn: 'NULL',
    user: 'NULL'
}

const userReducer=(state=initialState, action)=>{

    switch(action.type){
        case USER_LOGIN: return {
            ...state,
            user: action.user
        }
    }
}

export default userReducer;