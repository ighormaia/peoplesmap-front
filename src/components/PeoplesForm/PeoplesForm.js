import React, { Component, Fragment } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import { apiUrl, ufsUrl } from '../../configs/urls';
import SimpleReactValidator from 'simple-react-validator';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'date-fns';
import { 
  MuiPickersUtilsProvider, 
  KeyboardDatePicker 
} from '@material-ui/pickers';
import './PeoplesForm.css';

class PeoplesForm extends Component {
  constructor(props) {
    super(props);

    this.validator = new SimpleReactValidator({
      messages: {
        required: 'Campo obrigatório.',
      },
    });

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
    axios.get(ufsUrl)
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
    if (this.validator.allValid()) {
      const config = {
        headers: {'Content-Type': 'application/json'}
      };

      let people = {
        name: this.state.name,
        cpf: this.state.cpf.replace(/[^\d]/g, ''),
        birthDate: this.state.birthDate,
        weight: this.state.weight.replace(',','.'),
        uf: this.state.uf
      }
  
      axios.post(apiUrl + `/peoples`, people, config)
      .then(res => {
        this.props.history.push('/');
      })
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  componentDidMount() {
    this.getUfs();
  }

  render() {
    const { name, cpf, birthDate, weight, uf, ufs } = this.state;

    return (
      <Fragment>
        <div className='container'>
          <h4>Cadastrar</h4>
          <form id='peoples-form'>
            <label htmlFor='name'>Nome*</label>
            <input
              id='name'
              type='text'
              name='name'
              value={name}
              onChange={this.inputListener} />
            {this.validator.message('Nome', this.state.name, 'required')}

            <label htmlFor='cpf'>CPF*</label>
            <input
              id='cpf'
              type='text'
              name='cpf'
              value={cpf}
              onChange={this.inputListener} />
            {this.validator.message('CPF', this.state.cpf, 'required')}

            <label htmlFor='weight'>Peso</label>
            <input
              id='weight'
              type='text'
              name='weight'
              value={weight}
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

            <div className='row'>
              <FormControl className='uf-select'>
                <InputLabel id="uf-select-label">UF*</InputLabel>
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
              {this.validator.message('UF', this.state.uf, 'required')}
            </div>

            <br></br>
            <Link 
              to='/'
              className='go-back MuiButtonBase-root MuiButton-root'
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