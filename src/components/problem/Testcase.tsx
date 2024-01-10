import React from 'react'
import { Button } from '../ui/button'
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const Testcase = () => {
  return (<>
  <div className='flex flex-col'>
  <div className="grid w-full gap-1.5">
      <Label htmlFor="message">Input</Label>
      <Textarea placeholder="Type your message here." id="message" />
    </div>
  <div className="grid w-full gap-1.5">
      <Label htmlFor="message">output</Label>
      <Textarea placeholder="Type your message here." id="message" />
    </div>
    <div className='flex justify-between'>
    <Button>Run</Button>
    <Button>Submit</Button>
    </div>
    </div>
  </>
  )
}

export default Testcase