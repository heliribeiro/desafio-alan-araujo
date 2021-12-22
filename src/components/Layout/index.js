import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, AppBar, Toolbar, IconButton } from '@material-ui/core'
import React, { useContext, useState } from 'react'
import history from '../../history';
import { Context } from '../../Context/AuthContext'
import { AddCircleOutlineOutlined, CloseRounded, SubjectOutlined, Menu } from '@material-ui/icons'

import {useStyles} from './styles'


const menuItens = [
  {
    text: 'Minhas empresas',
    icon: <SubjectOutlined color='primary' />,
    path: '/home'
  },
  {
    text: 'Criar nova empresa',
    icon: <AddCircleOutlineOutlined color='primary' />,
    path: '/createcompany'
  }
]

export default function Layout({ children }) {
  const classes = useStyles()
  const { handleLogout } = useContext(Context);


  const [open, setOpen] = useState(false)


  const name = JSON.parse(localStorage.getItem('name'));

  const togleDrawer = open => event => {
    setOpen(open)
  }

  function handleClickItem(path) {
    history.push(path)
  }

  return (

    <div className={classes.container} >

      <AppBar className={classes.appbar} elevation={0} >
        <Toolbar className={classes.toolbar}>
          <IconButton onClick={togleDrawer(true)}>
            <Menu fontSize='large' color='primary' />
          </IconButton>
          <Typography color='primary'>
            {name}
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        open={open}
        onClose={togleDrawer(false)}
        anchor='left'
        classes={{ paper: classes.drawerPaper }}
      >
        <div>
          <Typography variant='h5' align='center' gutterBottom className={classes.title}>
            UX Empresas
          </Typography>
        </div>

        <List>
          {menuItens.map(item => (
            <ListItem
              button
              key={item.text}
              onClick={() => handleClickItem(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}

          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <CloseRounded color='error' />
            </ListItemIcon>
            <ListItemText primary='Sair' />
          </ListItem>
        </List>

      </Drawer>

      <div className={classes.page}>
        <div className={classes.divToolbar}></div>
        {children}
      </div>
    </div>
  )
}
