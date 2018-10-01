import reduxCrud from 'redux-crud';
import {merge}  from 'ramda';
import cuid      from 'cuid';
import Axios from 'axios';

const baseActionCreators = reduxCrud.actionCreatorsFor('allocations');

let actionCreators = {

  fetchOne(id) {
    return function(dispatch) {
      const action = baseActionCreators.fetchStart();
      dispatch(action);

      // send the request
      const url = `oj/allocations/${id}`;
      const promise = Axios({
        url: url,
        method: 'GET'
      });

      promise.then(function(response) {
          const allocation = response.data.data;
          const action = baseActionCreators.fetchSuccess(allocation);
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
      // e.g. oj/allocations?page=1&limit=20
      const url = `oj/allocations`;
      const promise = Axios({
        url: url,
        method: 'GET',
        data: {
          page: page,
          limit : limit
        }
      });

      promise.then(function(response) {
          const allocations = response.data.data;
          const action = baseActionCreators.fetchSuccess(allocations, {replace: replaceExisting});
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

  create(allocation) {
    return function(dispatch) {
      // Generate a cid so we can match the records
      var cid = cuid();
      allocation = allocation.merge({id: cid});

      // optimistic creation
      const action = baseActionCreators.createStart(allocation);
      dispatch(action);

      // send the request
      const url = `oj/allocations/`;
      const promise = Axios({
        url: url,
        method: 'POST',
        data: {
          allocation
        }
      });

      promise.then(function(response) {
          const returnedallocation = response.data.data;
          const action = baseActionCreators.createSuccess(returnedallocation, cid);
          dispatch(action);
        }, function(response) {
          const action = baseActionCreators.createError(response, allocation);
          dispatch(action);
        }).catch(function(err) {
          console.error(err.toString());
        });

      return promise;
    }
  },

  update(allocation) {
    return function(dispatch) {
      // optimistic update
      const action = baseActionCreators.updateStart(allocation);
      dispatch(action);

      // send the request
      const url = `oj/allocations/${allocation.id}`;
      const promise = Axios({
        url: url,
        method: 'PATCH',
        data: {
          allocation
        }
      });

      promise.then(function(response) {
          const returnedallocation = response.data.data;
          const action = baseActionCreators.updateSuccess(returnedallocation);
          dispatch(action);
        }, function(response) {
          const action = baseActionCreators.updateError(response, allocation);
          dispatch(action);
        }).catch(function(err) {
          console.error(err.toString());
        });

      return promise;
    }
  },

  delete(allocation) {
    return function(dispatch) {
      // optimistic delete
      const action = baseActionCreators.deleteStart(allocation);
      dispatch(action);

      // send the request
      const url = `oj/allocations/${allocation.id}`;
      const promise = Axios({
        url: url,
        method: 'DELETE'
      });

      promise.then(function(response) {
          const returnedallocation = response.data.data;
          const action = baseActionCreators.deleteSuccess(returnedallocation);
          dispatch(action);
        }, function(response) {
          const action = baseActionCreators.deleteError(response, allocation);
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