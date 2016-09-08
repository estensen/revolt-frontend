/*
 *
 * Show
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectShow,
  selectShowLoading,
  selectShowError,
} from './selectors';
import { loadShow } from './actions';
import {
  getPodcastPlaylist,
  getOnDemandPlaylist,
} from 'containers/Player/actions';
import styles from './styles.css';
import Episode from 'components/Episode';
import PostPreview from 'components/PostPreview';

export class Show extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.props.loadShow(this.props.params.slug);
  }

  render() {
    if (this.props.show === false || this.props.show === null || this.props.loading) {
      return <div></div>;
    }

    const episodes = this.props.show.episodes.map(e => ({
      ...e,
      date: e.createdAt,
      episode: true,
    }));

    const posts = this.props.show.posts.map(p => ({
      ...p,
      createdBy: p.createdBy.fullName,
      date: p.publishAt,
      episode: false,
    }));

    const elementList = posts.concat(episodes).sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (dateA < dateB) return 1;
      if (dateA > dateB) return -1;
      return 0;
    });

    const elements = elementList.map(
      (element, index) => {
        if (element.episode) {
          return (
            <Episode
              {...element}
              showName={this.props.show.name}
              key={index}
              playOnDemand={this.props.playOnDemand}
            />
          );
        }
        return (
          <div className={styles.post} key={index}>
            <PostPreview
              {...element}
            />
          </div>
        );
      }
    );

    return (
      <div className={styles.container}>
        <div className={styles.showInfo}>
          <img className={styles.image} src={this.props.show.image} alt={this.props.show.name} />
          <div className={styles.showText}>
            <h2 className={styles.name}>{this.props.show.name}</h2>
            <p className={styles.lead}>{this.props.show.content}</p>
          </div>
        </div>
        <div className={styles.content}>
          {elements}
        </div>
      </div>
    );
  }
}

Show.propTypes = {
  show: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.object,
  ]),
  params: React.PropTypes.object,
  loadShow: React.PropTypes.func,
  loading: React.PropTypes.bool,
  error: React.PropTypes.bool,
  playPodcast: React.PropTypes.func,
  playOnDemand: React.PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  show: selectShow(),
  loading: selectShowLoading(),
  error: selectShowError(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadShow: (slug) => dispatch(loadShow(slug)),
    playPodcast: (episodeId, offset = 0) => (
      dispatch(getPodcastPlaylist(episodeId, offset))
    ),
    playOnDemand: (episodeId, offset = 0) => (
      dispatch(getOnDemandPlaylist(episodeId, offset))
    ),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Show);
