/*
 *
 * PostAdmin
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectPostAdmin from './selectors';
import styles from './styles.css';

export class PostAdmin extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.postAdmin}>
      </div>
    );
  }
}

const mapStateToProps = selectPostAdmin();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostAdmin);
