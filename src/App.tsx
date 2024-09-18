import './App.css'
import UserById from './Swr'

function App() {

  const data: any = UserById(1)

  return (
    <>
    <div style={{ backgroundColor: 'gray' }}>
        <table>
          <tr>
            {data.data}
          </tr>
          <tr>
          effqse
          </tr>
          <tr>
          ddadad
          </tr>
        </table>
    </div>
    </>
  )
}

export default App
