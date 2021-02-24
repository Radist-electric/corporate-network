import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    height: '100%',
    '& > *': {
      height: 'calc(100% - 90px)',
      padding: '20px',
      marginTop: '20px'
    },
  },
  chats: {
    width: '30%',
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    },
  },
  chat: {
    width: '70%',
    marginLeft: '-10px',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      display: 'none',
    },
  },
}))

export const ChatPage = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Paper elevation={0} className={classes.chats} square/>
      <Paper elevation={5} className={classes.chat}/>
    </div>
  )
}
