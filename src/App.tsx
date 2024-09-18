import './App.css'
import useUser from './Swr'

function GetUserByID(id: number) {
  const { user, isLoading, isError } = useUser(id)

  if (isLoading) return 'loading'
  if (isError) {
    console.log(isError);
    return 'error';
  }
  return user
}

function App() {
  console.log(GetUserByID(1))
  return (
    <>
      <div style={{ backgroundColor: 'gray' }}>
        <table>
          <tr>
            {GetUserByID(1).username}
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
