import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import { ChatList } from '../components/chatList'
import { Chat } from '../components/chat'

const wideScreen = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) >= 960

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
      width: '100%'
    },
  },
  hide: {
    display: 'none'
  }
}))

export const ChatPage = () => {
  const [chatType, setChatType] = useState(false)
  const [chatId, setChatId] = useState(0)
  const [showChat, setShowChat] = useState(wideScreen)
  const classes = useStyles()

  // Перейти к диалогу
  const goToDialog = (type, id) => {
    setChatType(type)
    setChatId(id)
    if (!wideScreen) { setShowChat(true) }
  }

  // Вернуться к списку чатов
  const goToChatList = () => {
    if (!wideScreen) { setShowChat(false) }
  }

  return (
    <div className={classes.root}>
      {(wideScreen || !showChat) && <Paper elevation={5} className={[classes.chats, 'scroll-bar'].join(' ')}>
        <ChatList
          goToDialog={goToDialog} />
      </Paper>}
      {showChat && <Paper elevation={5} className={classes.chat}>
        <Chat
          chatType={chatType}
          chatId={chatId}
          wideScreen={wideScreen}
          goToChatList={goToChatList} />
      </Paper>}
    </div>
  )
}
