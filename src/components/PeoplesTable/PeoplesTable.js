import React, { Component } from 'react';
import Moment from 'moment';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import './PeoplesTable.css';

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
    const { data } = this.props;

    return (
      <div className='table-container'>
        <h4>Pessoas</h4>
        <Button
          variant="contained"
          className="right"
          color="primary">
          <Link
            className="link-button"
            to='/newPeople'>
              Adicionar 
          </Link>
        </Button>
        <table className='centered highlight'>
          <TableHead />
          <TableBody data={data} />
        </table>
      </div>
    );
  }
}

export default PeoplesTable;