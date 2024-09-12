import React from 'react'
import { CodeEditor } from '@/components/problem'

interface CodeFormProps {
  problemTitle: string;
}

const CodeForm: React.FC<CodeFormProps> = ({problemTitle}) => {
  return (<>
  <CodeEditor problemId={problemTitle} mode={"EDITOR"}/>
    </>
  )
}

export default CodeForm