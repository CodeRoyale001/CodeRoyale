"use client"

import Resizeable from "@/components/resizable/Resizeable"; 
import { useRouter } from 'next/router';

const ProblemPage = ({ params }: { params: { problemTitle: string } }) => {
    const convertToTitle = (str: String) => {
        return str.replace(/-/g, ' ');
    };

    return <Resizeable problemTitle={convertToTitle(params.problemTitle)} />;
};

export default ProblemPage;
