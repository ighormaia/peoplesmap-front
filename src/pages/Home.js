import React, { Component, Fragment } from 'react';
import { api } from '../services/api';

import Table from './PeoplesTable';

class Home extends Component {

  state = {
    peoples: [],
    ufs: []
  };

  getPeoples = () => {
    api.get(`/peoples`)
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
        <div className='container'>
          <Table data={this.state} />
        </div>
      </Fragment>
    );
  }
}

export default Home;
