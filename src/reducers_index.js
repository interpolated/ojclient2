import {combineReducers} from 'redux';
import reduxCrud from 'redux-crud';
import { Button } from '@material-ui/core';
import { setActiveStaffMember, setActiveProject,setActivePhase } from './common_reducers';
//import all reducers!

const rootReducer = combineReducers(
      {
        staffMembers:   reduxCrud.Map.reducersFor('staffmembers'),
        projects:       reduxCrud.Map.reducersFor('projects'),
        allocations:    reduxCrud.Map.reducersFor('allocations'),
        activeStaffMember: setActiveStaffMember,
        activeProject: setActiveProject,
        activePhase: setActivePhase
      }
  );

export default rootReducer;

