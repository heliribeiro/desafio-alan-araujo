import { makeStyles } from '@material-ui/styles';

const drawerWidth = 240

export const useStyles = makeStyles((theme) => {
  return {
    page: {
      width: '100%'
    },
    drawer: {
      width: drawerWidth
    },
    drawerPaper: {
      width: drawerWidth
    },
    container: {
      display: 'flex'
    },
    appbar: {
      heigh: 30
    },
    divToolbar: theme.mixins.toolbar,
    toolbar: {
      background: '#f4f4f4',
      justifyContent: 'space-between'
    },
    title: {
      marginTop: 10
    },
    name: {
      color: '#fff'
    },
  }
})