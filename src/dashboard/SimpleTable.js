import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import projectActionCreators from '../actions/project_actions'
import staffMemberActionCreators from '../actions/staffmember_actions'
import {setActiveProject,setActivePhase} from '../common_actions'
import { getActivePhases } from './selectors';

const styles = {
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
};


let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const data = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function SimpleTable(props) {
  const { classes } = props;

  function logger (e)  {
    console.log(e.target.id)
    props.setActivePhase(e.target.id)
  }

  console.log(props.phases)
  if (props.phases == 'no project selected'){
    return <div>
      -----
    </div>
  }else{
  
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Phase Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.phases.map(n => {
            return (
              <TableRow>  
                <TableCell onClick = {logger} component="th" scope="row" id={n.phaseName}>
                  {n.phaseName}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );}
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapStateToProps = (state ) => {
  return {
    phases:getActivePhases(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setActivePhase,
    setActiveProject,
    fetchProject:projectActionCreators.fetchOne,
    fetchStaff:staffMemberActionCreators.fetchOne
  }, dispatch)
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(SimpleTable));
