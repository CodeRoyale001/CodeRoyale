import React from 'react'

const Problem = () => {
  const [problem, setProblem] = React.useState<any>(null);

  React.useEffect(() => {
    fetchProblemDetails();
  }, []);

  const fetchProblemDetails = async () => {
    try {
      //getProblem
    } catch (error) {
      console.error('Error fetching problem details:', error);
    }
  };

  return (
    <>
      {problem ? (
        <div>
          <div>
            <h2>{problem.title}</h2>
          </div>
          <div>
            <p>{problem.tags}</p>
          </div>
          <div>
            <p>{problem.statement}</p>
          </div>
          <hr />
          <div>
            <p>{problem.authors}</p>
          </div>
        </div>
      ) : (
        <p>Loading problem details...</p>
      )}
    </>
  );
}

export default Problem