import { useState, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Header } from './components/header'
import { useRoutes } from './routes'
import { AppContext } from './context/AppContext'
import Paper from '@material-ui/core/Paper'
import bg from './images/bg-1200.png'
import { dataPersonalChatInit } from './data/dataPersonalChat'
import { dataGroupChatInit } from './data/dataGroupChat'
import { dataUsersInit } from './data/dataUsers'
import { dataChatsInit } from './data/dataChats'

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

const isLocalStorage = storageAvailable('localStorage')
const storageCurrentUserName = 'currentUser',
  storageDataUsersName = 'dataUsers'
let dataCurrentUser,
  dataUsers

if (isLocalStorage) {
  dataCurrentUser = JSON.parse(localStorage.getItem(storageCurrentUserName))
  dataUsers = JSON.parse(localStorage.getItem(storageDataUsersName))
  // Если в LocalStorage нет данных пользователей, то подгружаем стартовый набор
  if (!dataUsers) {
    localStorage.setItem(storageDataUsersName, JSON.stringify(dataUsersInit))
    dataUsers = dataUsersInit
  }
  if (!dataCurrentUser) {
    dataCurrentUser = dataUsers.length - 1
    localStorage.setItem(storageCurrentUserName, JSON.stringify(dataCurrentUser))
  }
} else {
  dataUsers = dataUsersInit
  dataCurrentUser = dataUsers.length - 1
}

let storagePersonalChatName = `dataPersonalChat-${dataCurrentUser}`
const storageGroupChatName = 'dataGroupChat',
  storageDataChatsName = 'dataChats'

let dataPersonalChat,
  dataGroupChat,
  dataChats

if (isLocalStorage) {
  // Получаем данные из LocalStorage
  dataPersonalChat = JSON.parse(localStorage.getItem(storagePersonalChatName))
  dataGroupChat = JSON.parse(localStorage.getItem(storageGroupChatName))
  dataChats = JSON.parse(localStorage.getItem(storageDataChatsName))
  // Если в LocalStorage нет данных личных чатов текущего пользователя, то подгружаем стартовый набор
  if (!dataPersonalChat) {
    localStorage.setItem(storagePersonalChatName, JSON.stringify(dataPersonalChatInit))
    dataPersonalChat = dataPersonalChatInit
  }
  // Если в LocalStorage нет данных группового чата, то подгружаем стартовый набор
  if (!dataGroupChat) {
    localStorage.setItem(storageGroupChatName, JSON.stringify(dataGroupChatInit))
    dataGroupChat = dataGroupChatInit
  }
  // Если в LocalStorage нет данных о чатах, то подгружаем стартовый набор
  if (!dataChats) {
    localStorage.setItem(storageDataChatsName, JSON.stringify(dataChatsInit))
    dataChats = dataChatsInit
  }
} else {
  // Если LocalStorage не доступен в браузере, то загружаем все данные из стартового набора
  dataPersonalChat = dataPersonalChatInit
  dataGroupChat = dataGroupChatInit
  dataChats = dataChatsInit
}

function storageAvailable(type) {
  try {
    var storage = window[type],
      x = '__storage_test__'
    storage.setItem(x, x)
    storage.removeItem(x)
    return true
  }
  catch (e) {
    return false
  }
}

// Найдём первый попавшийся групповой чат, куда имеет доступ имеющийся пользователь
const findFirstGroupChat = dataChats.filter((item) => {
  return item.users.find(el => el == dataCurrentUser) != undefined
})[0].id

const App = () => {
  const isAuth = true
  const classes = useStyles()
  const routes = useRoutes(isAuth)
  const [chatType, setChatType] = useState(false) // chatType (true - личный, false - групповой)
  const [chatId, setChatId] = useState(findFirstGroupChat)
  const [showChat, setShowChat] = useState(wideScreen)
  const [chatPersonal, setChatPersonal] = useState(dataPersonalChat)
  const [chatGroup, setChatGroup] = useState(dataGroupChat)
  const [users, setUsers] = useState(dataUsers)
  const [chats, setChats] = useState(dataChats)
  const [currentUser, setCurrentUser] = useState(dataCurrentUser)

  // При обновлении данных личного чата сохраняем их в LocaleStorage
  useEffect(() => {
    localStorage.setItem(storagePersonalChatName, JSON.stringify(chatPersonal))
  }, [chatPersonal])

  // При обновлении данных группового чата сохраняем их в LocaleStorage
  useEffect(() => {
    localStorage.setItem(storageGroupChatName, JSON.stringify(chatGroup))
  }, [chatGroup])

  // При обновлении данных чатов сохраняем их в LocaleStorage
  useEffect(() => {
    localStorage.setItem(storageDataChatsName, JSON.stringify(chats))
  }, [chats])

  // При обновлении данных пользователей сохраняем их в LocaleStorage
  useEffect(() => {
    localStorage.setItem(storageDataUsersName, JSON.stringify(users))
    const newId = users.length - 1
    setCurrentUser(newId)
    localStorage.setItem(storageCurrentUserName, JSON.stringify(newId))
    storagePersonalChatName = `dataPersonalChat-${newId}`
    // Если такого id пользователя нет в чате "Флуд",
    if (chats[1].users.find(item => item == newId) == undefined) {
      // то добавляем туда новый id пользователя
      let newChats = [...chats]
      newChats[1].users.push(newId)
      setChats(newChats)
    }
  }, [users])

  // При обновлении текущего пользователя получаем данные текущего чата из LocaleStorage
  useEffect(() => {
    if (isLocalStorage) {
      // Получаем данные из LocalStorage
      dataPersonalChat = JSON.parse(localStorage.getItem(storagePersonalChatName))
      // Если в LocalStorage нет данных этого личного чата, то создаём пустой чат
      if (!dataPersonalChat) {
        localStorage.setItem(storagePersonalChatName, JSON.stringify([]))
        dataPersonalChat = []
      }
    } else {
      // Если LocalStorage не доступен в браузере, то создаём пустой чат
      dataPersonalChat = []
    }
    setChatPersonal(dataPersonalChat)

    // Найдём первый попавшийся групповой чат, куда имеет доступ новый пользователь
    const findFirstGroupChat = chats.filter((item) => {
      return item.users.find(el => el == currentUser) != undefined
    })[0].id
    // и переключим его на этот групповой чат
    setChatId(findFirstGroupChat)
    setChatType(false)

  }, [currentUser])

  // Показать окно чата, если оно скрыто на малых экранах
  const dialogHandler = (type, id) => {
    setChatType(type)
    setChatId(id)
    if (!wideScreen) { setShowChat(true) }
  }

  // Скрыть окно чата на малых экранах
  const chatHandler = () => {
    if (!wideScreen) { setShowChat(false) }
  }

  // Изменить данные личного чата
  const changeChatPersonal = (newChat) => {
    setChatPersonal(newChat)
  }

  // Изменить данные группового чата
  const changeChatGroup = (newChat) => {
    setChatGroup(newChat)
  }

  // Добавить нового пользователя
  const addNewUser = (newPerson) => {
    newPerson.id = users.length
    const newDataUsers = [...users, newPerson]
    setUsers(newDataUsers)
  }

  return (
    <AppContext.Provider value={{ isAuth, chatType, chatId, dialogHandler, chatHandler, wideScreen, showChat, currentUser, chatPersonal, chatGroup, users, chats, changeChatPersonal, changeChatGroup, addNewUser }}>
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
