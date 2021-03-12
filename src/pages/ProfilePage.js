import { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'
import { AppContext } from '../context/AppContext'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    height: '100%',
    maxHeight: 'calc(100% - 50px)',
    '& > *': {
      height: 'calc(100% - 40px)',
      width: '100%',
      padding: '20px',
      marginTop: '20px',
      overflowY: 'auto',
      [theme.breakpoints.down('sm')]: {
        height: 'calc(100% - 10px)',
      },
    },
  },
  card: {
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    backgroundColor: 'rgba(82, 83, 90, .1)',
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
    opacity: '0.5'
  },
}))

export const ProfilePage = () => {
  const { currentUser, users } = useContext(AppContext)
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        <h1>Личный кабинет</h1>
        <div className={classes.card}>
          <Avatar>{users[currentUser].firstName[0].toUpperCase()}{users[currentUser].lastName[0].toUpperCase()}</Avatar>
          <div className={classes.description}>
            <p className={classes.name}>{users[currentUser].firstName} {users[currentUser].lastName}</p>
            <p className={classes.prof}>{users[currentUser].profession}</p>
          </div>
        </div>
      </Paper>
    </div>
  )
}