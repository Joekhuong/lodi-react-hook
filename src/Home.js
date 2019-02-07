import React from 'react';
import {connect} from './store';
import {FETCH_REGION} from './actions';
import firebase from './Firebase';


const mapStateToProps = (state, props) => ({
  regions: state.regions
});

const mapDispatchToProps = (dispatch, props) => ({
  setRegion: (regions) => {
    dispatch({type: FETCH_REGION, payload: regions});
  }
});

class Home extends React.Component {

  componentWillMount(){
    /* Get all regions */
    var self = this;
    firebase
      .firestore()
      .collection("regions")
      .get()
      .then(querySnapshot => {
        let regions = {};
        querySnapshot.forEach((doc, key) => {
          let data = doc.data();
          regions = {...regions,[doc.id]:data.name};
        });
        self.props.setRegion(regions);
      });

  }

  render() {
    console.log(this.props.regions);
    return (
      <ul className="list-group">
        {
          Object.keys(this.props.regions).map((item, index) => (<li className="list-group list-group-item" key={index} value={item}>{this.props.regions[item]}</li>))
        }
      </ul>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
