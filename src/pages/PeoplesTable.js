import React, { Component, Fragment } from 'react';
import Moment from 'moment';
import { Link } from 'react-router-dom';


const TableHead = () => {
  return (
    <thead>
      <tr>
        <th>Nome</th>
        <th>CPF</th>
        <th>Data de Nascimento</th>
        <th>Peso</th>
        <th>UF</th>
      </tr>
    </thead>
  );
}

const TableBody = props => {
  const rows = props.data.peoples.map((row, index) => {

    return (
      <tr key={index}>
        <td>{row.name}</td>
        <td>{row.cpf}</td>
        <td>{Moment(row.birthDate).format('DD/MM/YYYY')}</td>
        <td>{row.weight}</td>
        <td>{row.uf}</td>
      </tr>
    );
  });

  return (
    <tbody>
      {rows}
    </tbody>
  )
}

class PeoplesTable extends Component {

  render() {
    const { data, remove } = this.props;

    return (
      <Fragment>
        <Link 
          to='/newPeople'
          className='right'
          variant='contained'
          color='primary'
        >
          Novo
        </Link>
        <table className='centered highlight'>
          <TableHead />
          <TableBody data={data} remove={remove} />
        </table>
      </Fragment>
    );
  }
}

export default PeoplesTable;