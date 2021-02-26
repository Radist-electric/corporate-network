import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { dataUsers } from '../data/dataUsers'
import { dataChats } from '../data/dataChats'
import { dataPersonalChat } from '../data/dataPersonalChat'
import { dataGroupChat } from '../data/dataGroupChat'
import Avatar from '@material-ui/core/Avatar'

const useStyles = makeStyles((theme) => ({
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
}))

export const Chat = (props) => {
  // chatType (true - личный, false - групповой)
  const [chatType, setChatType] = useState(props.chatData[0])
  const [chatId, setChatId] = useState(props.chatData[1])
  const [dataChat, setDataChat] = useState(props.chatData[0] == true ? dataPersonalChat : dataGroupChat)
  const classes = useStyles()

  console.log('chatType', chatType)
  console.log('chatId', chatId)
  console.log('dataChat', dataChat)

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

  return (
    <>
      {header}
      <hr />
      <div className={classes.chat}>

      </div>
    </>
  )
}