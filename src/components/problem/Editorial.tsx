import React, { useState } from "react";

const Editorial: React.FC = () => {
  const [showSpoiler, setShowSpoiler] = useState(false);

  return (
    <>
      <div className="max-w-3xl mx-auto py-8 px-4">
        <h2 className="text-2xl font-bold mb-4">Editorial</h2>

        <hr className=" my-4" />

        <div className="space-y-4">
          <h3 className="text-xl font-bold">Understanding the Problem:</h3>

          <p>
            Ms. Smith, a thoughtful teacher, wants to give each of her n students a jigsaw puzzle as a farewell gift. However, she faces a challenge - the puzzles available in the shop vary in difficulty and size. She aims to select n puzzles in such a way that the difference between the largest and smallest puzzle sizes is minimized.
          </p>

          <h3 className="text-xl font-bold">Approach:</h3>

          <p>
            To solve this problem efficiently, we can follow a greedy approach. Here’s how:
          </p>
          <ol className="list-decimal pl-8">
            <li>Sort the array representing the quantities of pieces in the puzzles. Sorting will allow us to easily identify the smallest and largest puzzles.</li><br/>
            <li>Iterate through the array and consider each possible selection of n puzzles.</li><br/>
            <li>Calculate the difference between the largest and smallest puzzle sizes for each selection.</li><br/>
            <li>Keep track of the minimum difference encountered.</li>
          </ol>

          <h3 className="text-xl font-bold">Pseudocode:</h3>

          <ol className="list-decimal pl-8">
            <li>Read input values: n, m, and the array representing the quantities of pieces in the puzzles.</li><br/>
            <li>Sort the array.</li><br/>
            <li>Initialize a variable 'least' to store the minimum difference between puzzle sizes.</li><br/>
            <li>Iterate through the array from index 0 to m-n:</li>
            &nbsp;&nbsp;- Calculate the difference between the puzzle sizes from index i to i+n-1.<br />
            &nbsp;&nbsp;- Update 'least' if the calculated difference is smaller than the current minimum.<br /><br/>
            <li>Output the value of 'least'.</li>
          </ol>

          <h3 className="text-xl font-bold">Implementation in C++:</h3>

          <div className="relative">
            <pre className={`bg-background p-4 rounded-md ${!showSpoiler ? "filter blur-sm" : ""}`}>
              <code className="text-l text-foreground">
                {`#include <bits/stdc++.h>
using namespace std;

void solve()
{
    int n, m, f[1000];
    cin >> n >> m;
    for (int i = 0; i < m; ++i)
    {
        cin >> f[i];
    }
    sort(f, f + m);
    int least = f[n-1] - f[0];
    for (int i = 1; i <= m - n; ++i)
    {
        if (f[i+n-1] - f[i] < least)
        {
            least = f[i+n-1] - f[i];
        }
    }
    cout << least << endl;

}

int main()
{
    ios_base::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    solve();
}`}
              </code>
            </pre>
            {!showSpoiler && (
              <div className="absolute inset-0 bg-black bg-opacity-30 flex justify-center items-center">
                <p className="text-lg font-bold text-white">Spoiler</p>
              </div>
            )}
            {!showSpoiler && (
              <button className="absolute right-4 bottom-4 bg-gray-300 px-3 py-1 rounded-md text-sm font-bold text-gray-800" onClick={() => setShowSpoiler(true)}>
                Show Code
              </button>
            )}
          </div>

          <h3 className="text-xl font-bold">Complexity Analysis:</h3>

          <ul className="list-disc pl-8">
            <li>Time Complexity: O(m log m), where m is the total number of puzzles in the shop. This complexity arises from the sorting step.</li><br/>
            <li>Space Complexity: O(m), where m is the total number of puzzles. This is due to the storage of puzzle sizes in the array.</li>
          </ul>

          <h3 className="text-xl font-bold">Conclusion:</h3>

          <p className="text-l">
            By employing a greedy approach and carefully selecting the smallest and largest puzzles, Ms. Smith can minimize the difference in puzzle sizes, ensuring each student receives a thoughtful farewell gift.
          </p>
        </div>
      </div>
    </>
  );
};

export default Editorial;
