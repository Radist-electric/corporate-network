import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

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
      [theme.breakpoints.down('sm')]: {
        height: 'calc(100% - 10px)',
      },
    },
  },
}))

export const ProfilePage = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        <h1>Личный кабинет</h1>
        <p>В процессе</p>
      </Paper>
    </div>
  )
}