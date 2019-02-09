import React from "react";
import { connect } from "./store";
import IdolList from "./IdolList";
import firebase from "./Firebase";
import { SET_IDOLS } from "./actions";
import { getIdols } from "./IdolModel";

const mapStateToProps = (state, props) => ({
  ...props
});

const mapDispatchToProps = (dispatch, props) => ({
  setIdols: idols => {
    dispatch({
      type: SET_IDOLS,
      payload: idols
    });
  }
});

class IdolManagement extends React.Component {
  componentWillMount() {
    var self = this;
    getIdols(this.props.dispatch)
      .then(res => {
        console.log(res);
        self.props.setIdols(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    if (this.props.user.user_info.is_admin === false) {
      this.props.history.push("/");
    }

    return <IdolList idols={this.props.idols} />;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IdolManagement);
