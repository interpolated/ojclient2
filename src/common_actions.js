
 export const SET_ACTIVE_PROJECT = 'SET_ACTIVE_PROJECT'

 export const SET_ACTIVE_STAFFMEMBER = 'SET_ACTIVE_STAFFMEMBER'
 export const SET_ACTIVE_PHASE = 'SET_ACTIVE_PHASE'
 
 export function setActiveProject(projectId){
      return {
        type: SET_ACTIVE_PROJECT,
        payload: projectId
      }
    }
  
  export function setActiveStaffMember(staffMemberId){
      return {
        type: SET_ACTIVE_STAFFMEMBER,
        payload: staffMemberId
      }
    }
  
  export function setActivePhase(phaseId){
      return {
        type: SET_ACTIVE_PHASE,
        payload: phaseId
      }
    }
  