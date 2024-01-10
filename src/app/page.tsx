import Footer from '@/components/footer/Footer'
import Navbar from '@/components/navbar'
import Resizeable from '@/components/resizable'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function Home() {
  return (<>
  <Navbar isLoggedIn={true}/>
  <Resizeable />
  <Footer/> 
  </>
  )
}
