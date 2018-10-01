import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import projectActionCreators from '../actions/project_actions'
import staffMemberActionCreators from '../actions/staffmember_actions'
import {setActiveProject,setActiveStaffMember, setActivePhase} from '../common_actions'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

function Selector(props) {
  console.log(projectActionCreators)
  return (
    <React.Fragment>
      <Typography variant="title" gutterBottom>
        Selector
      </Typography>
      <Grid container spacing={24}>
        <Grid item xs={12} >
          <TextField
            required
            id="projects"
            name="projects"
            label="Select a project"
            onChange = {e=>{
                console.log(e.target.value)
                props.fetchProject(e.target.value)
                props.setActivePhase(''),
                props.setActiveProject(e.target.value)}
                }
            // fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="staffmembers"
            name="staffmembers"
            label="find staff"
            // fullWidth
          />
        </Grid>
        </Grid>
    </React.Fragment>
  );
}

const mapStateToProps = ( {activeStaffMember,activeProject} ) => {
  return {
    activeStaffMember,activeProject
  }
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setActiveProject,
    setActivePhase,
    fetchProject:projectActionCreators.fetchOne,
    fetchStaff:staffMemberActionCreators.fetchOne
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Selector);
