import React, { useState, useEffect, useRef } from 'react'

const RateContext = React.createContext()

export function RateProvider(props) {
  const [rate, setRate] = useState()
  const id = useRef(0)

  useEffect(() => {
    // fetch Btc rate upon rendering
    const query = 'https://api.coindesk.com/v1/bpi/currentprice/CAD.json'
    fetch(query)
      .then((res) => res.json())
      .then((res) => {
        console.log('Rate (BTC to CAD) by deskcoin: ')
        console.log(res.bpi.CAD.rate_float)
        setRate(res.bpi.CAD.rate_float)
      })

    id.current = window.setInterval(() => {
      console.log('Bitcoin rate update: ')
      const query = 'https://api.coindesk.com/v1/bpi/currentprice/CAD.json'
      return fetch(query)
        .then((res) => res.json())
        .then((res) => {
          console.log(res.bpi.CAD.rate_float)
          setRate(res.bpi.CAD.rate_float)
        })
    }, 30000)
    // get update every 60 sec

    return () => clearInterval(id.current)
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
