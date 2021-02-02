import React, { useState, useEffect } from 'react'

const RateContext = React.createContext()

export function RateProvider(props) {
  const [rate, setRate] = useState()

  useEffect(() => {
    // fetch Btc rate upon rendering
    const query = 'https://api.coindesk.com/v1/bpi/currentprice/CAD.json'
    fetch(query)
      .then((res) => res.json())
      .then((res) => {
        console.log('Rate (BTC to CAD) by coindesk: ')
        console.log(res.bpi.CAD.rate_float)
        setRate(res.bpi.CAD.rate_float)
      })

    window.setInterval((count = 5) => {
      count -= 1
      // set timeout for bitcoin rate update after 5 mins
      if (count < 0) {
        console.log('Timeout for rate update, please reflesh the page')
        clearInterval()
        return
      }
      console.log('Bitcoin rate update: ')
      const query = 'https://api.coindesk.com/v1/bpi/currentprice/CAD.json'
      return fetch(query)
        .then((res) => res.json())
        .then((res) => {
          console.log(res.bpi.CAD.rate_float)
          setRate(res.bpi.CAD.rate_float)
        })
    }, 60000)
    // get update every 60 sec
    return null
  }, [])

  return <RateContext.Provider value={[rate, setRate]} {...props} />
}

export function useRate() {
  const context = React.useContext(RateContext)
  if (!context) {
    throw new Error('useRate must be called from a descendent of RateProvider.')
  }
  return context
}
