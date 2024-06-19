import RankingTable from "@/components/leaderboard/rankingTable";
import Navbar from "@/components/navbar";

export default function Leaderboard() {
	return (
		<>
			<Navbar />
			<p>This is Leaderboard Page</p>
			<RankingTable />
		</>
	);
}
