import { useState, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import is from 'is_js'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
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
  inputBlock: {
    paddingLeft: '0',
    listStyle: 'none'
  },
  input: {
    width: '500px',
    maxWidth: '100%',
    paddingBottom: '30px',
    '& .MuiOutlinedInput-input': {
      padding: '10px',
    },
    '& label': {
      transform: ' translate(10px, 12px) scale(1)'
    },
  },
  button: {
    width: '500px',
    maxWidth: '100%'
  },
}))

const dataPersonRegister = [
  {
    label: 'Электронная почта',
    type: 'email',
    error: false,
    helperText: 'Введите правильно электронную почту',
    helperTextExist: 'Такой пользователь уже существует',
    value: ''
  },
  {
    label: 'Пароль',
    type: 'password',
    error: false,
    helperText: 'Пароль должен быть не менее 6 символов',
    value: ''
  },
  {
    label: 'Имя',
    type: 'text',
    error: false,
    helperText: 'Поле не должно быть пустым',
    value: ''
  },
  {
    label: 'Фамилия',
    type: 'text',
    error: false,
    helperText: 'Поле не должно быть пустым',
    value: ''
  },
  {
    label: 'Профессия',
    type: 'text',
    error: false,
    helperText: 'Поле не должно быть пустым',
    value: ''
  }
]

const dataPersonAuth = [
  {
    label: 'Электронная почта',
    type: 'email',
    error: false,
    value: ''
  },
  {
    label: 'Пароль',
    type: 'password',
    error: false,
    value: ''
  }
]

export const AuthPage = () => {
  const { users, addNewUser } = useContext(AppContext)
  const classes = useStyles()
  const [inputDataReg, setinputDataReg] = useState(dataPersonRegister)
  const [userExist, setUserExist] = useState(false)

  const onChangeHandler = (event, index) => {
    const newInputData = { ...inputDataReg[index] }
    newInputData.value = event.target.value
    const newInputDataReg = [...inputDataReg.slice(0, index), newInputData, ...inputDataReg.slice(index + 1)]
    setinputDataReg(newInputDataReg)
  }

  const onSubmit = () => {
    let isFormValid = true

    const newInputDataReg = inputDataReg.map((item) => {
      let isValid = true
      isValid = item.value.trim() !== '' && isValid
      if (item.type === 'password') {
        isValid = item.value.trim().length >= 6 && isValid
      }
      if (item.type === 'email') {
        isValid = is.email(item.value) && isValid
        isValid = !isEmailExist(item.value) && isValid
      }
      item.error = !isValid
      isFormValid = isValid && isFormValid
      return item
    })
    
    setinputDataReg(newInputDataReg)

    if (isFormValid) {
      const newUser = {
        email: inputDataReg[0].value,
        password: inputDataReg[1].value,
        firstName: inputDataReg[2].value,
        lastName: inputDataReg[3].value,
        profession: inputDataReg[4].value
      }
      addNewUser(newUser)
      setinputDataReg(dataPersonRegister)
    }

  }

  // Проверяем, существует ли такой пользователь (email)
  const isEmailExist = (email) => {
    const findUser = users.filter((user)=> {
      return user.email === email
    })
    setUserExist(!!findUser.length)
    return !!findUser.length
  }

  const dataPersonBlock = inputDataReg.map((person, i) => {
    return (
      <li className={classes.input} key={i}>
        <TextField
          error={person.error}
          helperText={person.error && (userExist && person.helperTextExist || person.helperText)}
          required
          label={person.label}
          type={person.type}
          fullWidth={true}
          variant="outlined"
          value={person.value}
          onChange={event => onChangeHandler(event, i)}
        />
      </li>
    )
  })

  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <h2>Регистрация</h2>
            <ul className={classes.inputBlock}>
              {dataPersonBlock}
            </ul>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={onSubmit}
              fullWidth={true}
            >Зарегистрироваться</Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <h2>Авторизация</h2>
            <p>. . .</p>
            <p>В процессе</p>
            <p>. . .</p>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}