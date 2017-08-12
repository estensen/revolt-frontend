/*
 *
 * Categories
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectCategories from './selectors';

export class Categories extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return <div />;
  }
}

const mapStateToProps = selectCategories();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
