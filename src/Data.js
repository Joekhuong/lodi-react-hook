import React from 'react';
import {connect} from './store';

const mapStateToProps = (state, props) => ({
  message: `${state.data}`
});

const mapDispatchToProps = (dispatch) => ({
  get: () => console.log('ssss'),
});

const Data = (props) => {
  return (
    <div>
      {props.message}
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Data);
