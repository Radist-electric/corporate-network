import { useState, useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import is from 'is_js'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import SendIcon from '@material-ui/icons/Send'

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiTextField-root': {
      marginTop: '5px'
    },
    '& .MuiInputBase-multiline': {
      minHeight: '50px',
      padding: '5px 50px 5px 5px'
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#52535a'
    },
    '& .MuiFormLabel-root.Mui-focused': {
      color: '#52535a'
    },
    '& label': {
      transform: ' translate(10px, 17px) scale(1)'
    },
  },
  send: {
    position: 'absolute',
    right: '0',
    color: '#52535a'
  }
}))

const isMobile = is.mobile()

export default function PostAddForm(props) {
  const classes = useStyles()
  const [value, setValue] = useState('')
  const [postId, setPostId] = useState('')
  const input = useRef(null)

  useEffect(() => {
    if (props.editValue.value) {
      setValue(props.editValue.value)
      setPostId(props.editValue.postId)
      input.current.querySelector('textarea').focus()
    }
  }, [props.editValue])

  // Сохраняем данные, введённые с поля ввода
  const handleChange = (event) => {
    setValue(event.target.value)
  }

  // Ловим нажатие клавиш
  const handleKey = (event) => {
    // Если Enter нажат вместе с Shift, то позволяем сделать перенос строки
    if (event.key === 'Enter' && event.shiftKey && !isMobile) {
      return
      // Если нажат только Enter, то создаём сообщение
    } else if (event.key === 'Enter' && !isMobile) {
      onSubmit()
    }
  }

  // Подтверждение формы
  const onSubmit = () => {
    if (value.trim().length == 0) return
    props.addPost(value.trim(), postId)
    setValue('')
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          id="outlined-multiline-flexible"
          label="Сообщение"
          multiline
          rowsMax={2}
          value={value}
          onChange={handleChange}
          onKeyUp={handleKey}
          variant="outlined"
          fullWidth={true}
          ref={input}
          InputProps={{
            endAdornment: (
              <IconButton className={classes.send} onClick={onSubmit}>
                <SendIcon />
              </IconButton>
            ),
          }}
        />
      </div>
    </form>
  )
}
