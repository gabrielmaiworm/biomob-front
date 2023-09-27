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

interface Events {
    eventoId: number,
    nome: string,
    local: string,
    site: string,
    descricao: string,
    horarioInicio: string,
    horarioFim: string,
    data: string,
    foto: string,
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

export function Event() {

    const [events, setEvents] = React.useState<Events[]>([]);

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleOpenDelete = (eventoId: any) => {
        setEventoIdToDelete(eventoId);
        setOpenDelete(true)
    };

    const [openDelete, setOpenDelete] = React.useState(false);
    const handleCloseDelete = () => setOpenDelete(false);
    const [buttonTitle, setButtonTitle] = React.useState('');
    const [modalTitle, setModalTitle] = React.useState('');

    const [eventoId, setEventoId] = React.useState<number>();
    const [nome, setNome] = React.useState("");
    const [local, setLocal] = React.useState("");
    const [site, setSite] = React.useState("");
    const [descricao, setDescricao] = React.useState("");
    const [horarioInicio, setHorarioInicio] = React.useState("");
    const [horarioFim, setHorarioFim] = React.useState("");
    const [data, setData] = React.useState("");
    const [foto, setFoto] = React.useState("");
    const [eventoIdToDelete, setEventoIdToDelete] = React.useState<number>();

    const body = {
        eventoId,
        nome,
        local,
        site,
        descricao,
        horarioInicio,
        horarioFim,
        data,
        foto,
    }

    function getEvents() {
        axios.get(`${URL_BASE}/evento/lista`)
            .then(function (response) {
                const events = response.data as Events[];
                setEvents(events);
                return events;
            })
            .catch(function (error) {
                // manipula erros da requisição
                console.error(error);
            })
            .then(function () {
                // sempre será executado
            });
    }

    function createEditEvents() {
        console.log(eventoId)
        if (eventoId) {
            axios.put(`${URL_BASE}/evento/${eventoId}`, body)
                .then(function (response) {
                    console.log(response)
                })
                .catch(function (error) {
                    console.error(error);
                })
        } else {
            postEvents();
        }
    }

    function postEvents() {

        axios.post(`${URL_BASE}/evento`, body)
            .then(function (response) {
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    function deleteEvents() {

        axios.delete(`${URL_BASE}/evento/${eventoIdToDelete}`)
            .then(function (response) {
                setEventoIdToDelete(0);
            })
            .catch(function (error) {
                console.error(error);
            })
        // .then(() => location.reload());

        handleCloseDelete();
    }

    function editCreate(action: String, eventoIdEdit?: number) {
        if (action === 'edit') {
            setModalTitle('Editar evento')
            setButtonTitle('Atualizar')
        } else {
            setModalTitle('Cadastrar evento')
            setButtonTitle('Cadastrar')
        }
        events.filter(e => e.eventoId === eventoIdEdit).map((e) => {
            setNome(e.nome)
            setLocal(e.local)
            setEventoId(e.eventoId)
            setSite(e.site)
            setDescricao(e.descricao)
            setHorarioInicio(e.horarioInicio)
            setHorarioFim(e.horarioFim)
            setData(e.data)
            setFoto(e.foto)
        });
        handleOpen();
    }

    React.useEffect(() => getEvents(), [])

    return (
        <Tables>
            <TableTitle>Eventos</TableTitle>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Nº</TableCell>
                            <TableCell align="left">Nome</TableCell>
                            <TableCell align="left">Local</TableCell>
                            <TableCell align="left">Site</TableCell>
                            <TableCell align="left">Descrição</TableCell>
                            <TableCell align="left">Início</TableCell>
                            <TableCell align="left">Fim</TableCell>
                            <TableCell align="left">Data</TableCell>
                            <TableCell align="left">Foto</TableCell>
                            <TableCell align="left">Editar</TableCell>
                            <TableCell align="left">Excluir</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {events.map((event) => (
                            <TableRow
                                key={event.nome}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left">{event.eventoId}</TableCell>
                                <TableCell align="left" component="th" scope="event">
                                    {event.nome}
                                </TableCell>
                                <TableCell align="left">{event.local}</TableCell>
                                <TableCell align="left">{event.site}</TableCell>
                                <TableCell align="left">{event.descricao}</TableCell>
                                <TableCell align="left">{event.horarioInicio}</TableCell>
                                <TableCell align="left">{event.horarioFim}</TableCell>
                                <TableCell align="left">{event.data}</TableCell>
                                <TableCell align="left">{event.foto}</TableCell>
                                <TableCell align="left">
                                    <EditButton onClick={() => editCreate('edit', event.eventoId)}>
                                        <EditIcon sx={{ color: '#fff' }} />
                                    </EditButton>
                                </TableCell>
                                <TableCell align="left">
                                    <DeleteButton onClick={() => handleOpenDelete(event.eventoId)}>
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
                            onChange={e => setNome(e.target.value)}
                            value={nome}
                        />

                        <TextField
                            id="outlined-basic"
                            label="Local"
                            variant="outlined"
                            onChange={e => setLocal(e.target.value)}
                            value={local}
                        />

                        <TextField
                            id="outlined-basic"
                            label="Site"
                            variant="outlined"
                            onChange={e => setSite(e.target.value)}
                            value={site}
                        />

                        <TextField
                            id="outlined-basic"
                            label="Descrição"
                            variant="outlined"
                            onChange={e => setDescricao(e.target.value)}
                            value={descricao}
                        />

                        <TextField
                            id="outlined-basic"
                            label="Início"
                            variant="outlined"
                            onChange={e => setHorarioInicio(e.target.value)}
                            value={horarioInicio}
                        />

                        <TextField
                            id="outlined-basic"
                            label="Fim"
                            variant="outlined"
                            onChange={e => setHorarioFim(e.target.value)}
                            value={horarioFim}
                        />

                        <TextField
                            id="outlined-basic"
                            label="Data"
                            variant="outlined"
                            onChange={e => setData(e.target.value)}
                            value={data}
                        />

                        <TextField
                            id="outlined-basic"
                            label="Foto"
                            variant="outlined"
                            onChange={e => setFoto(e.target.value)}
                            value={foto}
                        />

                        <RegisterButton onClick={createEditEvents}>
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
                        Deletar Evento
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Deseja realmente deletar esse evento?
                    </Typography>
                    <NoButton onClick={handleCloseDelete}>
                        Não
                    </NoButton>
                    <YesButton onClick={() => deleteEvents()}>
                        Sim
                    </YesButton>

                </Box>
            </Modal>

        </Tables>
    );
}
