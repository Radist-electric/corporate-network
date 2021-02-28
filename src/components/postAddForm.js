import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import SendIcon from '@material-ui/icons/Send'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
    '& .MuiInputBase-multiline': {
      minHeight: '50px',
      padding: '5px 50px 5px 5px',
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
    right: '5px',
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    color: '#52535a',
    cursor: 'pointer',
    transition: 'all 300ms',
    '&:hover': {
      right: '2px',
      color: 'rgba(0, 0, 0, .8)',
    }
  }
}))

export default function PostAddForm(props) {
  const classes = useStyles()
  const [value, setValue] = useState('')

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (value.length == 0) return
    props.addPost(value)
    setValue('')
  }

  return (
    <form className={classes.root} noValidate autoComplete="off" onSubmit={onSubmit}>
      <div>
        <TextField
          id="outlined-multiline-flexible"
          label="Сообщение"
          multiline
          rowsMax={2}
          value={value}
          onChange={handleChange}
          variant="outlined"
          fullWidth={true}
          autoFocus={true}
          className={classes.field}
          InputProps={{
            endAdornment: (
              <button className={classes.send}><SendIcon /></button>
            ),
          }}
        />
      </div>
    </form>
  )
}
