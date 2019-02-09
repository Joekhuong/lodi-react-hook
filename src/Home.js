import React from "react";
import { connect } from "./store";
import { FETCH_REGION } from "./actions";
import firebase from "./Firebase";
import { Container, Row, Col, Form, Table, Button } from "react-bootstrap";
import { getRegions } from "./RegionModel";
import RankingTable from "./RankingTable";
import FollowedIdolTable from "./FollowedIdolTable";

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
      <Container>
        <Row className="mt-2">
          <Col className="d-none d-lg-block d-xl-block border border-primary">
            <RankingTable />
          </Col>

          <Col lg="8">
            <Container>
              <Row className="">
                <Col>
                  <Form>
                    <Form.Group controlId="">
                      <Form.Control as="textarea" placeholder="What you want to post?" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Post
                    </Button>
                  </Form>
                  <hr/>
                </Col>
              </Row>
            </Container>
          </Col>

          <Col className="d-none d-lg-block d-xl-block border border-warning">
            <FollowedIdolTable />
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
