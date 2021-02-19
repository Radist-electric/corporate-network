import { NavLink, useLocation } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import logo from '../images/logo.svg'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  logo: {
    marginRight: '50px',
  },
  link: {
    marginRight: '20px',
    color: '#FFFFFF',
    textDecoration: 'none'
  },
  active: {
    color: '#FFFF33'
  },
}))

export const Header = () => {
  const classes = useStyles()
  const curPath = useLocation().pathname

  return (
    <nav className={classes.root}>
      <NavLink to="/" className={classes.logo}><img src={logo} alt="logo" /></NavLink>
      <NavLink to="/" className={curPath === '/' ? [classes.active, classes.link].join(' ') : classes.link}>Чат</NavLink>
      <NavLink to="/auth" className={curPath === '/auth' ? [classes.active, classes.link].join(' ') : classes.link}>Авторизация</NavLink>
      <NavLink to="/profile" className={curPath === '/profile' ? [classes.active, classes.link].join(' ') : classes.link}>Личный кабинет</NavLink>
      <NavLink to="/about" className={curPath === '/about' ? [classes.active, classes.link].join(' ') : classes.link}>О чате</NavLink>
    </nav>
  )
}