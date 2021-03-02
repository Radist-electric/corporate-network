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

export const AboutPage = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Paper elevation={3}>
      <h1>О чате</h1>
      <p>С недавних пор все сотрудники компании TOT Systems были переведены на самоизоляцию, но продолжают работать удаленно. Из-за того, что стало невозможным собираться у кулера, многие пребывают в растерянности, испытывают чувство одиночества и теряют связь с командой.</p>
      <p>Директор, Василий Иванович, очень заботится о психическом здоровье и эффективности своих сотрудников, поэтому он принял решение помочь работникам не сойти с ума и восстановить контакт. С этой целью была реализована для сотрудников корпоративная сеть для общения онлайн.</p>
      </Paper>
    </div>
  )
}