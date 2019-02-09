import React from "react";
import { connect } from "./store";
import { FETCH_REGION } from "./actions";
import firebase from "./Firebase";
import { Container, Row, Col, Jumbotron, Table, Button } from "react-bootstrap";
import { getRegions } from "./RegionModel";
import RankingTable from "./RankingTable";

const mapStateToProps = (state, props) => ({
  regions: state.regions,
  ...props
});

const mapDispatchToProps = (dispatch, props) => ({
  setRegion: regions => {
    dispatch({ type: FETCH_REGION, payload: regions });
  }
});

class Home extends React.Component {
  componentDidMount() {
    getRegions(this.props.dispatch).catch(err => {
      console.log(err);
    });
  }

  render() {
    return (
      <Container fluid="true">
        <Row>
          <Col>
            <RankingTable />
          </Col>
          <Col>
            <Jumbotron fluid>
              <Container>
                <h1>Fluid jumbotron</h1>
                <p>
                  This is a modified jumbotron that occupies the entire
                  horizontal space of its parent.
                </p>
              </Container>
            </Jumbotron>
          </Col>
          <Col>
            <Jumbotron fluid>
              <Container>
                <h1>Fluid jumbotron</h1>
                <p>
                  This is a modified jumbotron that occupies the entire
                  horizontal space of its parent.
                </p>
              </Container>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
