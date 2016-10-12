/*
 *
 * ShowAdmin
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectShowAdmin from './selectors';
import styles from './styles.css';

export class ShowAdmin extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = { title: '',
                  file: '',
                  lead: '',
                  imagePreviewUrl: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleLeadChange = this.handleLeadChange.bind(this);
  }

  handleChange(event) {
    this.setState({ title: event.target.value });
  }

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    // console.log('handle uploading-', this.state.file);
  }

  handleLeadChange(event) {
    // console.log('New lead: ' + event.target.value);
    this.setState({ lead: event.target.value });
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
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img className={styles.previewImage} src={imagePreviewUrl} alt="Preview" />);
    } else {
      $imagePreview = <div className={styles.previewText}>Vennligst last opp et bilde</div>;
    }
    return (
      <div>
        <h1>Opprett nytt program</h1>
        <div className={styles.ShowAdmin}>
          <div>
            <form>
              <span>Tittel</span>
              <input type="text" className={styles.textField} onChange={this.handleChange} value={this.state.title} id="title" />
              <span>Programbilde</span>
              <input className="fileInput" type="file" onChange={(e) => this.handleImageChange(e)} />
              <span>Kort beskrivelse</span>
              <textarea type="text" className={styles.lead} value={this.state.lead} onChange={this.handleLeadChange} />
              <span>Kort beskrivelse</span>
              <textarea type="text" className={styles.lead} value={this.state.lead} onChange={this.handleLeadChange} />

              <button className={styles.submitButton} type="submit" value="Lagre">Lagre</button>
            </form>
          </div>
          <div className={styles.previewWrapper}>
            <div className={styles.container}>
              {$imagePreview}
              <h2 className={styles.name}>
                {this.state.title}
              </h2>
              <div className={styles.previewLead}>{this.state.lead}</div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

const mapStateToProps = selectShowAdmin();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowAdmin);
