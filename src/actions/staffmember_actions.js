import reduxCrud from 'redux-crud';
import {merge} from 'ramda';
import cuid      from 'cuid';
import Axios from 'axios';

const baseActionCreators = reduxCrud.actionCreatorsFor('staffMembers');

let actionCreators = {

  fetchOne(id) {
    return function(dispatch) {
      const action = baseActionCreators.fetchStart();
      dispatch(action);

      // send the request
      const url = `oj/staffMembers/${id}`;
      const promise = Axios({
        url: url,
        method: 'GET'
      });

      promise.then(function(response) {
          const staffMember = response.data.data;
          const action = baseActionCreators.fetchSuccess(staffMember);
          dispatch(action);
        }, function(response) {
          // dispatch the error action
          // first param is the error
          const action = baseActionCreators.fetchError(response);
          dispatch(action);
        }).catch(function(err) {
          console.error(err.toString());
        });

      return promise;
    }
  },

  fetch(page, limit, replaceExisting) {
    return function(dispatch) {
      const action = baseActionCreators.fetchStart();
      dispatch(action);

      // send the request
      // e.g. oj/staffMembers?page=1&limit=20
      const url = `oj/staffMembers`;
      const promise = Axios({
        url: url,
        method: 'GET',
        data: {
          page: page,
          limit : limit
        }
      });

      promise.then(function(response) {
          const staffMembers = response.data.data;
          const action = baseActionCreators.fetchSuccess(staffMembers, {replace: replaceExisting});
          dispatch(action);
        }, function(response) {
          // dispatch the error action
          // first param is the error
          const action = baseActionCreators.fetchError(response);
          dispatch(action);
        }).catch(function(err) {
          console.error(err.toString());
        });

      return promise;
    }
  },

  create(staffMember) {
    return function(dispatch) {
      // Generate a cid so we can match the records
      var cid = cuid();
      staffMember = staffMember.merge({id: cid});

      // optimistic creation
      const action = baseActionCreators.createStart(staffMember);
      dispatch(action);

      // send the request
      const url = `oj/staffMembers/`;
      const promise = Axios({
        url: url,
        method: 'POST',
        data: {
          staffMember
        }
      });

      promise.then(function(response) {
          const returnedstaffMember = response.data.data;
          const action = baseActionCreators.createSuccess(returnedstaffMember, cid);
          dispatch(action);
        }, function(response) {
          const action = baseActionCreators.createError(response, staffMember);
          dispatch(action);
        }).catch(function(err) {
          console.error(err.toString());
        });

      return promise;
    }
  },

  update(staffMember) {
    return function(dispatch) {
      // optimistic update
      const action = baseActionCreators.updateStart(staffMember);
      dispatch(action);

      // send the request
      const url = `oj/staffMembers/${staffMember.id}`;
      const promise = Axios({
        url: url,
        method: 'PATCH',
        data: {
          staffMember
        }
      });

      promise.then(function(response) {
          const returnedstaffMember = response.data.data;
          const action = baseActionCreators.updateSuccess(returnedstaffMember);
          dispatch(action);
        }, function(response) {
          const action = baseActionCreators.updateError(response, staffMember);
          dispatch(action);
        }).catch(function(err) {
          console.error(err.toString());
        });

      return promise;
    }
  },

  delete(staffMember) {
    return function(dispatch) {
      // optimistic delete
      const action = baseActionCreators.deleteStart(staffMember);
      dispatch(action);

      // send the request
      const url = `oj/staffMembers/${staffMember.id}`;
      const promise = Axios({
        url: url,
        method: 'DELETE'
      });

      promise.then(function(response) {
          const returnedstaffMember = response.data.data;
          const action = baseActionCreators.deleteSuccess(returnedstaffMember);
          dispatch(action);
        }, function(response) {
          const action = baseActionCreators.deleteError(response, staffMember);
          dispatch(action);
        }).catch(function(err) {
          console.error(err.toString());
        });

      return promise;
    }
  },

}

actionCreators = merge(baseActionCreators, actionCreators);

export default actionCreators;