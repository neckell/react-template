import React, { useState, useEffect } from "react";
import "./App.scss";
import CrForm from "../Form/Form";
import file from "../../resources/cr23_day_1.json";

function App() {
	const [bands, setBands] = useState({});

	useEffect(() => {
		loadData();
	}, []);

	const loadData = () => {
		setBands(file);
	};

	const header = (
		<div className="header">
			<h1>Bienvenidos a ¡Arma tu grilla Cosquín Rock 2023!</h1>
			<p>
				Para armar tu grilla, debes seleccionar las bandas que quieres
				ver. Al finalizar, podrás ver tu grilla armada y compartirla con
				tus amigos para sincronizarse!
			</p>
		</div>
	);

	const footer = (
		<div className="footer">
			<p>Este sitio es totalmente seguro. Copyrights reservados 2023</p>
			<br />
			<p>
				Si tenes alguna consulta o sugerencia, te dejo mi mail de
				contacto: niceckell@gmail.com
			</p>
		</div>
	);

	const [output, setOutput] = useState([]);

	const buildArr = (values) => {
		let obj = [];
		Object.keys(bands).map((key) =>
			values[key].map((band, idx) => band && obj.push(bands[key][idx]))
		);
		return obj;
	};

	const getFinalText = (arr) => {
		if (arr.length === 0) return "";
		arr.sort((a, b) => a.start < b.start);
		let final = arr.reduce((acc, item) => {
			return acc + item.start + " - " + item.band + "\n";
		}, "");
		return (
			"Mi grilla del CR23: " +
			"\n" +
			final +
			"\n" +
			"Quieres armar tu grilla? Ingresa a (sitio seguro):"
		);
	};

	const onSubmit = (values) => {
		let data = getFinalText(buildArr(values));
		if (navigator.share) {
			navigator
				.share({
					title: `Esta es mi grilla del Cosquín Rock 23`,
					text: `${data}`,
					url: document.location.href,
				})
				.then(() => {
					console.log("Successfully shared");
				})
				.catch((error) => {
					console.error(
						"Something went wrong sharing the blog",
						error
					);
				});
		}
	};

	const layout = (
		<>
			{header}
			<CrForm onSubmit={onSubmit} bands={bands} />
			{footer}
		</>
	);

	return <div className="app">{layout}</div>;
}

export default App;
