import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Logo from '../../assets/logo_biomob.svg';
import { Image } from './styles';
import { useNavigate } from 'react-router-dom';

const pages = [

  // { id: 1, description: 'Home' },
  { id: 2, description: 'Usuários' },
  { id: 3, description: 'Eventos' },
  { id: 4, description: 'Empregos' },
  { id: 5, description: 'Estacionamento' },
  { id: 6, description: 'Calçadas' },

];

const pagesCalcadas = [
  { id: 6, description: 'Calçadas' },

];




export function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [nivel, setNivel] = React.useState<boolean | HTMLElement>(false);
  const [token, setToken] = React.useState<boolean | HTMLElement>(false);
  const navigate = useNavigate();

  const getNivel = async () => {
    const user = await JSON.parse(localStorage.getItem("funcionario_info") ?? "{}") as any;
    if (user.funcionario_nivel == 1) {
      setNivel(true);

    }

  }
  const geToken = async () => {

    const user = await JSON.parse(localStorage.getItem("funcionario_info" ?? "{}") as any);
    let jwt = user.funcionario_token;
    if (jwt != null) {
      setToken(true)
    } else {
      setToken(false)
    }
  }

  React.useEffect(() => {
    getNivel();
    geToken();
  }, [])

  const sair = () => {
    localStorage.clear();
    navigate("/")
    window.location.reload();
  }


  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };


  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  function handleNavigation(page: number): void {
    console.log(page);

    switch (page) {
      case 1: navigate("/");
        break;
      case 2: navigate("/user");
        break;
      case 3: navigate("/event");
        break;
      case 4: navigate("/job");
        break;
      case 5: navigate("/parking");
        break;
        case 6: navigate("/calcadas");
        break;
      
    }
  };


  return (
    <AppBar position="static" sx={{
      backgroundColor: '#36B396',
    }}>
      <Container maxWidth="xl" >
        <Toolbar disableGutters>
          <Image src={Logo} alt="biomob" />

      {token &&
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.description}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
           }

      {token&&    <>
           {!!nivel ? <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

            {pages.map((page) => (
              <Button
                key={page.id}
                onClick={() => handleNavigation(page.id)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.description}
              </Button>
            ))}
          </Box> : <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pagesCalcadas.map((p) => (
              <Button
                key={p.id}
                onClick={() => handleNavigation(p.id)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {p.description}
              </Button>
            ))}
          </Box>}
         
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
           
              <Button
              
                onClick={sair}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
              Sair
              </Button>
            
          </Box>
          </>}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
