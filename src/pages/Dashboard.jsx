import axios from "axios";
import { useEffect, useState } from "react";

function Dashboard() {
	const pokeUrl = "https://pokeapi.co/api/v2/pokemon";

	const [pokemon, setPokemon] = useState([]);

	useEffect(() => {
		axios
			.get(pokeUrl, {
				params: {
					limit: 100000,
					offset: 0,
				},
			})
			.then(function (response) {
				setPokemon(response.data.results);
			});
	}, []);

	return (
		<div className="w-full h-screen flex justify-center items-center">
			<h1>Dashboard</h1>

			{pokemon.length > 0 && (
				<div className="w-full flex flex-wrap gap-2">
					{pokemon.map(({ name }) => {
						return <p key={name}>{name}</p>;
					})}
				</div>
			)}
		</div>
	);
}

export default Dashboard;
