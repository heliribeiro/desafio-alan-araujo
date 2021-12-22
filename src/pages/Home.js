import React, { useState, useEffect } from 'react';

import api from '../services/api';

import CompanyCard from '../components/CompanyCard/index'
import { Grid, TextField, IconButton, InputAdornment } from '@material-ui/core';
import { Search } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'


const useSytles = makeStyles({
  gridContainer: {
    padding: 20
  },
  search: {
    marginTop: 20
  },
  inputSearch:{
    padding: 10
  }
})

export default function Home() {
  const classes = useSytles()

  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState('')
  const searchLowerCase = search.toLocaleLowerCase()

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/companies');

      setCompanies(data);
    })();
  }, []);

  const companiesFiltered = companies.filter(company => company.fantasy_name.toLowerCase().includes(searchLowerCase))

  const handleDelete = async (id) => {
    await api.delete(`/companies/${id}`);
    const newCompanies = companies.filter(company => company.id !== id)
    setCompanies(newCompanies)
  }

  return (
    <>
      <Grid className={classes.search} align='center' >
        
        <TextField placeholder='Nome da empresa' className={classes.inputSearch}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <Search color='primary' />
                </IconButton>
              </InputAdornment>
            ),
          }}

        />
      </Grid>
      
      <Grid container spacing={2} className={classes.gridContainer} >
        {companiesFiltered.map((company) => (
          <Grid item xs={12} sm={6} md={4} lg={3} >
            <CompanyCard key={company.id} company={company} handleDelete={handleDelete} />
          </Grid>
        ))}

      </Grid>
    </>
  );
}
