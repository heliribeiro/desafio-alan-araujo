import fetchJsonp from 'fetch-jsonp';

async function fetchReceita(cnpj){
const url = `https://www.receitaws.com.br/v1/cnpj/${cnpj}`

const data = await fetchJsonp(url)
.then(function (response) {
  return response.json()
}).then(function (json) {
  return json
}).catch(function (err) {
  console.log('parsing failed', err)
  return err
})

return data
}

export default fetchReceita