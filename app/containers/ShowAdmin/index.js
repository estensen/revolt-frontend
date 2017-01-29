/*
 *
 * ShowAdmin
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { addShowPending } from './actions';
import styles from './styles.css';

import TextInput from 'components/TextInput';
import TextAreaInput from 'components/TextAreaInput';
import CheckboxInput from 'components/CheckboxInput';
import SubmitButton from 'components/SubmitButton';
import UploadFileInput from 'components/UploadFileInput';
import SelectInput from 'components/SelectInput';

export class ShowAdmin extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      rssFeed: '',
      logoImage: '',
      lead: '',
      explicitContent: false,
      archived: false,
      language: 'no',
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleLeadChange = this.handleLeadChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleArchivedChange = this.handleArchivedChange.bind(this);
    this.handleExplicitContentChange = this.handleExplicitContentChange.bind(this);
    this.handleRssFeedChange = this.handleRssFeedChange.bind(this);
  }

  handleTitleChange(event) {
    event.preventDefault();
    this.setState({ title: event.target.value });
  }

  handleLeadChange(event) {
    event.preventDefault();
    this.setState({ lead: event.target.value });
  }
  handleDescriptionChange(event) {
    event.preventDefault();
    this.setState({ description: event.target.value });
  }
  handleRssFeedChange(event) {
    event.preventDefault();
    this.setState({ rssFeed: event.target.value });
  }
  handleArchivedChange() {
    this.setState({ archived: !this.state.archived });
  }
  handleExplicitContentChange() {
    this.setState({ explicitContent: !this.state.explicitContent });
  }

  handleImageChange(e) {
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
    const languages = [
      <option value={'no'} key={'no'}>Norsk</option>,
      <option value={'en'} key={'en'}>Engelsk</option>,
    ];

    return (
      <div className={styles.wrapper}>
        <div className={styles.ShowAdmin}>
          <h1>Opprett nytt program</h1>
          <div>
            <TextInput label={'Tittel'} onChange={this.handleTitleChange} value={this.state.title} />
            <UploadFileInput label={'Programbilde'} onChange={this.handleImageChange} />
            <TextAreaInput label={'Kort beskrivelse'} onChange={this.handleLeadChange} value={this.state.lead} />
            <TextAreaInput label={'Lang beskrivelse'} onChange={this.handleDescriptionChange} value={this.state.description} />
            <TextInput label={'RSS-feed'} onChange={this.handleRssFeedChange} value={this.state.rssFeed} />
            <SelectInput label={'Språk'} options={languages} />
            <CheckboxInput label={'Arkivert?'} onChange={this.handleArchivedChange} value={this.state.archived} />
            <CheckboxInput label={'Ikke-barnevennlig innhold'} onChange={this.handleExplicitContentChange} value={this.state.explicitContent} />
            <SubmitButton onClick={() => this.props.onAddShow(this.state)}>Lagre</SubmitButton>
          </div>
        </div>
      </div>
    );
  }
}

ShowAdmin.propTypes = {
  onAddShow: React.PropTypes.func,
};

function mapStateToProps(state) {
  return {
    shows: state.shows,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onAddShow: (show) => dispatch(addShowPending(show)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowAdmin);
