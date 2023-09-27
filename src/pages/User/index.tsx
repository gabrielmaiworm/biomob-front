/* eslint-disable array-callback-return */
/* eslint-disable no-restricted-globals */
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { AddButton, Tables, TableTitle, EditButton, DeleteButton, RegisterButton, NoButton, YesButton } from './styles';

interface Users {
  email: string,
  name: string,
  cpf: string,
  telefone: string,
  deficiencia: string,
  foto: string,
  password: string,
  dataNascimento: string,
  genero: string,
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 620,
  bgcolor: 'background.paper',
  border: '2px solid #36B396',
  boxShadow: 24,
  p: 4,
};

const styleDelete = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 280,
  bgcolor: 'background.paper',
  border: '2px solid #36B396',
  boxShadow: 24,
  p: 4,
};


const URL_BASE = "http://177.70.102.109:3007/biomob-api";

export function User() {

  const [users, setUsers] = React.useState<Users[]>([]);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenDelete = (email: any) => {
    setEmailToDelete(email);
    setOpenDelete(true)
  };

  const [openDelete, setOpenDelete] = React.useState(false);
  const handleCloseDelete = () => setOpenDelete(false);
  const [buttonTitle, setButtonTitle] = React.useState('');
  const [modalTitle, setModalTitle] = React.useState('');

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [cpf, setCpf] = React.useState("");
  const [telefone, setTelefone] = React.useState("");
  const [deficiencia, setDeficiencia] = React.useState("");
  const [foto, setFoto] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [dataNascimento, setDataNascimento] = React.useState("");
  const [genero, setGenero] = React.useState("");
  const [emailToDelete, setEmailToDelete] = React.useState("");

  const body = {
    email,
    name,
    cpf,
    telefone,
    deficiencia,
    foto,
    password,
    dataNascimento,
    genero,
  }

  function getUsers() {
    axios.get(`${URL_BASE}/user/list`)
      .then(function (response) {
        const users = response.data as Users[];
        setUsers(users);
        return users;
      })
      .catch(function (error) {
        // manipula erros da requisição
        console.error(error);
      })
      .then(function () {
        // sempre será executado
      });
  }

  function createEditUser() {
    console.log(email)
    if (email !== '') {
      axios.put(`${URL_BASE}/user/${email}`, body)
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.error(error);
        })
    } else {
      postUsers();
    }
  }

  function postUsers() {

    axios.post(`${URL_BASE}/user/register`, body)
      .then(function (response) {
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function deleteUsers() {

    axios.delete(`${URL_BASE}/user/${emailToDelete}`)
      .then(function (response) {
        setEmailToDelete('');
      })
      .catch(function (error) {
        console.error(error);
      })
    // .then(() => location.reload());

    handleCloseDelete();
  }

  function editCreate(action: String, emailEdit?: String) {
    if (action === 'edit') {
      setModalTitle('Editar usuário')
      setButtonTitle('Atualizar')
    } else {
      setModalTitle('Cadastrar usuário')
      setButtonTitle('Cadastrar')
    }
    users.filter(e => e.email === emailEdit).map((e) => {
      setName(e.name)
      setCpf(e.cpf)
      setEmail(e.email)
      setTelefone(e.telefone)
      setDeficiencia(e.deficiencia)
      setFoto(e.foto)
      setPassword(e.password)
      setDataNascimento(e.dataNascimento)
      setGenero(e.genero)
    });
    handleOpen();
  }

  React.useEffect(() => getUsers(), [])

  return (
    <Tables>
      <TableTitle>Usuários</TableTitle>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Nome</TableCell>
              <TableCell align="left">E-mail</TableCell>
              <TableCell align="left">CPF</TableCell>
              <TableCell align="left">Telefone</TableCell>
              <TableCell align="left">Deficiência</TableCell>
              <TableCell align="left">Foto</TableCell>
              <TableCell align="left">Senha</TableCell>
              <TableCell align="left">Data de Nascimento</TableCell>
              <TableCell align="left">Gênero</TableCell>
              <TableCell align="left">Editar</TableCell>
              <TableCell align="left">Excluir</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left" component="th" scope="user">
                  {user.name}
                </TableCell>
                <TableCell align="left">{user.email}</TableCell>
                <TableCell align="left">{user.cpf}</TableCell>
                <TableCell align="left">{user.telefone}</TableCell>
                <TableCell align="left">{user.deficiencia}</TableCell>
                <TableCell align="left">{user.foto}</TableCell>
                <TableCell align="left">{user.password}</TableCell>
                <TableCell align="left">{user.dataNascimento}</TableCell>
                <TableCell align="left">{user.genero}</TableCell>
                <TableCell align="left">
                  <EditButton onClick={() => editCreate('edit', user.email)}>
                    <EditIcon sx={{ color: '#fff' }} />
                  </EditButton>
                </TableCell>
                <TableCell align="left">
                  <DeleteButton onClick={() => handleOpenDelete(user.email)}>
                    <DeleteIcon sx={{ color: '#fff' }} />
                  </DeleteButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddButton onClick={() => editCreate('create')}>
        <AddIcon sx={{ color: '#fff', fontSize: 37 }} onClick={() => handleOpen()} />
      </AddButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            {modalTitle}
          </Typography>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },

            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              autoFocus
              unselectable='off'
              id="outlined-basic"
              label="Nome"
              variant="outlined"
              onChange={e => setName(e.target.value)}
              value={name}
            />
            <TextField
              id="outlined-basic"
              label="CPF"
              variant="outlined"
              onChange={e => setCpf(e.target.value)}
              value={cpf}
            />

            <TextField
              id="outlined-basic"
              required label="E-mail"
              variant="outlined"
              onChange={e => setEmail(e.target.value)}
              value={email}
            />

            <TextField
              id="outlined-basic"
              label="Telefone"
              variant="outlined"
              onChange={e => setTelefone(e.target.value)}
              value={telefone}
            />

            <TextField
              id="outlined-basic"
              label="Deficiência"
              variant="outlined"
              onChange={e => setDeficiencia(e.target.value)}
              value={deficiencia}
            />

            <TextField
              id="outlined-basic"
              label="Foto"
              variant="outlined"
              onChange={e => setFoto(e.target.value)}
              value={foto}
            />

            <TextField
              id="outlined-basic"
              label="Senha"
              variant="outlined"
              onChange={e => setPassword(e.target.value)}
              value={password}
            />

            <TextField
              id="outlined-basic"
              label="Data de Nascimento"
              variant="outlined"
              onChange={e => setDataNascimento(e.target.value)}
              value={dataNascimento}
            />

            <TextField
              id="outlined-basic"
              label="Gênero"
              variant="outlined"
              onChange={e => setGenero(e.target.value)}
              value={genero}
            />

            <RegisterButton onClick={createEditUser}>
              {buttonTitle}
            </RegisterButton>
          </Box>
        </Box>
      </Modal>

      <Modal
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleDelete}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Deletar Usuário
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Deseja realmente deletar esse usuário?
          </Typography>
          <NoButton onClick={handleCloseDelete}>
            Não
          </NoButton>
          <YesButton onClick={() => deleteUsers()}>
            Sim
          </YesButton>

        </Box>
      </Modal>

    </Tables>
  );
}
