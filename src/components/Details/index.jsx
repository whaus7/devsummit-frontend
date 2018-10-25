import React from 'react';
import {connect}  from 'react-redux';
import {getById} from '../../actions/details.js';

const mapStateToProps = (state) => ({
  meteorite: state.details.meteorite,
  loading: state.details.loading,
});
const mapDispatchToProps = {getById};

class Details extends React.Component {
  componentDidMount() {
    const meteoriteId = this.props.match.params.meteoriteId;
    if (this.props.meteorite.nasaId !== meteoriteId) this.props.getById(meteoriteId);
  }

  render() {
    return (<div>
      <h4>Details</h4>
      <pre>{JSON.stringify(this.props.meteorite, null, 2)}</pre>
    </div>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);
