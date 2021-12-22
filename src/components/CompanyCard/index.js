import { Card, CardContent, CardHeader, IconButton, Typography } from '@material-ui/core'
import React from 'react'

import { DeleteOutlined, Edit } from '@material-ui/icons'

import { useSytles } from './styles'


export default function CompanyCard({ company, handleDelete, handleEdit }) {
  const classes = useSytles()
  return (
    <Card elevation={3} align='center' className={classes.card}>

      <CardHeader
        avatar={
          <IconButton onClick={() =>{handleEdit(company)}}>
            <Edit className={classes.edit} />
          </IconButton>
        }
        action={
          <IconButton onClick={() => handleDelete(company.id)}>
            <DeleteOutlined className={classes.delete} />
          </IconButton>
        }

      />
      <CardContent >
        <Typography className={classes.title} variant='body1'>
          {company.fantasy_name}
        </Typography>
        <Typography variant='body2' color='textSecondary'>
          {company.cnpj}
        </Typography>
        <Typography variant='body2' color='textSecondary'>
          {company.email}
        </Typography>
        <Typography variant='body2' color='textSecondary'>
          {company.telephone}
        </Typography>
        <Typography variant='body2' color='textSecondary'>
          {company.city} - {company.state}
        </Typography>
      </CardContent>
    </Card>
  )
}
