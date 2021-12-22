import React, { useContext } from 'react';
import { Avatar, Button, Grid, Paper, TextField, Typography } from '@material-ui/core'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import { Alert } from '@material-ui/lab'

import logoAlan from '../assets/images/logoAlan.jfif'

import { Context } from '../Context/AuthContext';

export default function Login() {
  const { handleLogin, erroLogin } = useContext(Context);

  const paperStyle = { padding: 40, height: '70vh', width: 280, margin: "20px auto" }
  const btnStyle = { marginTop: 60 }

  const initialValues = {
    email: '',
    password: ''
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Por favor digite um email válido').required('Required'),
    password: Yup.string().required('Required')
  })
  console.log(erroLogin)
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align='center'>
          <Avatar alt='Alan Araujo' src={logoAlan} style={{ marginBottom: '20px' }} />
          <Typography variant='h5' gutterBottom>UX Empresas</Typography>
        </Grid>
        <Formik
          initialValues={initialValues}
          onSubmit={({ email, password }) => handleLogin(email, password)}
          validationSchema={validationSchema}
        >
          {(props) => (
            <Form>
               {erroLogin ? <Alert severity="error">This is an error alert — check it out!</Alert> :''}
              < Field as={TextField}
                type='email'
                label='Email'
                placeholder='Digite seu email'
                fullWidth
                required
                name='email'
                helperText={<ErrorMessage name='email' />}
              />
              < Field as={TextField}
                type='password'
                label='Senha'
                placeholder='Digite sua senha'
                fullWidth
                required
                name='password'
                helperText={<ErrorMessage name='password' />}
              />
             
              <Button
                type='submit'
                fullWidth
                color='primary'
                variant='contained'
                style={btnStyle}
              >
                Sign in
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  )
}