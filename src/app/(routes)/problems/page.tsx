"use client"

import Navbar from '@/components/navbar'
import ProblemTable from '@/components/problemtable/Problem'

export default function Problems() {
  return (
    <>
      <div style={{ paddingTop: '50px', paddingLeft: 'auto', paddingRight: 'auto' }}>
        <ProblemTable/>
        {/* <p>This is Problems Page</p> */}
      </div>
    </>
  )
}
