/*
 *
 * FrontPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styles from './styles.css';
import {
  selectFrontPagePosts,
  selectFrontPagePostsLoading,
  selectFrontPagePostsError,
} from './selectors';
import { loadFrontPagePosts } from './actions';

import PostPreviewList from 'components/PostPreviewList';

export class FrontPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.props.loadPosts();
  }

  render() {
    let posts;
    if (this.props.posts !== false) {
      posts = <PostPreviewList posts={this.props.posts} />;
    }
    return (
      <div className={styles.frontPage}>
        {posts}
      </div>
    );
  }
}

FrontPage.propTypes = {
  posts: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.array,
  ]),
  loading: React.PropTypes.bool,
  error: React.PropTypes.bool,
  loadPosts: React.PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  posts: selectFrontPagePosts(),
  loading: selectFrontPagePostsLoading(),
  error: selectFrontPagePostsError(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadPosts: () => dispatch(loadFrontPagePosts()),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FrontPage);
