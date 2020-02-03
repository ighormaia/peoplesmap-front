import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import DateFnsUtils from '@date-io/date-fns';
import { Link } from 'react-router-dom';
import 'date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { api, ufApi } from '../services/api';

const styles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

class PeoplesForm extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      name: '',
      cpf: '',
      birthDate: null,
      weight: '',
      uf: '',
      ufs: [],
      open: false
    }

    this.state = this.initialState;
  }

  inputListener = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  handleDateChange = date => {
    this.setState({ birthDate: date });
  };

  handleChange = event => {
    this.setState({ uf: event.target.value });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  getUfs = () => {
    ufApi.get()
      .then(res => {
        const ufs = res.data;
        this.setState({
          ufs: ufs
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  submitListener = () => {
    const config = {
      headers: {'Content-Type': 'application/json'}
    };

    api.post(`/peoples`, this.state, config)
    .then(res => {
      this.props.history.push('/');
    })
  };

  componentDidMount() {
    this.getUfs();
  }

  render() {
    const { name, cpf, birthDate, weight, uf, ufs } = this.state;

    return (
      <Fragment>
        <div className='container'>
          <form>
            <label htmlFor='name'>Nome</label>
            <input
              id='name'
              type='text'
              name='name'
              value={name}
              onChange={this.inputListener} />

            <label htmlFor='cpf'>CPF</label>
            <input
              id='cpf'
              type='text'
              name='cpf'
              value={cpf}
              onChange={this.inputListener} />

            <label htmlFor='date-picker'>Data de nascimento</label>
            <div className='row'>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  id="date-picker"
                  value={birthDate}
                  onChange={this.handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>

            <label htmlFor='weight'>Peso</label>
            <input
              id='weight'
              type='text'
              name='weight'
              value={weight}
              onChange={this.inputListener} />

            <div className='row'>
              <FormControl className={styles.formControl}>
                <InputLabel id="uf-select-label">UF</InputLabel>
                <Select
                  labelId="uf-select-label"
                  id="uf-select"
                  open={this.state.open}
                  onClose={this.handleClose}
                  onOpen={this.handleOpen}
                  value={uf}
                  onChange={this.handleChange}
                >
                  {ufs.map((uf, index) =>
                    <MenuItem
                      value={uf.sigla}
                      key={index}>
                      {uf.nome}
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
            </div>

            <Link 
              to='/'
              variant='contained'
              color='primary'
            >
              Voltar
            </Link>
            <Button
              variant="contained"
              color="primary"
              onClick={this.submitListener}>
                Salvar
            </Button>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default PeoplesForm;