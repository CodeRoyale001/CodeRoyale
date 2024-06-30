import { Dialog, DialogContent, DialogTrigger } from '@radix-ui/react-dialog'
import React from 'react'
import { Card, CardContent } from '../ui/card'
import { timeConvert } from '@/utils/utils'

interface userSubmissionProps {
    submission:SubmissionDTO
}
const UserSubmission:React.FC<userSubmissionProps> = ({submission}) => {
  return (<>
   <Card className="my-2 mx-2">
    <CardContent className="flex justify-between flex-wrap p-1">
        <Dialog>
      <div className="flex justify-between">
        <DialogTrigger>
        <p className="mx-2 text-left">{submission._id}</p>
        </DialogTrigger>
        <DialogContent>
            <code>{submission.code}</code>
        </DialogContent>
      </div>
      </Dialog>
      <p className="text-center">{submission.language}</p>
        <p className="text-center">{submission.status}</p>
        <p className="text-center">{timeConvert(submission.submitTime)}</p>
    </CardContent>
  </Card>
  </>
  )
}

export default UserSubmission