/* eslint-disable array-callback-return */
/* eslint-disable no-restricted-globals */
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import MapIcon from "@mui/icons-material/Map";
import PrintIcon from "@mui/icons-material/Print";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import Papa from 'papaparse';
import Row from 'react-bootstrap/Row';
import { DirectionsRenderer, DirectionsService, GoogleMap, LoadScript, Polyline, PolylineF } from '@react-google-maps/api';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx/xlsx.mjs';
import {
  AddButton,
  Tables,
  TableTitle,
  EditButton,
  DeleteButton,
  RegisterButton,
  NoButton,
  YesButton,
} from "./styles";
import { TableFooter, TablePagination } from "@mui/material";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import { Directions } from "./Directions";



interface Events {
  calcadaId: string;
  bairro: string;
  cep: string;
  cidade: string;
  comprimento: number;
  estado: string;
  faixa_calcada: string;
  foto_calcada: string;
  foto_faixa: string;
  foto_obstaculo: string;
  foto_pavimentacao: string;
  foto_piso_alerta: string;
  foto_piso_direcional: string;
  foto_piso_rampa: string;
  foto_tipos_travessia: string;
  inclinacao: string;
  largura_calcada: number;
  lat: number;
  latf: number;
  lati: number;
  lng: number;
  lngf: number;
  lngi: number;
  logradouro: string;
  nota: number;
  numero: number;
  observacao_calcada: string;
  observacao_endereco: string;
  obstaculos_calcada: string;
  pavimentacao_calcada: string;
  pisos_rampas: string;
  tipo_travessia: string;
  acessivel: boolean;
}

const style = {
  position: "absolute" ,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height:600,
  bgcolor: "background.paper",
  border: "2px solid #36B396",
  boxShadow: 24,
  p: 4,
};

const styleDelete = {
  position: "absolute" ,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 280,
  bgcolor: "background.paper",
  border: "2px solid #36B396",
  boxShadow: 24,
  p: 4,
};




const URL_BASE = "http://177.70.102.109:3007/biomob-api";

