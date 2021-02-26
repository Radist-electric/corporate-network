import { useState } from 'react'

export const Chat = (props) => {
const [chatType, setChatType] = useState(props.chatData[0])
const [chatId, setChatId] = useState(props.chatData[1])
console.log('chatType', chatType)
console.log('chatId', chatId)

  return (
    <>
    'Hi'
    </>
  )
}