import { getRequest } from '@/utils/api';
import { getCookie } from '@/utils/cookies';
import React, { useEffect } from 'react'
import UserSubmission from './UserSubmission';

interface SubmissionProps {
  problemId:string;
}
const Submissions:React.FC<SubmissionProps> = ({problemId}) => {
  const [loading,setLoading]=React.useState(true);
  const [submissions,setSubmissions]=React.useState([{} as SubmissionDTO]);
  useEffect(() => {
    getSubmissions();
  }, [])

  const getSubmissions = async () => {
    try {
      const userId=getCookie("userID");
      const url=`${process.env.GO_URI}/getsubmission/question/${problemId}?userId=${userId}`;
      const accessToken=getCookie("accessToken");
      await getRequest(url,accessToken,(response)=>{
        console.log(response);
        setSubmissions(response);
      })
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  return (<>{loading?"Loading...":
      <div>
        {submissions.map((submission,index)=>(
          <UserSubmission key={index} submission={submission}/> 
        ))}
      </div>
}
  </>
  )
}

export default Submissions