import {createContext} from 'react'

function noop() {}

export const AppContext = createContext({
  isAuth: true,
  chatType: false,
  chatId: 0,
  dialogHandler: noop,
  chatHandler: noop,
  wideScreen: null,
  showChat: false,
  currentUser: null,
  chatPersonal: [],
  chatGroup: [],
  users: [],
  chats: [],
  changeChatPersonal: noop,
  changeChatGroup: noop,
  addNewUser: noop,
  loginUser: noop
})