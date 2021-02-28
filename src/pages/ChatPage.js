import {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import { ChatList } from '../components/chatList'
import { Chat } from '../components/chat'

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
  const [chatType, setChatType] = useState(false)
  const [chatId, setChatId] = useState(0)
  const classes = useStyles()

  // Перейти к диалогу
  const goToDialog = (type, id) => {
    setChatType(type)
    setChatId(id)
  }


  return (
    <div className={classes.root}>
      <Paper elevation={5} className={[classes.chats, 'scroll-bar'].join(' ')}>
        <ChatList goToDialog={goToDialog} />
      </Paper>
      <Paper elevation={5} className={classes.chat}>
        <Chat chatType={chatType} chatId={chatId}/>
      </Paper>
    </div>
  )
}
