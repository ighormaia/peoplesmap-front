import React, { Component, Fragment } from 'react';
import { apiUrl } from '../configs/urls';
import axios from 'axios';

import PeoplesMap from '../components/PeoplesMap/PeoplesMap';
import PeoplesTable from './PeoplesTable/PeoplesTable';

class Home extends Component {

  state = {
    peoples: [],
    ufs: []
  };

  getPeoples = () => {
    axios.get(apiUrl + `/peoples`)
      .then(res =>{
        const peoples = res.data;
        this.setState({
          peoples: peoples
        })
      })
  };

  componentDidMount() {
    this.getPeoples();
  };

  render() {
    return (
      <Fragment>
        <PeoplesMap data={this.state} />
        <div className='container'>
          <PeoplesTable data={this.state} />
        </div>
      </Fragment>
    );
  }
}

export default Home;
