import React from 'react';
import Header from '../Header';
import ProgressBar from './ProgressBar'

import styles from './style';

import DatePicker from 'react-datetime';
import 'react-datetime/css/react-datetime.css'
import date_format from 'dateformat'

const expect_years = 82

export default class extends React.Component {
  update_time(){
    this.setState({now: new Date()})
    setTimeout(this.update_time.bind(this), 1000)
  }

  set_dob(dob_str){
    window.localStorage.setItem('dob', dob_str)
  }

  get_dob(){
    const dob_str = window.localStorage.getItem('dob')

    if(dob_str) return new Date(dob_str)
    else return null
  }

  update_dob(dob_moment){
    const dob = dob_moment.toDate()
    const dob_str = date_format(dob, 'yyyy-mm-dd')

    this.set_dob(dob_str)
    this.setState({dob: dob})
  }

  componentDidMount(){
    this.update_time();
  }

  constructor(props){
    super(props)

    this.state = {now: new Date(), dob: this.get_dob()}
  }


  render() {
    const now = this.state.now

    /**
     * Compute the life
     */
    const year_start = new Date(2017, 0, 1)
    const year_end = new Date(2018, 0, 0, 23, 59, 59)

    const dob = this.state.dob

    var expected_last_day = null

    if( dob ) {
      expected_last_day = new Date(dob.getTime())
      expected_last_day.setFullYear(expected_last_day.getFullYear() + expect_years)
    }

    return <div className={styles.main}>
      <div className={styles.wrap}>
        <Header/>
        <main className={styles.body}>
          <div className={styles.control_area}>
            <div className={styles.box}>
              <label>Birthday</label>
              <DatePicker
                timeFormat={false} onChange={this.update_dob.bind(this)} value={this.state.dob}
                inputProps={{readOnly: true}}
              />
            </div>

            <div className={styles.box}>
              <label>Expected Live: </label>
              <span>{expect_years} years</span>
            </div>
          </div>

          <div className={styles.percentage_box}>
            <div>Progress of Current Year: </div>
            <ProgressBar start={year_start} end={year_end} progress={now}/>
          </div>

          <div className={styles.percentage_box}>
            <div>Progress of life: </div>
            <ProgressBar start={dob} end={expected_last_day} progress={now}/>
          </div>
        </main>
      </div>
    </div>;
  }
}
