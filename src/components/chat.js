import { useState, useEffect, useRef, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import { dataUsers } from '../data/dataUsers'
import { dataChats } from '../data/dataChats'
import PostAddForm from './postAddForm'
import PostMenu from './postMenu'
import { AppContext } from '../context/AppContext'


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
    overflowY: 'auto',
    maxHeight: 'calc(100% - 135px)',
    minHeight: 'calc(100% - 135px)',
  },
  textWrap: {
    position: 'relative',
    width: '80%',
    padding: '5px 20px 5px 5px',
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
  },
  empty: {
    height: '0',
    width: '100%'
  },
  back: {
    height: '40px',
    width: '40px',
    marginRight: '20px',
    fontSize: '24px',
    backgroundColor: 'rgba(0, 0, 0, .3)',
    borderRadius: '50%',
    cursor: 'pointer',
    color: '#FFFF33',
    transition: 'all 300ms',
    '&:hover': {
      marginLeft: '-5px',
      marginRight: '25px',
      backgroundColor: 'rgba(0, 0, 0, .5)',
    }
  },
}))

export const Chat = () => {
  const { chatType, chatId, wideScreen, chatHandler, currentUser, chatPersonal, chatGroup, changeChatPersonal, changeChatGroup } = useContext(AppContext)
  const empty = useRef(null)
  const classes = useStyles()
  const [editValue, setEditValue] = useState({
    value: '',
    postId: null
  })

  useEffect(() => {
    // Скролл чата вниз до последнего сообщения
    empty.current.scrollIntoView()
  })

  const getMenuData = (actionType, postId) => {
    if (actionType == 'remove') {
      removePost(postId)
    } else if (actionType == 'edit') {
      const currentChat = chatType ? chatPersonal : chatGroup
      const index = currentChat.findIndex(elem => elem.chatId === chatId)
      const currentDialog = currentChat[index]
      setEditValue({
        value: currentDialog.dialog[postId].text,
        postId
      })
    }
  }

  // Удалить запись
  const removePost = (postId) => {
    const currentChat = chatType ? chatPersonal : chatGroup
    const index = currentChat.findIndex(elem => elem.chatId === chatId)
    const currentDialog = currentChat[index]
    currentDialog.dialog.splice(postId, 1)
    const newChat = [...currentChat.slice(0, index), currentDialog, ...currentChat.slice(index + 1)]
    if (chatType) {
      changeChatPersonal(newChat)
    } else {
      changeChatGroup(newChat)
    }
  }

  //Добавить или редактировать запись
  const addPost = (post, postId) => {

    const newPost = {
      id: currentUser,
      date: new Date(),
      text: post
    }

    let newChat
    const currentChat = chatType ? chatPersonal : chatGroup
    const index = currentChat.findIndex(elem => elem.chatId === chatId)

    // Новая запись в пустом чате
    if (index == -1 && !editValue.value) {
      const newDialog = {
        chatId: chatId,
        dialog: [newPost]
      }
      newChat = [...currentChat, newDialog]
      // Новая запись в непустом чате
    } else if (!editValue.value) {
      const currentDialog = currentChat[index]
      currentDialog.dialog.push(newPost)
      newChat = [...currentChat.slice(0, index), currentDialog, ...currentChat.slice(index + 1)]
      // Редактировать запись
    } else {
      const currentDialog = currentChat[index]
      currentDialog.dialog[postId].text = post
      currentDialog.dialog[postId].date = new Date()
      newChat = [...currentChat.slice(0, index), currentDialog, ...currentChat.slice(index + 1)]

      setEditValue({
        value: '',
        postId: null
      })

    }

    if (chatType) {
      changeChatPersonal(newChat)
    } else {
      changeChatGroup(newChat)
    }
  }

  // Создать шапку чата
  const header = chatType ?
    dataUsers.filter((item) => {
      return item.id == chatId
    }).map((person, i) => {
      return (
        <div className={classes.header} key={i}>
          {!wideScreen && <KeyboardBackspaceIcon className={classes.back} onClick={chatHandler} />}
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
          {!wideScreen && <KeyboardBackspaceIcon className={classes.back} onClick={chatHandler} />}
          <Avatar>Чат</Avatar>
          <div className={classes.description}>
            <p className={classes.name}>{chat.name}</p>
            <p className={classes.prof}>Количество участников <span style={{ fontWeight: 700, color: 'rgba(0,0,0,1)' }}>{chat.users.length}</span></p>
          </div>
        </div>
      )
    })

  // Создать тело чата
  const getChat = chatType ? chatPersonal : chatGroup
  const showChat = getChat.filter((item) => {
    return item.chatId == chatId
  })[0]
  const chat = showChat ?
    showChat.dialog.map((item, i) => {
      const name = dataUsers.filter((person) => {
        return person.id == item.id
      })[0]
      return (
        <div className={[classes.textWrap, item.id == currentUser ? classes.textWrapRight : ''].join(' ')} key={i}>
          {!chatType && <p className={[classes.text, classes.person].join(' ')}>{name.firstName} {name.lastName}</p>}
          <p className={classes.text}>{item.text}</p>
          <span className={classes.date}>{item.date.toLocaleDateString()} {item.date.toLocaleTimeString()}</span>
          <PostMenu getMenuData={getMenuData} postId={i} />
        </div>
      )
    })
    :
    <p className={classes.text}>Сообщений нет</p>


  return (
    <>
      {header}
      <hr />
      <div className={[classes.chat, 'scroll-bar'].join(' ')}>
        {chat}
        <div className={classes.empty} ref={empty}></div>
      </div>
      <PostAddForm addPost={addPost} editValue={editValue} />
    </>
  )
}