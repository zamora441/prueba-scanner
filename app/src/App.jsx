import { useState } from 'react'
import './App.css'
import { QrScanner } from '@yudiel/react-qr-scanner'

function App() {
  const [useScanner, setUseScanner] = useState(false)
  const [orders, setOrders] = useState([])
  const [err, setError] = useState('')
  const [errorScan, setErrorScan] = useState('')

  const addOrders = async (id) => {
    try {
      const response = await fetch(`http://129.146.186.144:80/api/orders/${id}`)
      const data = await response.json()
      setOrders(prevOrders => [...prevOrders, data])
    } catch (error) {
      setError(error.message)
    }
  }

  const scanner = () => {
    return <QrScanner
      onDecode={(result) => addOrders(result)}
      onError={(error) => setErrorScan(error.message)}
    />
  }

  const handleScanner = () => setUseScanner(prevState => !prevState)

  return (
    <>
      <button onClick={handleScanner}>Scanear</button>
      {useScanner &&
        <div className='scanner'>
          {scanner()}
        </div>
      }
      {
        orders && orders.map(order => (
          <div key={order.id}>{order.id}</div>
        ))
      }
      {err && 
        <div>
          <p>error peticion{ err}</p>
      </div>
      }
      {errorScan && 
        <div>
          <p>error scan: no sirveee</p>
      </div>
      }
    </>
  )
}

export default App

