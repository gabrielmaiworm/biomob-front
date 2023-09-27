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

interface Parkings {
    estacionamentoId: number,
    endereco: string,
    latitude: number,
    longitude: number,
    tipoVaga: string,
    qntdVagas: number,
    detalhes: string,
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

export function Parking() {

    const [parkings, setParkings] = React.useState<Parkings[]>([]);

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleOpenDelete = (estacionamentoId: any) => {
        setEstacionamentoIdToDelete(estacionamentoId);
        setOpenDelete(true)
    };

    const [openDelete, setOpenDelete] = React.useState(false);
    const handleCloseDelete = () => setOpenDelete(false);
    const [buttonTitle, setButtonTitle] = React.useState('');
    const [modalTitle, setModalTitle] = React.useState('');

    const [estacionamentoId, setEstacionamentoId] = React.useState<number>();
    const [endereco, setEndereco] = React.useState("");
    const [latitude, setLatitude] = React.useState<number>();
    const [longitude, setLongitude] = React.useState<number>();
    const [tipoVaga, setTipoVaga] = React.useState("");
    const [qntdVagas, setQntdVagas] = React.useState<number>();
    const [detalhes, setDetalhes] = React.useState("");
    const [estacionamentoIdToDelete, setEstacionamentoIdToDelete] = React.useState<number>();

    const body = {
        estacionamentoId,
        endereco,
        latitude,
        longitude,
        tipoVaga,
        qntdVagas,
        detalhes,
    }

    function getParkings() {
        axios.get(`${URL_BASE}/estacionamento/lista`)
            .then(function (response) {
                const parkings = response.data as Parkings[];
                setParkings(parkings);
                return parkings;
            })
            .catch(function (error) {
                // manipula erros da requisição
                console.error(error);
            })
            .then(function () {
                // sempre será executado
            });
    }

    function createEditParkings() {
        console.log(estacionamentoId)
        if (estacionamentoId) {
            axios.put(`${URL_BASE}/estacionamento/${estacionamentoId}`, body)
                .then(function (response) {
                    console.log(response)
                })
                .catch(function (error) {
                    console.error(error);
                })
        } else {
            postParkings();
        }
    }

    function postParkings() {

        axios.post(`${URL_BASE}/estacionamento`, body)
            .then(function (response) {
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    function deleteParkings() {

        axios.delete(`${URL_BASE}/estacionamento/${estacionamentoIdToDelete}`)
            .then(function (response) {
                setEstacionamentoIdToDelete(0);
            })
            .catch(function (error) {
                console.error(error);
            })
        // .then(() => location.reload());

        handleCloseDelete();
    }

    function editCreate(action: String, estacionamentoIdEdit?: number) {
        if (action === 'edit') {
            setModalTitle('Editar vaga')
            setButtonTitle('Atualizar')
        } else {
            setModalTitle('Cadastrar vaga')
            setButtonTitle('Cadastrar')
        }
        parkings.filter(e => e.estacionamentoId === estacionamentoIdEdit).map((e) => {
            setEndereco(e.endereco)
            setLatitude(e.latitude)
            setEstacionamentoId(e.estacionamentoId)
            setLongitude(e.longitude)
            setTipoVaga(e.tipoVaga)
            setQntdVagas(e.qntdVagas)
            setDetalhes(e.detalhes)
        });
        handleOpen();
    }

    React.useEffect(() => getParkings(), [])

    return (
        <Tables>
            <TableTitle>Estacionamento</TableTitle>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Nº</TableCell>
                            <TableCell align="left">Endereço</TableCell>
                            <TableCell align="left">Latitude</TableCell>
                            <TableCell align="left">Longitude</TableCell>
                            <TableCell align="left">Tipo Vaga</TableCell>
                            <TableCell align="left">Qtd. Vagas</TableCell>
                            <TableCell align="left">Detalhes</TableCell>
                            <TableCell align="left">Editar</TableCell>
                            <TableCell align="left">Excluir</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {parkings.map((parking) => (
                            <TableRow
                                key={parking.endereco}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left">{parking.estacionamentoId}</TableCell>
                                <TableCell align="left" component="th" scope="parking">
                                    {parking.endereco}
                                </TableCell>
                                <TableCell align="left">{parking.latitude}</TableCell>
                                <TableCell align="left">{parking.longitude}</TableCell>
                                <TableCell align="left">{parking.tipoVaga}</TableCell>
                                <TableCell align="left">{parking.qntdVagas}</TableCell>
                                <TableCell align="left">{parking.detalhes}</TableCell>
                                <TableCell align="left">
                                    <EditButton onClick={() => editCreate('edit', parking.estacionamentoId)}>
                                        <EditIcon sx={{ color: '#fff' }} />
                                    </EditButton>
                                </TableCell>
                                <TableCell align="left">
                                    <DeleteButton onClick={() => handleOpenDelete(parking.estacionamentoId)}>
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
                            label="Endereço"
                            variant="outlined"
                            onChange={e => setEndereco(e.target.value)}
                            value={endereco}
                        />

                        <TextField
                            id="outlined-basic"
                            label="Latitude"
                            variant="outlined"
                            onChange={e => setLatitude(Number(e.target.value))}
                            value={latitude}
                        />

                        <TextField
                            id="outlined-basic"
                            label="Longitude"
                            variant="outlined"
                            onChange={e => setLongitude(Number(e.target.value))}
                            value={longitude}
                        />

                        <TextField
                            id="outlined-basic"
                            label="Tipo Vaga"
                            variant="outlined"
                            onChange={e => setTipoVaga(e.target.value)}
                            value={tipoVaga}
                        />

                        <TextField
                            id="outlined-basic"
                            label="Qtd. Vagas"
                            variant="outlined"
                            onChange={e => setQntdVagas(Number(e.target.value))}
                            value={qntdVagas}
                        />

                        <TextField
                            id="outlined-basic"
                            label="Detalhes"
                            variant="outlined"
                            onChange={e => setDetalhes(e.target.value)}
                            value={detalhes}
                        />

                        <RegisterButton onClick={createEditParkings}>
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
                        Deletar Vaga
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Deseja realmente deletar essa vaga?
                    </Typography>
                    <NoButton onClick={handleCloseDelete}>
                        Não
                    </NoButton>
                    <YesButton onClick={() => deleteParkings()}>
                        Sim
                    </YesButton>

                </Box>
            </Modal>

        </Tables>
    );
}
