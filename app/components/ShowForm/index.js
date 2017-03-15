/**
*
* ShowForm
*
*/

import React from 'react';


import styles from './styles.css';

import TextInput from 'components/TextInput';
import TextAreaInput from 'components/TextAreaInput';
import CheckboxInput from 'components/CheckboxInput';
import SubmitButton from 'components/SubmitButton';
import UploadFileInput from 'components/UploadFileInput';
import SelectInput from 'components/SelectInput';

function ShowForm(props) {
  const languagesOptions = [
    <option value={'no'} key={'no'}>Norsk</option>,
    <option value={'en'} key={'en'}>Engelsk</option>,
  ];

  return (
    <div className={styles.showForm}>
      <TextInput label={'Tittel'} onChange={props.onTitleChange} value={props.title} />
      <UploadFileInput label={'Programbilde'} onChange={props.onImageChange} />
      <TextAreaInput label={'Kort beskrivelse'} onChange={props.onLeadChange} value={props.lead} />
      <TextAreaInput label={'Lang beskrivelse'} onChange={props.onDescriptionChange} value={props.description} />
      <SelectInput label={'Hva heter programmet i Digas?'} onChange={props.onDigasIdChange} options={props.digasIdOptions} />
      <SelectInput label={'Språk'} onChange={props.onLanguageChange} options={languagesOptions} />
      <CheckboxInput label={'Arkivert?'} onChange={props.onArchivedChange} value={props.archived} />
      <CheckboxInput label={'Ikke-barnevennlig innhold'} onChange={props.onExplicitContentChange} value={props.explicitContent} />
      <SubmitButton onClick={props.onAddShow}>Opprett nytt program</SubmitButton>
    </div>
  );
}

ShowForm.propTypes = {
  onTitleChange: React.PropTypes.func.isRequired,
  onImageChange: React.PropTypes.func.isRequired,
  onLeadChange: React.PropTypes.func.isRequired,
  onDescriptionChange: React.PropTypes.func.isRequired,
  onDigasIdChange: React.PropTypes.func.isRequired,
  onLanguageChange: React.PropTypes.func.isRequired,
  onArchivedChange: React.PropTypes.func.isRequired,
  onExplicitContentChange: React.PropTypes.func.isRequired,
  onAddShow: React.PropTypes.func.isRequired,

  title: React.PropTypes.string.isRequired,
  lead: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired,
  digasIdOptions: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.array,
  ]).isRequired,
  archived: React.PropTypes.bool.isRequired,
  explicitContent: React.PropTypes.bool.isRequired,
};

export default ShowForm;
