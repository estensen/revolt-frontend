/*
 *
 * Admin
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import selectAdmin from './selectors';
import styles from './styles.css';
import svgBlog from './blog.svg'
import svgMic from './microphone.svg'
import svgShow from './show.svg'
import AdminOptionButton from 'components/AdminOptionButton';

export class Admin extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.admin}>
        <Link className={styles.titleLink} to={'/admin/blog/new'}>
          <AdminOptionButton name="Nytt blogginnlegg" image={svgBlog} />
        </Link>
        <Link className={styles.titleLink} to={'/admin/episode/new'}>
          <AdminOptionButton name="Ny Episode" image={svgMic} />
        </Link>
        <Link className={styles.titleLink} to={'/admin/show/new'}>
          <AdminOptionButton name="Nytt Show" image={svgShow} />
        </Link>
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
