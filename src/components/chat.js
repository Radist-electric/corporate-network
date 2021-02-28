import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { dataUsers } from '../data/dataUsers'
import { dataChats } from '../data/dataChats'
import { dataPersonalChat } from '../data/dataPersonalChat'
import { dataGroupChat } from '../data/dataGroupChat'
import Avatar from '@material-ui/core/Avatar'

const useStyles = makeStyles(() => ({
  header: {
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  description: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '20px'
  },
  name: {
    margin: 0,
    fontSize: '18px',
  },
  prof: {
    margin: 0,
    fontSize: '12px',
    color: 'rgba(0,0,0,0.5)'
  },
  chat: {
    overflowY: 'auto'
  },
  textWrap: {
    width: '80%',
    padding: '5px',
    marginBottom: '5px',
    borderRadius: '5px',
    backgroundColor: 'rgba(0,0,0,0.1)'
  },
  textWrapRight: {
    marginLeft: 'auto',
    backgroundColor: 'rgba(255,255,51,0.7)'
  },
  text: {
    margin: 0,
    fontSize: '14px'
  },
  date: {
    fontSize: '10px'
  },
  person: {
    color: '#FF0000',
    fontSize: '12px'
  }
}))

export const Chat = (props) => {
  // chatType (true - личный, false - групповой)
  const [chatType, setChatType] = useState(props.chatType)
  const [chatId, setChatId] = useState(props.chatId)
  const [dataChat, setDataChat] = useState(props.chatType == true ? dataPersonalChat : dataGroupChat)
  const currentUser = 7
  const classes = useStyles()

  useEffect(() => {
    console.log('useEffect Chat')
    setChatType(props.chatType)
    setChatId(props.chatId)
    setDataChat(props.chatType == true ? dataPersonalChat : dataGroupChat)
  })

  const header = chatType ?
    dataUsers.filter((item) => {
      return item.id == chatId
    }).map((person, i) => {
      return (
        <div className={classes.header} key={i}>
          <Avatar>{person.firstName[0].toUpperCase()}{person.lastName[0].toUpperCase()}</Avatar>
          <div className={classes.description}>
            <p className={classes.name}>{person.firstName} {person.lastName}</p>
            <p className={classes.prof}>{person.profession}</p>
          </div>
        </div>
      )
    })
    :
    dataChats.filter((item) => {
      return item.id == chatId
    }).map((chat, i) => {
      return (
        <div className={classes.header} key={i}>
          <Avatar>Чат</Avatar>
          <div className={classes.description}>
            <p className={classes.name}>{chat.name}</p>
            <p className={classes.prof}>Количество участников <span style={{ fontWeight: 700, color: 'rgba(0,0,0,1)' }}>{chat.users.length}</span></p>
          </div>
        </div>
      )
    })

  const getChat = dataChat.filter((item) => {
    return item.chatId == chatId
  })[0]
  const chat = getChat ?
    getChat.dialog.map((item, i) => {
      const name = dataUsers.filter((person) => {
        return person.id == item.id
      })[0]
      return (
        <div className={[classes.textWrap, item.id == currentUser ? classes.textWrapRight : ''].join(' ')} key={i}>
          {!chatType && <p className={[classes.text, classes.person].join(' ')}>{name.firstName} {name.lastName}</p>}
          <p className={classes.text}>{item.text}</p>
          <span className={classes.date}>{item.date.toLocaleDateString()} {item.date.toLocaleTimeString()}</span>
        </div>
      )
    })
    :
    <p className={classes.text}>Сообщений нет</p>


  return (
    <>
      {header}
      <hr />
      <div className={classes.chat}>
        {chat}
      </div>
    </>
  )
}