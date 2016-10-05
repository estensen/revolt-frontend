/*
 *
 * Admin
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import selectAdmin from './selectors';
import AdminOptionButton from 'components/AdminOptionButton';

export class Admin extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
      Hello world!
        <AdminOptionButton name="AdminOptionButton" />
      </div>
    );
  }
}

const mapStateToProps = selectAdmin();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
