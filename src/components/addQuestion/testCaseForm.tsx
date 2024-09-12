import React, { useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Cross1Icon } from '@radix-ui/react-icons'

const testCaseSchema = z.object({
  input: z.string().min(1, 'Input is required'),
  output: z.string().min(1, 'Output is required')
})

const TestCaseForm = () => {
  const [testCases, setTestCases] = useState<any[]>([])

  const testCaseForm = useForm<z.infer<typeof testCaseSchema>>({
    resolver: zodResolver(testCaseSchema),
    defaultValues: {
      input: "",
      output: ""
    }
  })

  const onSubmit = (data: any) => {
    setTestCases(prev => [...prev, data])
    testCaseForm.reset() // Reset the form after adding a test case
  }
  const removeTestcase=(index:number)=>{
    setTestCases(prev => prev.filter((_, i) => i !== index))
  }
  return (
    <>
      <Form {...testCaseForm}>
        <form onSubmit={testCaseForm.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={testCaseForm.control}
            name="input"
            render={({ field }) => (
              <FormItem>
                <FormLabel id="inputLabel">Test Case Input</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Enter TestCase Input'
                    {...field}
                    id="inputField"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={testCaseForm.control}
            name="output"
            render={({ field }) => (
              <FormItem>
                <FormLabel id="outputLabel">Test Case Output</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Enter TestCase Output'
                    {...field}
                    id="outputField"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type='submit'>Add Test Case</Button>
        </form>
      </Form>
      
      <h1>Test Cases</h1>
      {
        testCases.length === 0 
        ? <h1>No Test Cases Added Till Now</h1>
        : (
          <Table>
            <TableCaption>All Test Cases added till now..</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Index</TableHead>
                <TableHead>TestCase</TableHead>
                <TableHead>Output</TableHead>
                <TableHead>Remove Test Case</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testCases.map((testcase, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{testcase.input}</TableCell>
                    <TableCell>{testcase.output}</TableCell>
                    <TableCell ><Button onClick={()=>removeTestcase(index)}><Cross1Icon /></Button></TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
          </Table>
        )
      }
    </>
  )
}

export default TestCaseForm
