import React from "react";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import { timeConvert } from "@/utils/utils";

const SubmissionCard = (question: {
  Id: any;
  language: any;
  submittime: any;
}) => {
  return (
    <Card className="my-2 mx-2">
      <CardContent className="flex justify-between flex-wrap p-1">
        <Link href="/" className="text-lg text-center">
          {question.Id}
        </Link>
        <div className="flex justify-between">
          <p className="mx-2 text-left">{question.language}</p>
          <p className="text-center">{timeConvert(question.submittime)}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubmissionCard;
