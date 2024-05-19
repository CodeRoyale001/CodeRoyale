"use client"

import Navbar from '@/components/navbar'
import ProblemTable from '@/components/problemtable/Problem'

export default function Problems() {
  return (<>
  <Navbar isLoggedIn={true}/>
  <ProblemTable/>
{/* <p>This is Problems Page</p> */}
  </>
  )
}
