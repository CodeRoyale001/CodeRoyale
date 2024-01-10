import Navbar from '@/components/navbar'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function Leaderboard() {
  return (<>
  <Navbar isLoggedIn={true}/>
  <p>This is Leaderboard Page</p>

  </>
  )
}