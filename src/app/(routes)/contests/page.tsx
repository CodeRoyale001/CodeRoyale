import Navbar from '@/components/navbar'
import Resizeable from '@/components/resizable'

export default function Contests() {
  return (<>
  <Navbar isLoggedIn={true}/>
  <p>This is Contests Page</p>
  <Resizeable/>
  </>
  )
}