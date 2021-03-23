import { useState, useEffect, useRef, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
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
    width: '85%',
    padding: '5px 50px 5px 5px',
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
  const { isLocalStorage, chatType, chatId, wideScreen, chatHandler, currentUser, chatPersonal, chatGroup, users, chats, changeChatPersonal, changeChatGroup } = useContext(AppContext)
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
      // Для личного чата запись удаляется только у текущего пользователя.
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

    let newChat,
      editedPostDate
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
      editedPostDate = currentDialog.dialog[postId].date
      currentDialog.dialog[postId].date = new Date()
      newChat = [...currentChat.slice(0, index), currentDialog, ...currentChat.slice(index + 1)]

      setEditValue({
        value: '',
        postId: null
      })

    }

    if (chatType) {
      changeChatPersonal(newChat)
      // Создаём запись в личном чате собеседника при работающем LocalStorage
      if (isLocalStorage) {
        let storageCompanionChatName = `dataPersonalChat-${chatId}`,
          dataCompanionChat

        // Получаем данные из LocalStorage
        dataCompanionChat = JSON.parse(localStorage.getItem(storageCompanionChatName))
        if (!dataCompanionChat) {
          localStorage.setItem(storageCompanionChatName, JSON.stringify([]))
          dataCompanionChat = JSON.parse(JSON.stringify([]))
        }

        const newDialog = {
          chatId: currentUser,
          dialog: [newPost]
        }

        const index = dataCompanionChat.findIndex(elem => elem.chatId === currentUser)
        // Если у собеседника вообще нет личных чатов или есть чаты, но не с текущим пользователем, то добавляем ему новый чат и делаем запись в LocalStorage,
        if (index == -1 && !editValue.value) {
          newChat = [...dataCompanionChat, newDialog]
          localStorage.setItem(storageCompanionChatName, JSON.stringify(newChat))
          // иначе редактируем уже существующий чат.
        } else if (!editValue.value) {
          const currentDialog = dataCompanionChat[index]
          currentDialog.dialog.push(newPost)
          newChat = [...dataCompanionChat.slice(0, index), currentDialog, ...dataCompanionChat.slice(index + 1)]
          localStorage.setItem(storageCompanionChatName, JSON.stringify(newChat))
          // Редактируем запись у собеседника
        } else {
          const currentDialog = dataCompanionChat[index]
          if (!currentDialog) return
          let postIndex = null
          // Ищем в диалогах себеседника редактируемую запись. Используем в выборке время создания записи.
          const currentPost = currentDialog.dialog.filter((post, index) => {
            let postTime = Date.parse(post.date).toString()
            let editPostTime = Date.parse(editedPostDate).toString()
            // Так как editPostTime не содержит миллисекунд, то для сравнения обрезаем последние 3 цифры
            if (postTime.substr(0, postTime.length - 3) == editPostTime.substr(0, editPostTime.length - 3)) {
              postIndex = index
            }
            return postTime.substr(0, postTime.length - 3) == editPostTime.substr(0, editPostTime.length - 3)
          })
          currentDialog.dialog[postIndex].text = post
          currentDialog.dialog[postIndex].date = new Date()
          newChat = [...dataCompanionChat.slice(0, index), currentDialog, ...dataCompanionChat.slice(index + 1)]
          localStorage.setItem(storageCompanionChatName, JSON.stringify(newChat))
        }
      }
    } else {
      changeChatGroup(newChat)
    }

  }

  // Создать шапку чата
  const header = chatType ?
    users.filter((item) => {
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
    chats.filter((item) => {
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
      const name = users.filter((person) => {
        return person.id == item.id
      })[0]
      const date = new Date(Date.parse(item.date))
      return (
        <div className={[classes.textWrap, item.id == currentUser ? classes.textWrapRight : ''].join(' ')} key={i}>
          {!chatType && <p className={[classes.text, classes.person].join(' ')}>{name.firstName} {name.lastName}</p>}
          <p className={classes.text}>{item.text}</p>
          <span className={classes.date}>{date.toLocaleDateString()} {date.toLocaleTimeString()}</span>
          {item.id == currentUser && <PostMenu getMenuData={getMenuData} postId={i} />}
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