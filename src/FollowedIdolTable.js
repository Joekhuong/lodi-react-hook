import React from "react";
import { connect } from "./store";
import { FETCH_REGION } from "./actions";
import { Container, Row, Col, Jumbotron, Table, Form } from "react-bootstrap";
import { getRegions } from "./RegionModel";

const mapStateToProps = (state, props) => ({
  regions: state.regions,
  ...props
});

const mapDispatchToProps = (dispatch, props) => ({});

class FollowedIdolTable extends React.Component {

  state = {
    select_region: -1,
    onLoading: false
  }

  componentDidMount() {}

  render() {
    return (
      <Container fluid="true">
        <Row className="">
          <h1 className="d-block">Your idols</h1>
          <Table responsive>
            <tbody>
              <tr>
                <td>1</td>
                <td>Table cell</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Table cell</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Table cell</td>
              </tr>
            </tbody>
          </Table>
        </Row>
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FollowedIdolTable);