export function Calcadas() {
  const [events, setEvents] = React.useState([]);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseMap =()=> { return (setOpen(false), window.location.reload())};

  const handleOpenDelete = (calcadaId: any) => {
    setcalcadaIdToDelete(calcadaId);
    setOpenDelete(true);
  };

  const [openDelete, setOpenDelete] = React.useState(false);
  const handleCloseDelete = () => {
    setOpenDelete(false);
    window.location.reload();
  };
  
  const [buttonTitle, setButtonTitle] = React.useState("");
  const [path, setPath] = React.useState({});
  const [modalTitle, setModalTitle] = React.useState("");
  const [calcadaId, setCalcadaId] = React.useState("");
  const [bairro, setBairro] = React.useState("");
  const [cep, setCep] = React.useState("");
  const [cidade, setCidade] = React.useState("");
  const [comprimento, setComprimento] = React.useState(0);
  const [estado, setEstado] = React.useState("");
  const [faixaCalcada, setFaixaCalcada] = React.useState("");
  const [fotoCalcada, setFotoCalcada] = React.useState("");
  const [fotoFaixa, setFotoFaixa] = React.useState("");
  const [fotoObstaculo, setFotoObstaculo] = React.useState("");
  const [fotoPavimentacao, setFotoPavimentacao] = React.useState("");
  const [fotoPisoAlerta, setFotoPisoAlerta] = React.useState("");
  const [fotoPisoDirecional, setFotoPisoDirecional] = React.useState("");
  const [fotoPisoRampa, setFotoPisoRampa] = React.useState("");
  const [fotoTiposTravessia, setFotoTiposTravessia] = React.useState("");
  const [inclinacao, setInclinacao] = React.useState("");
  const [larguraCalcada, setLarguraCalcada] = React.useState(0);
  const [lat, setLat] = React.useState(0);
  const [latf, setLatf] = React.useState(0);
  const [lati, setLati] = React.useState(0);
  const [lng, setLng] = React.useState(0);
  const [lngf, setLngf] = React.useState(0);
  const [lngi, setLngi] = React.useState(0);
  const [acessivel, setAcessivel] = React.useState(false);
  const [logradouro, setLogradouro] = React.useState("");
  const [nota, setNota] = React.useState(0);
  const [numero, setNumero] = React.useState(0);
  const [observacaoCalcada, setObservacaoCalcada] = React.useState("");
  const [observacaoEndereco, setObservacaoEndereco] = React.useState("");
  const [obstaculosCalcada, setObstaculosCalcada] = React.useState("");
  const [pavimentacaoCalcada, setPavimentacaoCalcada] = React.useState("");
  const [pisosRampas, setPisosRampas] = React.useState("");
  const [tipoTravessia, setTipoTravessia] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - events.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [calcadaIdToDelete, setcalcadaIdToDelete] = React.useState();
  const [directions, setDirections] = React.useState([]);
  const [origin, setOrigin] = React.useState('');
  const [destination, setDestination] = React.useState('');

  const body = {
    bairro,
    cep,
    cidade,
    comprimento,
    estado,
    faixaCalcada,
    fotoCalcada,
    fotoFaixa,
    fotoObstaculo,
    fotoPavimentacao,
    fotoPisoAlerta,
    fotoPisoDirecional,
    fotoPisoRampa,
    fotoTiposTravessia,
    inclinacao,
    larguraCalcada,
    lat,
    latf,
    lati,
    lng,
    lngf,
    lngi,
    logradouro,
    nota,
    numero,
    observacaoCalcada,
    observacaoEndereco,
    obstaculosCalcada,
    pavimentacaoCalcada,
    pisosRampas,
    tipoTravessia,
    acessivel
  };

  function getEvents() {
    axios
      .get(`${URL_BASE}/calcada/lista`)
      .then(function (response) {
        const events = response.data ;
        console.log("events", events);
        var Invertido = events.slice(0).reverse()
        setEvents(Invertido);
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
    console.log(calcadaId);
    if (calcadaId) {
      axios
        .put(`${URL_BASE}/calcada/${calcadaId}`, body)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.error(error);
        });
    } else {
      postEvents();
    }
  }

  function postEvents() {
    axios
      .post(`${URL_BASE}/calcada`, body)
      .then(function (response) { })
      .catch(function (error) {
        console.error(error);
      });
  }

  function deleteEvents() {
    axios
      .delete(`${URL_BASE}/calcada/${calcadaIdToDelete}`)
      .then(function (response) {
        setcalcadaIdToDelete(0);
      })
      .catch(function (error) {
        console.error(error);
      });
    // .then(() => location.reload());

    handleCloseDelete();
  }
  
  function exportToExcel(jsonData) {
    const ws = XLSX.utils.json_to_sheet(jsonData);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"});
    saveAs(data, "myFile.xlsx");
  }

 async function mapCreate(event) {
   
   
    setModalTitle("Mapa");
    setPath(event)
    setOrigin(event);
    setDestination(event)
  
    console.log('origin', event)
    handleOpen();
  }


  function editCreate(action: String, calcadaIdEdit?: string) {
    if (action === "edit") {
      setModalTitle("Editar calcada");
      setButtonTitle("Atualizar");
    } else {
      setModalTitle("Cadastrar calcada");
      setButtonTitle("Cadastrar");
    }
    events
      .filter((e) => e.calcadaId === calcadaIdEdit)
      .map((e) => {
        setBairro(e.bairro);
        setCep(e.cep);
        setCidade(e.cidade);
        setComprimento(e.comprimento);
        setEstado(e.estado);
        setFaixaCalcada(e.faixa_calcada);
        setFotoCalcada(e.foto_calcada);
        setFotoFaixa(e.foto_faixa);
        setFotoObstaculo(e.foto_obstaculo);
        setFotoPavimentacao(e.foto_pavimentacao);
        setFotoPisoAlerta(e.foto_piso_alerta);
        setFotoPisoDirecional(e.foto_piso_direcional);
        setFotoPisoRampa(e.foto_piso_rampa);
        setFotoTiposTravessia(e.foto_tipos_travessia);
        setInclinacao(e.inclinacao);
        setLarguraCalcada(e.largura_calcada);
        setLat(e.lat);
        setLatf(e.latf);
        setLati(e.lati);
        setLng(e.lng);
        setLngf(e.lngf);
        setLngi(e.lngi);
        setLogradouro(e.logradouro);
        setNota(e.nota);
        setNumero(e.numero);
        setObservacaoCalcada(e.observacao_calcada);
        setObservacaoEndereco(e.observacao_endereco);
        setObstaculosCalcada(e.obstaculos_calcada);
        setPavimentacaoCalcada(e.pavimentacao_calcada);
        setPisosRampas(e.pisos_rampas);
        setTipoTravessia(e.tipo_travessia);
        setAcessivel(e.acessivel);
      });
    handleOpen();
  }


 


  React.useEffect(() => {getEvents()}, []);

 
  


  return (
    <Tables>
      <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
        <TableTitle>Calçadas</TableTitle> <EditButton title="Exportar arquivo Xlsx"  onClick={()=>exportToExcel(events)}>
          <PrintIcon sx={{ color: "#fff" }} />
        </EditButton>
        <EditButton title="Abrir Mapa"   onClick={()=>console.log('abrir')}>
          <MapIcon sx={{ color: "#fff" }} />
        </EditButton>
      </Row>
    
     
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow style={{ backgroundColor: "#36B396" }}>
              <TableCell align="left">Id</TableCell>
              <TableCell align="left">Bairro</TableCell>
              <TableCell align="left">CEP</TableCell>
              <TableCell align="left">Cidade</TableCell>
              <TableCell align="left">Estado</TableCell>
              <TableCell align="left">Rua</TableCell>
              <TableCell align="left">Número</TableCell>
              <TableCell align="left">Comprimento</TableCell>
              <TableCell align="left">Largura Calçada</TableCell>
              <TableCell align="left">InclinaÇão</TableCell>
              <TableCell align="left">lat</TableCell>
              <TableCell align="left">latf</TableCell>
              <TableCell align="left">lati</TableCell>
              <TableCell align="left">lng</TableCell>
              <TableCell align="left">lngf</TableCell>
              <TableCell align="left">lngi</TableCell>
              <TableCell align="left">Observação Calçada</TableCell>
              <TableCell align="left">Observação Endereço</TableCell>
              <TableCell align="left">Obstaculos Calçada</TableCell>
              <TableCell align="left">PavimentacaoCalçada</TableCell>
              <TableCell align="left">Pisos Rampas</TableCell>
              <TableCell align="left">Tipo Travessia</TableCell>
              <TableCell align="left">Faixa Calçada</TableCell>
              <TableCell align="left">Foto Calçada</TableCell>
              <TableCell align="left">Foto Faixa</TableCell>
              <TableCell align="left">Foto Obstáculo</TableCell>
              <TableCell align="left">Foto Pavimentação</TableCell>
              {/* <TableCell align="left">Foto Piso Alerta</TableCell>
              <TableCell align="left">Foto Piso Direcional</TableCell> */}
              <TableCell align="left">Foto Piso Rampa</TableCell>
              <TableCell align="left">Foto Tipos Travessia</TableCell>
              <TableCell align="left">Avaliação Nota</TableCell>
              <TableCell align="left">Acessível</TableCell>
              <TableCell align="left">Mapa</TableCell>
              <TableCell align="left">Deletar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((event) => (
              <TableRow key={event.calcadaId}>
                <TableCell align="left">{event.calcadaId}</TableCell>
                <TableCell align="left">{event.bairro}</TableCell>
                <TableCell align="left">{event.cep}</TableCell>
                <TableCell align="left">{event.cidade}</TableCell>
                <TableCell align="left">{event.estado}</TableCell>
                <TableCell align="left">{!!event.logradouro ? (event.logradouro) : ("---")}</TableCell>
                <TableCell align="left">{!!event.numero ? (event.numero) : ("---")}</TableCell>
                <TableCell align="left">{event.comprimento}</TableCell>
                <TableCell align="left">{!!event.largura_calcada ? (event.largura_calcada) : ("---")}</TableCell>
                <TableCell align="left">{!!event.inclinacao ? (event.inclinacao) : ("---")}</TableCell>

                <TableCell align="left">{!!event.lat ? (event.lat) : ("---")}</TableCell>
                <TableCell align="left">{!!event.latf ? (event.latf) : ("---")}</TableCell>
                <TableCell align="left">{!!event.lati ? (event.lati) : ("---")}</TableCell>
                <TableCell align="left">{!!event.lng ? (event.lng) : ("---")}</TableCell>
                <TableCell align="left">{!!event.lngf ? (event.lngf) : ("---")}</TableCell>
                <TableCell align="left">{!!event.lngi ? (event.lngi) : ("---")}</TableCell>
                <TableCell align="left">{!!event.observacao_calcada ? (event.observacao_calcada) : ("---")}</TableCell>
                <TableCell align="left">{!!event.observacao_endereco ? (event.observacao_endereco) : ("---")}</TableCell>
                <TableCell align="left">{!!event.obstaculos_calcada ? (event.obstaculos_calcada) : ("---")}</TableCell>
                <TableCell align="left">{!!event.pavimentacao_calcada ? (event.pavimentacao_calcada) : ("---")}</TableCell>
                <TableCell align="left">{!!event.pisos_rampas ? (event.pisos_rampas) : ("---")}</TableCell>
                <TableCell align="left">{!!event.tipo_travessia ? (event.tipo_travessia) : ("---")}</TableCell>
                <TableCell align="left">{event.faixa_calcada}</TableCell>
                <TableCell align="left">
                  {!!event.foto_calcada ? (
                    <img
                      src={`${event.foto_calcada}`}
                      style={{ height: "40px" }}
                    />
                  ) : (
                    "foto não cadastrada"
                  )}
                </TableCell>
                <TableCell align="left">

                  {!!event.foto_faixa ? (
                    <img
                      src={`${event.foto_faixa}`}
                      style={{ height: "40px" }}
                    />
                  ) : (
                    "foto não cadastrada"
                  )}
                </TableCell>
                <TableCell align="left">
                  {!!event.foto_obstaculo ? (
                    <img
                      src={`${event.foto_obstaculo}`}
                      style={{ height: "40px" }}
                    />
                  ) : (
                    "foto não cadastrada"
                  )}
                </TableCell>
                <TableCell align="left">
                  {!!event.foto_pavimentacao ? (
                    <img
                      src={`${event.foto_pavimentacao}`}
                      style={{ height: "40px" }}
                    />
                  ) : (
                    "foto não cadastrada"
                  )}
                </TableCell>
               
                <TableCell align="left">
                  {!!event.foto_piso_rampa ? (
                    <img
                      src={`${event.foto_piso_rampa}`}
                      style={{ height: "40px" }}
                    />
                  ) : (
                    "foto não cadastrada"
                  )}
                </TableCell>
                <TableCell align="left">
                  {!!event.foto_tipos_travessia ? (
                    <img
                      src={`${event.foto_tipos_travessia}`}
                      style={{ height: "40px" }}
                    />
                  ) : (
                    "foto não cadastrada"
                  )}
                </TableCell>
                <TableCell align="left">{!!event.nota ? (event.nota) : ("---")}</TableCell>
                <TableCell align="left">{!!event.acessivel ? ("Sim") : ("Não")}</TableCell>

                <TableCell>



                  <EditButton onClick={() => mapCreate(event)}>
                    <MapIcon sx={{ color: "#fff" }} />
                  </EditButton>

                </TableCell>
               



                <TableCell align="left">
                  <DeleteButton
                    onClick={() => handleOpenDelete(event.calcadaId)}
                  >
                    <DeleteIcon sx={{ color: "#fff" }} />
                  </DeleteButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'Ver tudo', value: -1 }]}
              colSpan={3}
              count={events.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'Linhas por página',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>

      </TableContainer>
     
      <Modal
        open={open}
        onClose={handleCloseMap}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            {modalTitle}
          </Typography>
       
          <LoadScript  googleMapsApiKey="AIzaSyDZMRI9h697myJBT5VrqkWhDS-K3S5xK74" >
          <Directions props={[origin, destination]}  />  
          </LoadScript>
               
        
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
            Deletar calcada
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Deseja realmente deletar esse calcada?
          </Typography>
          <NoButton onClick={handleCloseDelete}>Não</NoButton>
          <YesButton onClick={() => deleteEvents()}>Sim</YesButton>
        </Box>
      </Modal>
    </Tables>
  );
}
