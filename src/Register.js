import React from "react";
import { FETCH_REGION } from "./actions";
import { connect } from "./store";
import firebase from "./Firebase";
import { getRegions } from "./RegionModel";
import { createUser, loginUser } from "./UserModel";
import LoadingOverlay from "react-loading-overlay";

const mapStateToProps = (state, props) => ({
  authenticated: state.authenticated,
  ...state
});

const mapDispatchToProps = (dispatch, props) => ({
  setRegion: regions => {
    dispatch({
      type: FETCH_REGION,
      payload: regions
    });
  }
});

class Register extends React.Component {
  state = {
    redirectToReferrer: false,
    showOverlay: false
  };

  componentDidMount = () => {
    getRegions(this.props.dispatch)
      .then(res => console.log(res))
      .catch(err => {
        console.log(err);
      });
  };

  handleOnChange = e => {
    e.preventDefault(e);
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleOnSubmit = e => {
    e.preventDefault();
    let self = this;

    if (this.state.region === -1) {
      alert("Please select region!");
      return;
    }

    this.setState({showOverlay: true});

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(function(res) {
        let user = res.user;
        let user_info = {
          firstname: self.state.firstname,
          lastname: self.state.lastname,
          region_id: self.state.region,
          firebase_uid: user.uid
        };
        user.user_info = user_info;

        createUser(user_info)
          .then(res => {
            user.user_info = { ...user_info, ...res };
            self.login(user);
          })
          .catch(err => {
            this.setState({showOverlay: false});
            console.log(err);
          });
      })
      .catch(function(error) {
        alert(error.message);
        this.setState({showOverlay: false});
      });
  };

  login = user => {
    this.setState({showOverlay: false});
    loginUser(this.props.dispatch, user);
    this.props.history.push("/");
  };

  render() {
    return (
      <LoadingOverlay active={this.state.showOverlay} spinner text="Registering...">
        <div className="container">
          <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
              <div className="card card-signin my-5 bg-secondary text-white">
                <div className="card-body">
                  <h5 className="card-title text-center"> Register </h5>
                  <form
                    className="form-signin"
                    onSubmit={this.handleOnSubmit}
                    onChange={this.handleOnChange}
                  >
                    <div className="form-label-group">
                      <label htmlFor="firstname"> Firstname </label>
                      <input
                        type="text"
                        id="firstname"
                        name="firstname"
                        className="form-control"
                        placeholder="Firstname"
                        required
                      />
                    </div>
                    <div className="form-label-group">
                      <label htmlFor="lastname"> Lastname </label>
                      <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        className="form-control"
                        placeholder="Lastname"
                        required
                      />
                    </div>
                    <div className="form-label-group">
                      <label htmlFor="email"> Email </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder="Email address"
                        required
                        autoFocus
                      />
                    </div>
                    <div className="form-label-group">
                      <label htmlFor="password"> Password </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-control"
                        placeholder="Password"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="region"> Region </label>
                      <select
                        className="form-control"
                        id="region"
                        name="region"
                        required
                      >
                        <option value=""> --Select Region-- </option>
                        {// this.state.regions.map(item => (
                        //     <option key={item.id} value={item.id}>
                        //     {item.name}
                        //     </option>
                        // ))

                        Object.keys(this.props.regions).map(key => (
                          <option key={key} value={key}>

                            {this.props.regions[key]}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-lg btn-primary btn-block text-uppercase"
                    >
                      Register
                    </button>
                    <a
                      href="login"
                      className="btn btn-lg btn-dark btn-block text-uppercase"
                    >
                      SIGN IN
                    </a>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LoadingOverlay>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
