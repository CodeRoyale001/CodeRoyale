import Navbar from '@/components/navbar'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function Profile() {
  return (<>
  <Navbar isLoggedIn={true}/>
  <p>This is Profile Page</p>

  </>
  )
}
