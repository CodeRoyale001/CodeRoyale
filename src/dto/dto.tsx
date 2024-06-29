interface ProblemDTO {
    problemId: string;
    title: string;
    tags: string[];
    content: string;
    createdBy: string;
    difficulty: string;
}


interface SubmissionDTO {
    _id: string;
    questionId: string;
    userId: string;
    language: string;
    code: string;
    submitTime: string;
    status: string;
    lastExecutedIndex: number;
}

