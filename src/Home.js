import React from 'react';
import {connect} from './store';
import {FETCH_REGION} from './actions';
import firebase from './Firebase';
import {Container, Row, Col, Modal, Button, Form, Image} from "react-bootstrap";
import {getRegions} from "./RegionModel";

const mapStateToProps = (state, props) => ({
  regions: state.regions
});

const mapDispatchToProps = (dispatch, props) => ({
  setRegion: (regions) => {
    dispatch({type: FETCH_REGION, payload: regions});
  }
});

class Home extends React.Component {

  componentDidMount(){
      var self = this;
      getRegions().then(res => {
        let regions = {};
        res.forEach((data, key) => {
          regions = { ...regions, [data.id]: data.name };
        });
        self.props.setRegion(regions);
      })
      .catch(err => {
        console.log(err);
      });

  }

  render() {
    return (
      <Container fluid="true">
  <Row variant='primary'>
    <Col>1 of 2</Col>
    <Col>2 of 2</Col>
  </Row>
  <Row>
    <Col>1 of 3</Col>
    <Col>2 of 3</Col>
    <Col>3 of 3</Col>
  </Row>
</Container>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
