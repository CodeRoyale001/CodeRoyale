"use client"

import Layout from "@/components/problem/Layout";

const ProblemPage = ({ params }: { params: { problemTitle: string } }) => {
    const convertToTitle = (str: String) => {
        return str.replace(/-/g, ' ');
    };

    return <Layout problemTitle={convertToTitle(params.problemTitle)} />;
};

export default ProblemPage;
