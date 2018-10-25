import React from 'react';
import {connect}  from 'react-redux';
import {listAll} from '../../actions/meteorites.js';

const mapStateToProps = (state) => ({
  list: state.meteorites.list,
  loading: state.meteorites.loading,
  error: state.meteorites.error,
});
const mapDispatchToProps = {listAll};

class Details extends React.Component {
  componentDidMount() {
    this.props.listAll();
  }

  render() {
    return (<div>
      <h4>Details</h4>
      <pre>{JSON.stringify(this.props.list, null, 2)}</pre>
    </div>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);
