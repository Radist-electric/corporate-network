import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import logo from '../images/logo.svg'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    height: '70px'
  },
  logo: {
    marginRight: '50px',
  },
  link: {
    marginRight: '20px',
    lineHeight: '25px',
    color: '#FFFFFF',
    textDecoration: 'none'
  },
  active: {
    color: '#FFFF33'
  },
  menu: {
    display: 'flex',
    marginLeft: 'auto',
    [theme.breakpoints.down('sm')]: {
      zIndex: 1,
      position: 'absolute',
      top: '50px',
      right: 0,
      display: 'none',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      padding: '10px',
      backgroundColor: '#454545',
      borderRadius: '5px'
    },
  },
  drop: {
    display: 'flex'
  },
  burger: {
    display: 'none',
    marginLeft: 'auto',
    color: '#FFFFFF',
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  }
}))


export const Header = () => {
  const classes = useStyles()
  const curPath = useLocation().pathname
  const [menu, setMenu] = useState(false)

  const menuClasses = [classes.menu]

  if (menu) {
    menuClasses.push(classes.drop)
  }

  const toggleMenu = () => {
    setMenu(!menu)
  }
  const hideMenu = () => {
    setMenu(false)
  }

  return (
    <nav className={classes.root}>
      <NavLink to="/" className={classes.logo}><img src={logo} alt="logo" /></NavLink>
      <div className={menuClasses.join(' ')}>
        <NavLink to="/" className={curPath === '/' ? [classes.active, classes.link].join(' ') : classes.link} onClick={hideMenu}>Чат</NavLink>
        <NavLink to="/auth" className={curPath === '/auth' ? [classes.active, classes.link].join(' ') : classes.link} onClick={hideMenu}>Авторизация</NavLink>
        <NavLink to="/profile" className={curPath === '/profile' ? [classes.active, classes.link].join(' ') : classes.link} onClick={hideMenu}>Личный кабинет</NavLink>
        <NavLink to="/about" className={curPath === '/about' ? [classes.active, classes.link].join(' ') : classes.link} onClick={hideMenu}>О чате</NavLink>
      </div>
      <MenuIcon className={classes.burger}  onClick={toggleMenu} />
    </nav>

  )
}
