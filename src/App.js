import { BrowserRouter as Router } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Header } from './components/header'
import { useRoutes } from './routes'
import Paper from '@material-ui/core/Paper'
import bg from './images/bg-1200.png'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',

    '& > *': {
      margin: '20px auto',
      minHeight: 'calc(100vh - 40px)',
      maxWidth: '1200px',
      width: '100%',
      padding: '20px',
      backgroundImage: `url(${bg})`,
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'
    }
  }
}))



const App = () => {
  const classes = useStyles()
  const isAuth = true
  const routes = useRoutes(isAuth)

  return (
    <Router>
      <div className={classes.root}>
        <Paper elevation={3}>
          <Header />
          {routes}
        </Paper>
      </div>
    </Router>
  )
}

export default App
