/*
 *
 * EpisodeAdmin
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectEpisodeAdmin from './selectors';
import styles from './styles.css';

export class EpisodeAdmin extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <div className={styles.episodeAdmin}>
        <h1>Opprett ny episode</h1>
        <div className={styles.ShowAdmin}>
          <div>
            <form>
              <button className={styles.submitButton} type="submit" value="Lagre">Lagre</button>
            </form>
          </div>
          <div className={styles.episodePreview}>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = selectEpisodeAdmin();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EpisodeAdmin);
