import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import logoAzul from '../../assets/logo_biomob.svg';
import { Link, useNavigate } from "react-router-dom";
import { Buffer } from 'buffer';
import { InputLogin } from "../../styles/Styles";
import '../../styles/Fontes.css';
import { Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import api from "../../Services/api";
// import api from '../../config/configUpload';

function LoginMaster() {
    const [login, setLogin] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
  
      useEffect(() => {
      }, []);
  
      const entrar = async () => {
  
          const user = await JSON.parse(localStorage.getItem("funcionario_info"));
       console.log("enter",user.funcionario_token)
  
          if (user.funcionario_nivel == 1) {
  
              navigate("/user");
              window.location.reload()
  
          } else if (user.funcionario_nivel == 2) {
  
              navigate("/calcadas");
              window.location.reload()
  
          }
  
      }
  
      const Entrar = async () => {
          setLoading(true);
    
          // Função de atraso
          const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        
          try {
            const response = await fetch("http://5devs.online:3007/biomob-api/user/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                login: login,
                password: senha,
              }),
            });
        
            const result = await response.json();
        
            if (response.ok) {
              localStorage.setItem(
                "funcionario_info",
                JSON.stringify({
                  funcionario_login: result.user.login,
                  funcionario_nome: result.user.name,
                  funcionario_role: result.user.role,
                  funcionario_telefone: result.user.telefone,
                  funcionario_email: result.user.email,
                  funcionario_doc: result.user.documento,
                  funcionario_nivel: result.user.nivel,
                  funcionario_token: result.token,
                })
              );
        
              // Atraso de 2 segundos
              await delay(2000);
        
              setLoading(false);
              if (result.user.login !== "") {
                entrar();
              } else {
                navigate("/");
                alert("Email ou senha incorretos");
              }
            } else {
              setLoading(false);
              navigate("/");
              alert("Email ou senha incorretos");
            }
          } catch (error) {
            setLoading(false);
            navigate("/");
            alert("Erro ao fazer login");
          }
        };
  
   
      const handleClickOpen = () => {
          setOpen(true);
      };
  
      const handleClose = () => {
          setOpen(false);
      };
  
    return (

        <Card 
       
            sx={{
                width: '100vw',
                height: '100vh',
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
               
                // --primary: #36B396;
            }}>

            <CardContent  sx={{  backgroundColor: "#36B396", borderRadius:'15px' }}>
                <Typography style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#36B396" 
                }}>
                    <img
                        src={logoAzul}
                        style={{
                            marginTop: "45px",
                            marginBottom: '50px',
                            align: "center",
                            width: "200px"
                        }}

                        alt='Logo livre' />
                </Typography>
                <Typography
                    component="div"
                    align="center"
                    marginTop="15px"
                    marginBottom='50px'
                    color="#FAFAFA"
                    fontWeight="bold"
                    fontSize={14}
                >BIOMOB®, Soluções Digitais para pessoas com deficiência
                </Typography>

                {loading ? <CircularProgress /> :
                    <><Container>
                        <InputLogin
                            
                            className="inputRounded"
                            variant='filled'
                            label='Email'
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                        />
                    </Container>
                        <Container>
                            <InputLogin
                            
                                sx={{
                                    marginTop: '5vh', marginBottom: '5vh',
                                    "& .MuiOutlinedInput-root:hover": {
                                        "& > fieldset": {
                                            borderColor: "#cfe9ff",
                                            fontFamily: 'Poppins',
                                        }
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#cfe9ff',
                                            WebkitPrintColorAdjust: '#000',
                                            fontFamily: 'Poppins',
                                        }
                                    },
                                    input: {
                                        "&:-webkit-autofill": {
                                            backgroundColor: "#000",
                                            backgroundClip: "text",
                                            fontFamily: 'Poppins',
                                        },
                                    },
                                }}
                                
                                className="inputRounded"
                                variant='filled'
                                label='Senha'
                                type='password'
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                        Entrar();
                                    }
                                }}
                            />

                        </Container>
                        <Container style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                   
                }}>
                        <Button onClick={Entrar} sx={{
                            marginBottom: '10px',
                            marginTop: '10px',
                            height: "50px",
                            backgroundColor: "#FAFAFA" ,
                            color: '#36B396',
                            fontWeight: "bold",
                            borderRadius: '10px',
                            width: '180px'
                        }} variant='contained'
                        >LOGIN</Button>
                        </Container>
                     
                    
                    </>
                }

            </CardContent>

        </Card>

    );
}

export default LoginMaster;

