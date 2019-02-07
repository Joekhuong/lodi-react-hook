import React from 'react';
import {LOGOUT_ACTION} from './actions';
import {connect} from './store';
import {
  withRouter
} from "react-router-dom";

const mapStateToProps = (state, props) => ({
  authenticated: state.authenticated
});

const mapDispatchToProps = (dispatch, props) => ({
  logout: () => {
    dispatch({
      type: LOGOUT_ACTION,
      payload: {}
    });
    setTimeout(() => props.history.push("/"), 100);
  }
});

const AuthButton = (props) => {
  return (
    props.authenticated ? (
      <p>
        Welcome!{" "}
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
)(AuthButton))
