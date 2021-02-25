import { useState } from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import MuiAccordion from '@material-ui/core/Accordion'
import MuiAccordionSummary from '@material-ui/core/AccordionSummary'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import { dataUsers } from '../data/dataUsers'
import { dataChats } from '../data/dataChats'

const useStyles = makeStyles((theme) => ({
  persons: {
    maxHeight: '200px',
    overflowY: 'auto'
  },
  person: {
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, .03)',
    }
  },
  chat: {
    cursor: 'pointer',
    transition: 'all 300ms',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, .5)',
    }
  },
  forward: {
    height: '40px',
    width: '40px',
    marginLeft: 'auto',
    backgroundColor: 'rgba(255, 255, 255, .5)',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'all 300ms',
    '&:hover': {
      marginRight: '-5px',
      backgroundColor: 'rgba(255, 255, 255, .3)',
    }
  },
  description: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '20px'
  },
  name: {
    margin: 0,
    fontSize: '12px',
  },
  prof: {
    margin: 0,
    fontSize: '10px',
    opacity: '0.5'
  },
  curname: {
    margin: 0,
    fontSize: '18px',
  },
  curprof: {
    margin: 0,
    fontSize: '12px',
    opacity: '0.5'
  },
  header: {
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    backgroundColor: 'rgba(82, 83, 90, .1)',
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    fontSize: '12px'
  },
}))

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    borderRadius: '3px',
    boxShadow: 'none',
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion)

const AccordionSummary = withStyles({
  root: {
    backgroundColor: '#52535a',
    color: '#FFFF33',
    borderRadius: '3px',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    alignItems: 'center',
    marginLeft: '-6px',
    cursor: 'default',
    transition: 'all 300ms',
    '&$expanded': {
      margin: '15px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary)

export default function Chats() {
  const [expanded, setExpanded] = useState(false)
  const [users, setUsers] = useState(dataUsers)
  const [chats, setChats] = useState(dataChats)
  const currentUser = 7
  const classes = useStyles()

  const handleClick = (panel) => {
    setExpanded(expanded == panel ? false : panel)
  }


  const goToChat = (event) => {
    event.preventDefault()
    console.log('GO')
    console.log(event)
  }

  // Список чатов пользователя
  const accordion = chats.map((item, i) => {
    // Исключаем чаты, где не состоит текущий пользователь
    if (!item.users.filter((id) => {
      return id == currentUser
    }).length) return
    // Перебираем оставшиеся чаты и создаём из данных вёрстку
    const persons = item.users.map((personId) => {
      return users.filter((user) => {
        return user.id == personId
      })[0]
    }).map((person, i) => {
      // Убираем из списка участников чатов имя текущего пользователя
      if (person.id == currentUser) return
      // Остальных участников выводим в перечень
      return (
        <div className={classes.person} key={i}>
          <Avatar className={classes.small}>{person.firstName[0].toUpperCase()}{person.lastName[0].toUpperCase()}</Avatar>
          <div className={classes.description}>
            <p className={classes.name}>{person.firstName} {person.lastName}</p>
            <p className={classes.prof}>{person.profession}</p>
          </div>
        </div>
      )
    })
    return (
      <Accordion square expanded={expanded === `panel${i + 1}`} key={i}>
        <AccordionSummary aria-controls={`panel${i + 1}d-content`} id={`panel${i + 1}d-header`}>
          <Avatar className={classes.chat} onClick={()=>{handleClick(`panel${i + 1}`)}}>Чат</Avatar>
          <Typography className={classes.description}>{item.name}</Typography>
          <ArrowForwardIcon  className={classes.forward} onClick={goToChat}/>
        </AccordionSummary>
        <div className={classes.persons}>
          {persons}
        </div>
      </Accordion>
    )
  })

  // Список участников корпоративной сети
  const people = users.map((person, i) => {
    if (person.id == currentUser) return
    return (
      <div className={classes.person} key={i} onClick={goToChat}>
        <Avatar>{person.firstName[0].toUpperCase()}{person.lastName[0].toUpperCase()}</Avatar>
        <div className={classes.description}>
          <p className={classes.curname}>{person.firstName} {person.lastName}</p>
          <p className={classes.curprof}>{person.profession}</p>
        </div>
      </div>
    )
  })

  return (
    <>
      <div className={classes.header}>
        <Avatar>{users[currentUser].firstName[0].toUpperCase()}{users[currentUser].lastName[0].toUpperCase()}</Avatar>
        <div className={classes.description}>
          <p className={classes.curname}>{users[currentUser].firstName} {users[currentUser].lastName}</p>
          <p className={classes.curprof}>{users[currentUser].profession}</p>
        </div>

      </div>
      {accordion}
      {people}
    </>
  )
}
