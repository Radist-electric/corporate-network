import { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
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

const dataPersonRegisterInit = [
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

const dataPersonAuthInit = [
  {
    label: 'Электронная почта',
    type: 'email',
    error: false,
    helperText: 'Адрес электронной почты неверный',
    value: ''
  },
  {
    label: 'Пароль',
    type: 'password',
    error: false,
    helperText: 'Пароль неверный',
    value: ''
  }
]

export const AuthPage = () => {
  const { users, addNewUser, loginUser } = useContext(AppContext)
  const history = useHistory()
  const classes = useStyles()
  const [inputDataReg, setinputDataReg] = useState(dataPersonRegisterInit)
  const [inputDataAuth, setinputDataAuth] = useState(dataPersonAuthInit)
  const [userExist, setUserExist] = useState(false)

  const onChangeRegHandler = (event, index) => {
    const newInputData = { ...inputDataReg[index] }
    newInputData.value = event.target.value
    const newInputDataReg = [...inputDataReg.slice(0, index), newInputData, ...inputDataReg.slice(index + 1)]
    setinputDataReg(newInputDataReg)
  }

  const onChangeAuthHandler = (event, index) => {
    const newInputData = { ...inputDataAuth[index] }
    newInputData.value = event.target.value
    const newInputDataAuth = [...inputDataAuth.slice(0, index), newInputData, ...inputDataAuth.slice(index + 1)]
    setinputDataAuth(newInputDataAuth)
  }

  // Обработка регистрации
  const onRegSubmit = () => {
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
        setUserExist(isEmailExist(item.value))
      }
      item.error = !isValid
      isFormValid = isValid && isFormValid
      return item
    })

    if (isFormValid) {
      const newUser = {
        email: inputDataReg[0].value,
        password: inputDataReg[1].value,
        firstName: inputDataReg[2].value,
        lastName: inputDataReg[3].value,
        profession: inputDataReg[4].value
      }
      addNewUser(newUser)
      setinputDataReg(dataPersonRegisterInit)
      history.push('/profile')
    } else {
      setinputDataReg(newInputDataReg)
    }

  }

  // Обработка авторизации
  const onAuthSubmit = () => {
    let isFormValid = true

    const newInputDataAuth = [...inputDataAuth]
    const email = newInputDataAuth[0].value
    const emailError = !isEmailExist(email)
    newInputDataAuth[0].error = emailError
    isFormValid = !emailError && isFormValid

    let getPasswordComparison = null
    if (!emailError) {
      getPasswordComparison = isPasswordCorrect(email, newInputDataAuth[1].value)
      const passwordError = getPasswordComparison === null ? true : false
      newInputDataAuth[1].error = passwordError
      isFormValid = !passwordError && isFormValid
    }
    
    if (isFormValid) {
      loginUser(getPasswordComparison)
      setinputDataAuth(dataPersonAuthInit)
      history.push('/profile')
    } else {
      setinputDataAuth(newInputDataAuth)
    }

  }

  // Проверяем, существует ли такой пользователь (email)
  const isEmailExist = (email) => {
    const findUser = users.filter((user) => {
      return user.email === email
    })
    return !!findUser.length
  }

  // Проверяем, верный ли пароль
  const isPasswordCorrect = (email, password) => {
    const findUser = users.filter((user) => {
      return user.email === email
    })
    // Возвращаем null, если пароль не совпадает, и id пользователя, если пароль совпал
    return findUser[0].password === password ? findUser[0].id : null
  }

  const dataRegBlock = inputDataReg.map((person, i) => {
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
          onChange={event => onChangeRegHandler(event, i)}
        />
      </li>
    )
  })

  const dataAuthBlock = inputDataAuth.map((person, i) => {
    return (
      <li className={classes.input} key={i}>
        <TextField
          error={person.error}
          helperText={person.error && person.helperText}
          required
          label={person.label}
          type={person.type}
          fullWidth={true}
          variant="outlined"
          value={person.value}
          onChange={event => onChangeAuthHandler(event, i)}
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
              {dataRegBlock}
            </ul>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={onRegSubmit}
              fullWidth={true}
            >Зарегистрироваться</Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <h2>Авторизация</h2>
            <ul className={classes.inputBlock}>
              {dataAuthBlock}
            </ul>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={onAuthSubmit}
              fullWidth={true}
            >Войти</Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}