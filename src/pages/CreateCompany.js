import { Button, Card, CardContent, Grid, TextField, Typography } from '@material-ui/core'
import { Field, Form, Formik } from 'formik'
import React, { useContext } from 'react'

import InputMask from 'react-input-mask'

import fetchJsonp from 'fetch-jsonp';

import { Context } from '../Context/AuthContext'
import api from '../services/api';

export default function CreateCompany() {


  const { authenticated } = useContext(Context);

  const initialValues = {
    cnpj: '',
    razao: '',
    fantasia: '',
    email: '',
    telefone: '',
    cidade: '',
    estado: '',
    cep: '',
    abertura: '',
  }

  async function handleCNPJ(props) {
    const { cnpj } = props.values
    const cnpjNumber = cnpj.replace(/[^\d]+/g, "")


    const url = `https://www.receitaws.com.br/v1/cnpj/${cnpjNumber}`
    const data = await fetchJsonp(url)
      .then(function (response) {
        return response.json()
      }).then(function (json) {
        return json
      }).catch(function (err) {

        console.log('parsing failed', err)
      })

    if (data && data.abertura) {


      let [dia, mes, ano] = data.abertura.split('/')
      let dataJS = new Date(ano, mes - 1, dia);
      let dataFormatada = (dataJS.getFullYear() + "-" + ((dataJS.getMonth() + 1)) + "-" + (dataJS.getDate()));

      props.values.razao = data.nome
      props.values.fantasia = data.fantasia
      props.values.email = data.email
      props.values.telefone = data.telefone
      props.values.cidade = data.municipio
      props.values.estado = data.uf
      props.values.cep = data.cep
      props.values.abertura = dataFormatada

      props.setFieldValue('razao', props.values.razao)
    } else {
      if (props.values.cnpj.replace(/[^\d]+/g, "")) {
        alert('Erro na requisição')
        props.resetForm()
      }
    }
  }

  const onSubmit = async (values, props) => {
    if (authenticated) {

      const obj = {
        name: values.razao,
        fantasy_name: values.fantasia,
        cnpj: values.cnpj,
        opening_date: values.abertura,
        email: values.email,
        telephone: values.telefone,
        city: values.cidade,
        state: values.estado,
        zip_code: values.cep
      }

      await api.post('/companies', obj
      ).then(response => {
        alert('Empresa cadastrada com sucesso!')
        console.log(response)
      })
        .catch(error => {
          alert('Erro na requisição')
          console.log(error)
        })

      //console.log(data)
      props.resetForm()

    }
  }



  return (

    <>
      <Typography gutterBottom variant='h5' align='center'>
        Cadastro de Empresas
      </Typography>
      <Card style={{ maxWidth: 650, margin: '0 auto', padding: '20px 5px' }}>
        <CardContent>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
          >
            {(props) => (
              <Form>
                <Grid container spacing={1}>
                  <Grid xs={12} item>
                    <InputMask
                      mask="99.999.999/9999-99"
                      onChange={props.handleChange}
                      onBlur={() => handleCNPJ(props)}
                      value={props.values.cnpj}        
                    >
                      {() => <TextField name='cnpj' label='CNPJ' variant='outlined' fullWidth required/>}
                    </InputMask>
                  </Grid>
                  <Grid xs={12} sm={6} item>
                    <Field as={TextField} name='razao' label='Razão Social' variant='outlined' fullWidth required />
                  </Grid>
                  <Grid xs={12} sm={6} item>
                    <Field as={TextField} name='fantasia' label='Fantasia' variant='outlined' fullWidth required />
                  </Grid>
                  <Grid xs={12} sm={6} item>
                    <Field as={TextField} name='email' type='email' label='Email' variant='outlined' fullWidth required />
                  </Grid>
                  <Grid xs={12} sm={6} item>
                    <Field as={TextField} name='telefone' label='Telefone' variant='outlined' fullWidth required />
                  </Grid>
                  <Grid xs={12} sm={6} item>
                    <Field as={TextField} name='cidade' label='Cidade' variant='outlined' fullWidth required />
                  </Grid>
                  <Grid xs={12} sm={6} item>
                    <Field as={TextField} name='estado' label='Estado' variant='outlined' fullWidth required />
                  </Grid>
                  <Grid xs={12} sm={6} item>
                    <Field as={TextField} name='cep' label='CEP' variant='outlined' fullWidth required />
                  </Grid>
                  <Grid xs={12} sm={6} item>
                    <Field as={TextField} name='abertura' label='Data de Abertura' variant='outlined' fullWidth required />
                  </Grid>
                  <Grid xs={12} item >
                    <Button type='submit' variant='contained' color='primary' fullWidth>Cadastrar</Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </>
  )
}
