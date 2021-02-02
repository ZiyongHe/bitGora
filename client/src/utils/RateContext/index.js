import React, { useState, useEffect } from 'react'

const RateContext = React.createContext()

export function RateProvider(props) {
  const [rate, setRate] = useState()
  useEffect(() => {
    const query = 'https://api.coindesk.com/v1/bpi/currentprice/CAD.json'
    return fetch(query)
      .then((res) => res.json())
      .then((res) => {
        console.log(res.bpi.CAD.rate_float * 2)
        setRate(res.bpi.CAD.rate_float)
      })
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
