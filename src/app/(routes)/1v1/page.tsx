// pages/1v1/search.tsx
'use client'
import { Button } from '@/components/ui/button';
import { getRequestWithoutAccessToken } from '@/utils/api';
import { getCookie, setCookie } from '@/utils/cookies';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface Response {
  status: number;
  message: string;
  data?: MatchDetails;
}

const SearchMatch: React.FC = () => {
  const router = useRouter();

  const searchMatch = async () => {
    try {
      const playerID = getCookie('userName');
      const url = `http://localhost:8080/search?playerID=${playerID}`;
      await getRequestWithoutAccessToken(url, (response: Response) => {
        const matchDetails = response?.data;
        const matchID = matchDetails?.match_id || '';
        setCookie('match_id', matchID, 1); 
        const MatchDetailsString=JSON.stringify(matchDetails);

        setCookie('matchDetails', MatchDetailsString, 1);

        router.push(`/1v1/${matchID}`); // Redirect to the match page
      });
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="p-4 flex flex-col items-center h-screen pt-20">
      <Button
        onClick={searchMatch}
        className="p-12 rounded-2xl mb-2 text-3xl "
      >
        Search Match
      </Button>
    </div>
  );
};

export default SearchMatch;
