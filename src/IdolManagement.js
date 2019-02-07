import React from 'react';
import {connect} from './store';
import IdolList from './IdolList';
import firebase from './Firebase';
import {SET_IDOLS} from './actions';


const mapStateToProps = (state, props) => ({
  ...props
});

const mapDispatchToProps = (dispatch, props) => ({
  setIdols: (idols) => {
    dispatch({
      type: SET_IDOLS,
      payload: idols
    });
  }
});

class IdolManagement extends React.Component {

  componentWillMount(){
    /* Get all regions */
    var self = this;
    firebase
      .firestore()
      .collection("idos")
      .get()
      .then(querySnapshot => {
        let idols = {};
        querySnapshot.forEach((doc, key) => {
          let data = doc.data();
          idols = {...idols,[doc.id]:data};
        });
        self.props.setIdols(idols);
      });

  }

  render() {
    console.log(this.props);
    if(this.props.user.user_info.roles.includes('admin') === false)
    {
      this.props.history.push("/");
    }

    return (
      <IdolList idols={this.props.idols} />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IdolManagement)
