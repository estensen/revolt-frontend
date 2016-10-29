/*
 *
 * PostAdmin
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectPostAdmin from './selectors';
import { addPost } from './actions';
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
      category: '',
      show: '',
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
  handlePinnedChange() {
    this.setState({ pinned: !this.state.pinned });
  }
  handleCategoryChange() {
    this.setState({ category: !this.state.archived });
  }
  handleShowChange() {
    this.setState({ show: !this.state.explicitContent });
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
          <SelectInput label={'Kategori'} options={DUMMY_CATEGORIES} />
          <CheckboxInput label={'Toppen av forsiden?'} onChange={this.handlePinnedChange} value={this.state.pinned} />
          <SubmitButton onClick={() => this.props.onAddPost(this.state)}>Lagre</SubmitButton>
        </div>
      </div>
    );
  }
}

PostAdmin.propTypes = {
  onAddPost: React.PropTypes.func,
};

const mapStateToProps = selectPostAdmin();

function mapDispatchToProps(dispatch) {
  return {
    onAddPost: (episode) => dispatch(addPost(episode)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostAdmin);
