/**
*
* ShowPreviewList
*
*/

import React from 'react';
import Show from 'components/ShowPreview';

import styles from './styles.css';

function ShowPreviewList(props) {
  const activeShows = props.shows.filter(show => !show.archived).map(
    (show, index) => <Show {...show} key={`show-${index}`} />
  );

  const archivedShows = props.shows.filter(show => show.archived).map(
    (show, index) => <Show {...show} key={`show-${index}`} />
  );

  return (
    <div className={styles.container}>
      <div className={styles.activeShows}>
        {activeShows}
      </div>
      <div className={styles.archivedShows}>
        {archivedShows}
      </div>
    </div>
  );
}

ShowPreviewList.propTypes = {
  shows: React.PropTypes.array.isRequired,
};

export default ShowPreviewList;
