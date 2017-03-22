/*
 *
 * Sendeplan
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectSendeplan from './selectors';
import styles from './styles.css';
const mandag = require('../../../mandag.json');
const tirsdag = require('../../../tirsdag.json');
const onsdag = require('../../../onsdag.json');
const torsdag = require('../../../torsdag.json');
const fredag = require('../../../fredag.json');
const lordag = require('../../../lordag.json');
const sondag = require('../../../sondag.json');

export class Sendeplan extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    let times = [];
    for (let i = 0; i < 24; i++) {
      if (i < 10) {
        times.push(`0${i}:00`);
      } else {
        times.push(`${i}:00`);
      }
    }

    const sendeliste = [];
    function makeSendeliste(json) {
      for (let i = 0; i < json.length; i++) {
        let diff = Number(json[i].endtime.slice(11, 13)) - Number(json[i].starttime.slice(11, 13));
        if (Number(json[i].endtime.slice(14, 16)) > Number(json[i].starttime.slice(14, 16))) {
          diff += 1;
        }
        for (let j = 0; j < diff; j++) {
          sendeliste.push(json[i].title);
        }
      }
    }

    makeSendeliste(mandag);
    makeSendeliste(tirsdag);
    makeSendeliste(onsdag);
    makeSendeliste(torsdag);
    makeSendeliste(fredag);
    makeSendeliste(lordag);
    makeSendeliste(sondag);

    times = times.map((time) =>
      <td key={time}>{time}</td>
    );

    const sun = sendeliste.slice(144, 168).map((program) =>
      <td key={program.index}>{program}</td>
    );

    const mon = sendeliste.slice(0, 24).map((program) =>
      <td key={program.index}>{program}</td>
    );

    const tue = sendeliste.slice(24, 48).map((program) =>
      <td key={program.index}>{program}</td>
    );

    const wed = sendeliste.slice(48, 72).map((program) =>
      <td key={program.index}>{program}</td>
    );

    const thu = sendeliste.slice(72, 96).map((program) =>
      <td key={program.index}>{program}</td>
    );

    const fri = sendeliste.slice(96, 120).map((program) =>
      <td key={program.index}>{program}</td>
    );

    const sat = sendeliste.slice(120, 144).map((program) =>
      <td key={program.index}>{program}</td>
    );

    const row = times.map((time, index) =>
      <tr>
      {times[index]}
      {mon[index]}
      {tue[index]}
      {wed[index]}
      {thu[index]}
      {fri[index]}
      {sat[index]}
      {sun[index]}
      </tr>
    );

    return (
      <div className={styles.sendeplan}>
        <h2>Sendeplanen for Radio Revolt</h2>
        <table>
          <tbody>
            <tr>
              <th>Tid</th>
              <th>Mandag</th>
              <th>Tirsdag</th>
              <th>Onsdag</th>
              <th>Torsdag</th>
              <th>Fredag</th>
              <th>Lørdag</th>
              <th>Søndag</th>
            </tr>
          {row}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = selectSendeplan();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sendeplan);
