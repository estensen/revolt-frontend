/*
 *
 * PostAdmin
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectShows,
  selectShowsLoading,
  selectShowsError,
} from 'containers/Shows/selectors';
import { loadShows } from 'containers/Shows/actions';
import { addPostPending } from './actions';
import styles from './styles.css';

import TextInput from 'components/TextInput';
import TextAreaInput from 'components/TextAreaInput';
import CheckboxInput from 'components/CheckboxInput';
import SubmitButton from 'components/SubmitButton';
import UploadFileInput from 'components/UploadFileInput';
import SelectInput from 'components/SelectInput';

export class PostAdmin extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      lead: '',
      content: '',
      coverPhoto: '',
      authorId: null,
      pinned: false,
      categoryId: null,
      showId: null,
      // Fields below should be refactored at a later stage
      file: '',
      imagePreviewUrl: '',
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleLeadChange = this.handleLeadChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handlePinnedChange = this.handlePinnedChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleShowChange = this.handleShowChange.bind(this);
    this.handleCoverPhotoChange = this.handleCoverPhotoChange.bind(this);
  }
  componentWillMount() {
    this.props.loadShows();
  }

  handleTitleChange(event) {
    event.preventDefault();
    this.setState({ title: event.target.value });
  }

  handleLeadChange(event) {
    event.preventDefault();
    this.setState({ lead: event.target.value });
  }
  handleContentChange(event) {
    event.preventDefault();
    this.setState({ content: event.target.value });
  }
  handleShowChange(event) {
    this.setState({ show: event.target.value });
  }
  handleCategoryChange(event) {
    this.setState({ category: event.target.value });
  }
  handlePinnedChange() {
    this.setState({ pinned: !this.state.pinned });
  }

  handleCoverPhotoChange(e) {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];
    // console.log(file);

    reader.onloadend = () => {
      this.setState({
        file,
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(file);
  }

  render() {
    let shows;
    if (this.props.shows !== false) {
      shows = this.props.shows.map(
        show => <option value={show.title} key={show.id}>{show.title}</option>
      );
    }
    const DUMMY_CATEGORIES = [
      <option value={1} key={1}>Kategori 1</option>,
      <option value={2} key={2}>Kategori 2</option>,
    ];
    return (
      <div className={styles.postAdmin}>
        <h1>Opprett ny bloggpost</h1>
        <div>
          <TextInput label={'Tittel'} onChange={this.handleTitleChange} value={this.state.title} />
          <UploadFileInput label={'Forsidebilde'} onChange={this.handleCoverPhotoChange} />
          <TextAreaInput label={'Kort beskrivelse'} onChange={this.handleLeadChange} value={this.state.lead} />
          <TextAreaInput label={'Innhold'} onChange={this.handleContentChange} value={this.state.content} />
          <SelectInput label={'Tilhørende show'} onChange={this.handleShowChange} options={shows} />
          <SelectInput label={'Kategori'} onChange={this.handleCategoryChange} options={DUMMY_CATEGORIES} />
          <CheckboxInput label={'Fest til toppen av forsiden?'} onChange={this.handlePinnedChange} value={this.state.pinned} />
          <SubmitButton onClick={() => this.props.onAddPost(this.state)}>Lagre</SubmitButton>
        </div>
      </div>
    );
  }
}

PostAdmin.propTypes = {
  shows: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.array,
  ]),
  onAddPost: React.PropTypes.func,
  loadShows: React.PropTypes.func,
};


PostAdmin.defaultProps = {
  loading: false,
  error: false,
  shows: [],
};

const mapStateToProps = createStructuredSelector({
  shows: selectShows(),
  loading: selectShowsLoading(),
  error: selectShowsError(),
});

function mapDispatchToProps(dispatch) {
  return {
    onAddPost: (post) => dispatch(addPostPending(post)),
    loadShows: () => dispatch(loadShows()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostAdmin);
