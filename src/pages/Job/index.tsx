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


interface Jobs {
    empregoId: number,
    cargo: string,
    local: string,
    salario: string,
    empresa: string,
    descricao: string,
    link: string,
    logo: string,
    tipo: string,
    dataExclusao: Date,

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

export function Job() {

    const [jobs, setJobs] = React.useState<Jobs[]>([]);

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleOpenDelete = (empregoId: any) => {
        setEmpregoIdToDelete(empregoId);
        setOpenDelete(true)
    };

    const [openDelete, setOpenDelete] = React.useState(false);
    const handleCloseDelete = () => setOpenDelete(false);
    const [buttonTitle, setButtonTitle] = React.useState('');
    const [modalTitle, setModalTitle] = React.useState('');

    const [empregoId, setEmpregoId] = React.useState<number>();
    const [cargo, setCargo] = React.useState("");
    const [local, setLocal] = React.useState("");
    const [salario, setSalario] = React.useState("");
    const [empresa, setEmpresa] = React.useState("");
    const [descricao, setDescricao] = React.useState("");
    const [link, setLink] = React.useState("");
    const [logo, setLogo] = React.useState("");
    const [tipo, setTipo] = React.useState("");
    const [dataExclusao, setDataExclusao] = React.useState<Date>();
    const [empregoIdToDelete, setEmpregoIdToDelete] = React.useState<number>();

    const body = {
        empregoId,
        cargo,
        local,
        salario,
        empresa,
        descricao,
        link,
        logo,
        tipo,
        dataExclusao: new Date(),
    }

    function getJobs() {
        axios.get(`${URL_BASE}/emprego/lista`)
            .then(function (response) {
                const jobs = response.data as Jobs[];
                setJobs(jobs);
                return jobs;
            })
            .catch(function (error) {
                // manipula erros da requisição
                console.error(error);
            })
            .then(function () {
                // sempre será executado
            });
    }

    function createEditJobs() {
        console.log(empregoId)
        if (empregoId) {
            axios.put(`${URL_BASE}/emprego/${empregoId}`, body)
                .then(function (response) {
                    console.log(response)
                })
                .catch(function (error) {
                    console.error(error);
                })
        } else {
            postJobs();
        }
    }

    function postJobs() {

        axios.post(`${URL_BASE}/emprego`, body)
            .then(function (response) {
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    function deleteJobs() {

        axios.delete(`${URL_BASE}/emprego/${empregoIdToDelete}`)
            .then(function (response) {
                setEmpregoIdToDelete(0);
            })
            .catch(function (error) {
                console.error(error);
            })
        // .then(() => location.reload());

        handleCloseDelete();
    }

    function editCreate(action: String, empregoIdEdit?: number) {
        if (action === 'edit') {
            setModalTitle('Editar emprego')
            setButtonTitle('Atualizar')
        } else {
            setModalTitle('Cadastrar emprego')
            setButtonTitle('Cadastrar')
        }
        jobs.filter(e => e.empregoId === empregoIdEdit).map((e) => {
            setCargo(e.cargo)
            setLocal(e.local)
            setEmpregoId(e.empregoId)
            setSalario(e.salario)
            setEmpresa(e.empresa)
            setDescricao(e.descricao)
            setLink(e.link)
            setLogo(e.logo)
            setTipo(e.tipo)
            setDataExclusao(e.dataExclusao)
        });
        handleOpen();
    }

    React.useEffect(() => getJobs(), [])

    return (
        <Tables>
            <TableTitle>Empregos</TableTitle>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Nº</TableCell>
                            <TableCell align="left">Cargo</TableCell>
                            <TableCell align="left">Local</TableCell>
                            <TableCell align="left">Salário</TableCell>
                            <TableCell align="left">Empresa</TableCell>
                            <TableCell align="left">Descrição</TableCell>
                            <TableCell align="left">Link</TableCell>
                            <TableCell align="left">Logo</TableCell>
                            <TableCell align="left">Tipo</TableCell>
                            <TableCell align="left">Data Exclusão</TableCell>
                            <TableCell align="left">Editar</TableCell>
                            <TableCell align="left">Excluir</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {jobs.map((job) => (
                            <TableRow
                                key={job.cargo}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left">{job.empregoId}</TableCell>
                                <TableCell align="left" component="th" scope="job">
                                    {job.cargo}
                                </TableCell>
                                <TableCell align="left">{job.local}</TableCell>
                                <TableCell align="left">{job.salario}</TableCell>
                                <TableCell align="left">{job.empresa}</TableCell>
                                <TableCell align="left">{job.descricao}</TableCell>
                                <TableCell align="left">{job.link}</TableCell>
                                <TableCell align="left">{job.logo}</TableCell>
                                <TableCell align="left">{job.tipo}</TableCell>
                                <TableCell align="left">{String(job.dataExclusao)}</TableCell>
                                <TableCell align="left">
                                    <EditButton onClick={() => editCreate('edit', job.empregoId)}>
                                        <EditIcon sx={{ color: '#fff' }} />
                                    </EditButton>
                                </TableCell>
                                <TableCell align="left">
                                    <DeleteButton onClick={() => handleOpenDelete(job.empregoId)}>
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
                            label="Cargo"
                            variant="outlined"
                            onChange={e => setCargo(e.target.value)}
                            value={cargo}
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
                            label="Salário"
                            variant="outlined"
                            onChange={e => setSalario(e.target.value)}
                            value={salario}
                        />

                        <TextField
                            id="outlined-basic"
                            label="Empresa"
                            variant="outlined"
                            onChange={e => setEmpresa(e.target.value)}
                            value={empresa}
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
                            label="Link"
                            variant="outlined"
                            onChange={e => setLink(e.target.value)}
                            value={link}
                        />

                        <TextField
                            id="outlined-basic"
                            label="Logo"
                            variant="outlined"
                            onChange={e => setLogo(e.target.value)}
                            value={logo}
                        />

                        <TextField
                            id="outlined-basic"
                            label="Tipo"
                            variant="outlined"
                            onChange={e => setTipo(e.target.value)}
                            value={tipo}
                        />

                        <RegisterButton onClick={createEditJobs}>
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
                        Deletar Emprego
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Deseja realmente deletar esse emprego?
                    </Typography>
                    <NoButton onClick={handleCloseDelete}>
                        Não
                    </NoButton>
                    <YesButton onClick={() => deleteJobs()}>
                        Sim
                    </YesButton>

                </Box>
            </Modal>

        </Tables>
    );
}
