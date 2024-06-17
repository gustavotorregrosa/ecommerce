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
import { useAuth } from '@/providers/authProvider';
import { useEffect } from 'react';

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

  const auth = useAuth()

  let _interval: NodeJS.Timeout
  let _timeout: NodeJS.Timeout

  // useEffect(() => {

  //   clearInterval(_interval)
  //   _interval = setInterval(() => {
  //     console.log(auth.showUser())
  //   }, 3000)

  //   // clearTimeout(_timeout)
  //   // _timeout = setTimeout(() => {
  //   //   auth.login({
  //   //     id: '123',
  //   //     email: 'gustavo.torregrosa@gmail.com',
  //   //     name: 'gustavo torregrosa',
  //   //     access_token: 'gustavo 23456',
  //   //     access_refresh_token: 'gustavo 098765'
  //   //   })

  //   // }, 20000)
    

  //   // setTimeout(() => {
  //   //   clearInterval(_interval)
  //   // }, 90000)
  // }, [])



  // setTimeout(() => {
  //   console.log('test 123')
  //   auth.login({
  //     id: '123',
  //     email: 'gustavo.torregrosa@gmail.com',
  //     name: 'gustavo torregrosa',
  //     access_token: 'gustavo 23456',
  //     access_refresh_token: 'gustavo 098765'
  //   })
  // }, 10000)

  // useEffect(() => {
  //   auth.renewAccessToken('test')
  // }, [])

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };


  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

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
