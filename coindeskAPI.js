const query = 'https://api.coindesk.com/v1/bpi/currentprice/CAD.json'

fetch(query).then((res) => console.log(res))
