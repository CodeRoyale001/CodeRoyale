import RankingTable from "@/components/leaderboard/rankingTable";
import Navbar from "@/components/navbar";

export default function Leaderboard() {
	return (
		<>
			<Navbar />
			<div className="pt-12 px-40">
			<RankingTable />
			</div>
		</>
	);
}
