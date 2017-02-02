/*
 *
 * ShowAdmin
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectDigasShows,
  selectDigasShowsLoading,
  selectDigasShowsError,
} from './selectors';
import {
  addShowPending,
  loadDigasShowsPending,
} from './actions';
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
      digasId: null,
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
    this.handleDigasIdChange = this.handleDigasIdChange.bind(this);
    this.handleRssFeedChange = this.handleRssFeedChange.bind(this);
    this.handleArchivedChange = this.handleArchivedChange.bind(this);
    this.handleLanguageChange = this.handleLanguageChange.bind(this);
    this.handleExplicitContentChange = this.handleExplicitContentChange.bind(this);
  }

  componentWillMount() {
    this.props.loadDigasShows();
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
  handleDigasIdChange(event) {
    this.setState({ digasId: event.target.value || null });
  }
  handleRssFeedChange(event) {
    event.preventDefault();
    this.setState({ rssFeed: event.target.value });
  }
  handleArchivedChange() {
    this.setState({ archived: !this.state.archived });
  }
  handleLanguageChange(event) {
    this.setState({ language: event.target.value });
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

    let digasShows;
    if (this.props.digasShows !== false && this.props.digasShows.length > 0) {
      digasShows = this.props.digasShows.map(
        show => <option value={show.id} key={show.id}>{show.name}</option>
      );
      digasShows.unshift(<option value={''} key={'digasShow-placeholder'}>Velg show</option>);
    }
    return (
      <div className={styles.wrapper}>
        <div className={styles.ShowAdmin}>
          <h1>Opprett nytt program</h1>
          <div>
            <TextInput label={'Tittel'} onChange={this.handleTitleChange} value={this.state.title} />
            <UploadFileInput label={'Programbilde'} onChange={this.handleImageChange} />
            <TextAreaInput label={'Kort beskrivelse'} onChange={this.handleLeadChange} value={this.state.lead} />
            <TextAreaInput label={'Lang beskrivelse'} onChange={this.handleDescriptionChange} value={this.state.description} />
            <SelectInput label={'Hva heter programmet i Digas?'} onChange={this.handleDigasIdChange} options={digasShows} />

            <TextInput label={'RSS-feed'} onChange={this.handleRssFeedChange} value={this.state.rssFeed} />
            <SelectInput label={'Språk'} onChange={this.handleLanguageChange} options={languages} />
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
  onAddShow: React.PropTypes.func.isRequired,
  loadDigasShows: React.PropTypes.func.isRequired,
  digasLoading: React.PropTypes.bool,
  digasError: React.PropTypes.bool,
  digasShows: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.array,
  ]),
};

ShowAdmin.defaultProps = {
  addShowLoading: false,
  addShowError: false,
  digasLoading: false,
  digasError: false,
  digasShows: [],
};

const mapStateToProps = createStructuredSelector({
  digasShows: selectDigasShows(),
  digasLoading: selectDigasShowsLoading(),
  digasError: selectDigasShowsError(),
});

function mapDispatchToProps(dispatch) {
  return {
    onAddShow: (show) => dispatch(addShowPending(show)),
    loadDigasShows: () => dispatch(loadDigasShowsPending()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowAdmin);
