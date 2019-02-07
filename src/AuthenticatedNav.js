import React from 'react';
import {LOGOUT_ACTION} from './actions';
import {connect} from './store';
import {
  withRouter
} from "react-router-dom";
import firebase from './Firebase';

const mapStateToProps = (state, props) => ({
  authenticated: state.authenticated,
  ...props
});

const mapDispatchToProps = (dispatch, props) => ({
  logout: () => {//
    dispatch({
      type: LOGOUT_ACTION,
      payload: {}
    });
    firebase.auth().signOut();
    setTimeout(() => (props.history.push("/")), 100);
  }
});

const AuthenticatedNav = (props) => {//
  return (
    props.authenticated ? (
      <p>
        Welcome {props.user.user_info.firstname} {props.user.user_info.lastname}!
        <button
          onClick={props.logout}
        >
          Sign out
        </button>
      </p>
    ) : (
      <p>You are not logged in.</p>
    )
  )
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthenticatedNav))
