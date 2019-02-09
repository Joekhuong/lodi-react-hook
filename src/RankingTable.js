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

class RankingTable extends React.Component {

  state = {
    select_region: -1,
    onLoading: false
  }

  componentDidMount() {}

  handleOnChange = (e) => {
    e.preventDefault(e);
    this.setState({
      select_region: e.target.value,
      onLoading: true
    });

    setTimeout(() => (this.setState({onLoading: false})), 5000);

  }

  render() {
    return (
      <Container fluid="true">
        <Row className="">
          <h1 className="d-block">Ranking Table</h1>
          <Form.Control name="select_region" disabled={this.state.onLoading} value={this.state.select_region} onChange={this.handleOnChange} as="select">
            <option value="-1">All region</option>
            {Object.keys(this.props.regions).map((item, index) => {
              return (
                <option value={this.props.regions[item].id}>
                  {this.props.regions[item]}
                </option>
              );
            })}
          </Form.Control>
          <Table responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Table heading</th>
              </tr>
            </thead>
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
)(RankingTable);
