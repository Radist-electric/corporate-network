import { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Header } from './components/header'
import { useRoutes } from './routes'
import { AppContext } from './context/AppContext'
import Paper from '@material-ui/core/Paper'
import bg from './images/bg-1200.png'
import { dataPersonalChat } from './data/dataPersonalChat'
import { dataGroupChat } from './data/dataGroupChat'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: '20px auto',
      height: '100vh',
      maxHeight: 'calc(100vh - 40px)',
      maxWidth: '1280px',
      width: '100%',
      padding: '20px',
      backgroundImage: `url(${bg})`,
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      [theme.breakpoints.down('sm')]: {
        maxHeight: 'calc(100vh - 10px)',
        minHeight: '100vh',
        margin: 0,
        padding: '10px'
      },
    },
  }
}))

const wideScreen = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) >= 960

const App = () => {
  const isAuth = true
  const classes = useStyles()
  const routes = useRoutes(isAuth)
  const currentUser = 7
  const [chatType, setChatType] = useState(false) // chatType (true - личный, false - групповой)
  const [chatId, setChatId] = useState(0)
  const [showChat, setShowChat] = useState(wideScreen)
  const [chatPersonal, setChatPersonal] = useState(dataPersonalChat)
  const [chatGroup, setChatGroup] = useState(dataGroupChat)

  const dialogHandler = (type, id) => {
    setChatType(type)
    setChatId(id)
    if (!wideScreen) { setShowChat(true) }
  }

  const chatHandler = () => {
    if (!wideScreen) { setShowChat(false) }
  }

  const changeChatPersonal = (newChat) => {
    setChatPersonal(newChat)
  }

  const changeChatGroup = (newChat) => {
    setChatGroup(newChat)
  }
  
  return (
    <AppContext.Provider value={{ isAuth, chatType, chatId, dialogHandler, chatHandler, wideScreen, showChat, currentUser, chatPersonal, chatGroup, changeChatPersonal, changeChatGroup }}>
      <Router>
        <div className={classes.root}>
          <Paper elevation={3}>
            <Header />
            {routes}
          </Paper>
        </div>
      </Router>
    </AppContext.Provider>

  )
}

export default App
