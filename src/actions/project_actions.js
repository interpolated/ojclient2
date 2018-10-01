import reduxCrud from 'redux-crud';
import {merge}     from 'ramda';
import cuid      from 'cuid';
import Axios from 'axios';

const baseActionCreators = reduxCrud.actionCreatorsFor('projects');

let actionCreators = {

  fetchOne(id) {
    return function(dispatch) {
      const action = baseActionCreators.fetchStart();
      dispatch(action);

      // send the request
      const url = `http://labs.cox.com.au/olayout/oj/projects/${id}`;
      const promise = Axios({
        url: url,
        method: 'GET'
      });

      promise.then(function(response) {
          const project = response.data;
          const action = baseActionCreators.fetchSuccess(project);
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
      // e.g. oj/projects?page=1&limit=20
      const url = `oj/projects`;
      const promise = Axios({
        url: url,
        method: 'GET',
        data: {
          page: page,
          limit : limit
        }
      });

      promise.then(function(response) {
          const projects = response.data.data;
          const action = baseActionCreators.fetchSuccess(projects, {replace: replaceExisting});
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

  create(project) {
    return function(dispatch) {
      // Generate a cid so we can match the records
      var cid = cuid();
      project = project.merge({id: cid});

      // optimistic creation
      const action = baseActionCreators.createStart(project);
      dispatch(action);

      // send the request
      const url = `oj/projects/`;
      const promise = Axios({
        url: url,
        method: 'POST',
        data: {
          project
        }
      });

      promise.then(function(response) {
          const returnedproject = response.data.data;
          const action = baseActionCreators.createSuccess(returnedproject, cid);
          dispatch(action);
        }, function(response) {
          const action = baseActionCreators.createError(response, project);
          dispatch(action);
        }).catch(function(err) {
          console.error(err.toString());
        });

      return promise;
    }
  },

  update(project) {
    return function(dispatch) {
      // optimistic update
      const action = baseActionCreators.updateStart(project);
      dispatch(action);

      // send the request
      const url = `oj/projects/${project.id}`;
      const promise = Axios({
        url: url,
        method: 'PATCH',
        data: {
          project
        }
      });

      promise.then(function(response) {
          const returnedproject = response.data.data;
          const action = baseActionCreators.updateSuccess(returnedproject);
          dispatch(action);
        }, function(response) {
          const action = baseActionCreators.updateError(response, project);
          dispatch(action);
        }).catch(function(err) {
          console.error(err.toString());
        });

      return promise;
    }
  },

  delete(project) {
    return function(dispatch) {
      // optimistic delete
      const action = baseActionCreators.deleteStart(project);
      dispatch(action);

      // send the request
      const url = `oj/projects/${project.id}`;
      const promise = Axios({
        url: url,
        method: 'DELETE'
      });

      promise.then(function(response) {
          const returnedproject = response.data.data;
          const action = baseActionCreators.deleteSuccess(returnedproject);
          dispatch(action);
        }, function(response) {
          const action = baseActionCreators.deleteError(response, project);
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