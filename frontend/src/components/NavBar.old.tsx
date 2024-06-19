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
import { useRouter } from 'next/router'
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import {login, logout} from '@/store/user/user.slice'
import { useDispatch } from 'react-redux';
import { IState } from '@/store';
import { useSelector } from 'react-redux';
import { IUser } from '@/store/user/user.interface';
import { ConnectionServiceContext } from '@/context/ConnectionContext';

const pages: {
  name: string;
  page: string;
}[] = [
  {
    name: 'Categories',
    page: 'categories'
  },
  {
    name: 'Products',
    page: 'products'
  },
  {
    name: 'Stock Movimentations',
    page: 'stockMovimentations'
  },

]

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  const user = useSelector<IState, IUser>(state => state.user)
  const connectionService = React.useContext(ConnectionServiceContext)

  // React.useEffect(() => {
  //   const myInterval = setInterval(() => {
  //     console.log(connectionService?.store.getState())
  //   }, 2000)


  //   setTimeout(() => {
  //     connectionService?.store.dispatch(login({
  //       access_refresh_token: 'meu teste 1234455',
  //       access_token: 'blabla',
  //       email:'mais teste 2',
  //       id: '123345',
  //       name: '1234545 guga'
  //     }))
  //   }, 20000)


  //   return () => {
  //     clearInterval(myInterval)
  //   }
  // }, [])

  const router = useRouter()
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ThunderstormIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            style={{
              cursor: 'pointer'
            }}
            variant="h6"
            noWrap
            component="a"
            // href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
            onClick={() => {
              handleCloseNavMenu()
              router.push('/')
            }}
          >
            Cloud9
          </Typography>

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
                  <MenuItem key={page.page} onClick={() => {
                    handleCloseNavMenu()
                   router.push(page.page)
                    }}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>   
              ))}
            </Menu>
          </Box>

          <ThunderstormIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          
          <Typography
            variant="h5"
            noWrap
            component="a"
            style={{
              cursor: 'pointer'
            }}
            // href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Cloud9
          </Typography>
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
                <Button
                  key={page.page}
                  onClick={() => {
                    handleCloseNavMenu()
                    router.push(page.page)
                  }}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.name}
                </Button>
            ))}
          </Box>


        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
