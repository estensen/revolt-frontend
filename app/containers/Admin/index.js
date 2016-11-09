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
import svgBlog from './blog.svg';
import svgMic from './microphone.svg';
import svgShow from './show.svg';
import AdminOptionButton from 'components/AdminOptionButton';

export class Admin extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.admin}>
        <div className={styles.adminRow}>
          <Link className={styles.titleLink} to={'/admin/post/ny'}>
            <AdminOptionButton name="Nytt Blogginnlegg" image={svgBlog} />
          </Link>
          <Link className={styles.titleLink} to={'/admin/episoder/ny'}>
            <AdminOptionButton name="Ny Episode" image={svgMic} />
          </Link>
          <Link className={styles.titleLink} to={'/admin/programmer/ny'}>
            <AdminOptionButton name="Nytt Program" image={svgShow} />
          </Link>
        </div>
        <div className={styles.adminRow}>
          <Link className={styles.titleLink} to={'/admin/post/endre'}>
            <AdminOptionButton name="Endre Blogginnlegg" image={svgBlog} />
          </Link>
          <Link className={styles.titleLink} to={'/admin/episoder/endre'}>
            <AdminOptionButton name="Endre Episode" image={svgMic} />
          </Link>
          <Link className={styles.titleLink} to={'/admin/programmer/endre'}>
            <AdminOptionButton name="Endre Program" image={svgShow} />
          </Link>
        </div>
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
