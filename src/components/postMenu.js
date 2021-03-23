import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Fade from '@material-ui/core/Fade'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: '50%',
    right: '0',
    transform: 'translateY(-50%)',
    color: 'rgba(0,0,0,0.6)',
    transition: 'all 0.3s',
    '&:hover': {
      color: 'rgba(0,0,0,0.8)',
    }
  },
  menu: {
    '& ul': {
      padding: 0,
    },
    '& li': {
      padding: '5px 10px',
      fontSize: '14px',
      [theme.breakpoints.down('sm')]: {
        minHeight: 'initial'
      },
    }
  }

}))

export default function PostMenu(props) {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (e) => {
    props.getMenuData(e.target.dataset.action, props.postId)
    setAnchorEl(null)
  }

  return (
    <div className={classes.root}>
      <IconButton aria-label="post-menu" aria-controls='fade-menu' aria-haspopup='true' onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        className={classes.menu}
        id='fade-menu'
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose} data-action='remove'>Удалить</MenuItem>
        <MenuItem onClick={handleClose} data-action='edit'>Редактировать</MenuItem>
      </Menu>
    </div>
  );
}
