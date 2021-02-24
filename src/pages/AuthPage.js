import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    height: '100%',
    '& > *': {
      height: 'calc(100% - 90px)',
      width: '100%',
      padding: '20px',
      marginTop: '20px'
    },
  },
}))

export const AuthPage = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Paper elevation={3}>
      <h1>Авторизация</h1>
      <p>В процессе</p>
      </Paper>
    </div>
  )
}