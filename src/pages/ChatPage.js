import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import {ChatList} from '../components/chatList'
import {Chat} from '../components/chat'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    height: '100%',
    maxHeight: 'calc(100% - 50px)',
    '& > *': {
      height: 'calc(100% - 40px)',
      padding: '20px',
      marginTop: '20px'
    },
  },
  chats: {
    width: '30%',
    overflowY: 'auto',
    [theme.breakpoints.down('md')]: {
      width: '40%'
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    },
  },
  chat: {
    width: 'calc(70% - 10px)',
    [theme.breakpoints.down('md')]: {
      width: 'calc(60% - 10px)'
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      display: 'none',
    },
  },
}))

export const ChatPage = () => {
  const classes = useStyles()


  return (
    <div className={classes.root}>
      <Paper elevation={5} className={[classes.chats, 'scroll-bar'].join(' ')}>
        <ChatList/>
      </Paper>
      <Paper elevation={5} className={classes.chat}>
        <Chat chatData={[true, 1]}/>
      </Paper>
    </div>
  )
}
