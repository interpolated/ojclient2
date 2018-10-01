import { SET_ACTIVE_PROJECT, SET_ACTIVE_STAFFMEMBER, SET_ACTIVE_PHASE } from './common_actions'

export function setActiveProject(state='', action){
    switch(action.type){
      case SET_ACTIVE_PROJECT:
        return action.payload
      default:
       return state
    }
  }

  export function setActiveStaffMember(state='', action){
    switch(action.type){
      case SET_ACTIVE_STAFFMEMBER:
        return action.payload
      default:
       return state
    }
  }

  export function setActivePhase(state='', action){
    switch(action.type){
      case SET_ACTIVE_PHASE:
        return action.payload
      default:
       return state
    }
  }