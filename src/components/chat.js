import { useState } from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import MuiAccordion from '@material-ui/core/Accordion'
import MuiAccordionSummary from '@material-ui/core/AccordionSummary'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import { dataUsers } from '../data/dataUsers'
import { dataChats } from '../data/dataChats'

const useStyles = makeStyles(() => ({
  person: {
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, .03)',
    }
  },
  description: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '20px'
  },
  name: {
    margin: 0
  },
  prof: {
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
  }
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
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary)

export default function Chats() {
  const [expanded, setExpanded] = useState('panel1')
  const [users, setUsers] = useState(dataUsers)
  const [chats, setChats] = useState(dataChats)
  const currentUser = 7
  const classes = useStyles()

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }

  const accordion = chats.map((item, i) => {
    // Исключаем чаты, где не состоит текущий пользователь
    const checkChat = item.users.filter((id) => {
      return id == currentUser
    })
    if (!checkChat.length) return
    // Перебираем оставшиеся чаты и создаём из данных вёрстку
    const persons = item.users.map((personId) => {
      return users.filter((user) => {
        return user.id == personId
      })[0]
    }).map((person, i) => {
      // Убираем из чатов имя текущего пользователя
      if (person.id == currentUser) return
      return (
        <div className={classes.person} key={i}>
          <Avatar>{person.firstName[0].toUpperCase()}{person.lastName[0].toUpperCase()}</Avatar>
          <div className={classes.description}>
            <p className={classes.name}>{person.firstName} {person.lastName}</p>
            <p className={classes.prof}>{person.profession}</p>
          </div>
        </div>
      )
    })
    return (
      <Accordion square expanded={expanded === `panel${i + 1}`} onChange={handleChange(`panel${i + 1}`)} key={i}>
        <AccordionSummary aria-controls={`panel${i + 1}d-conten`} id={`panel${i + 1}d-header`}>
          <Typography>{item.name}</Typography>
        </AccordionSummary>
        {persons}
      </Accordion>
    )
  })


  return (
    <>
      <div className={classes.header}>
        <Avatar>{users[currentUser].firstName[0].toUpperCase()}{users[currentUser].lastName[0].toUpperCase()}</Avatar>
        <div className={classes.description}>
          <p className={classes.name}>{users[currentUser].firstName} {users[currentUser].lastName}</p>
          <p className={classes.prof}>{users[currentUser].profession}</p>
        </div>

      </div>
      {accordion}
    </>
  )
}
