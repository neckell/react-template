import React, { useState, useEffect } from "react";
import "./App.scss";
import CrForm from "../Form/Form";
import file1 from "../../resources/cr23_day_1.json";
import file2 from "../../resources/cr23_day_1.json";
import sortHoursDescending from "../../utils/orderHours";

function App() {
	const [bands1, setBands1] = useState({});
	const [bands2, setBands2] = useState({});

	useEffect(() => {
		loadData();
	}, []);

	const loadData = () => {
		setBands1(file1);
		setBands2(file2);
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
			<p>Este sitio es totalmente seguro. Copyrights©2023 reservados.</p>
			<br />
			<p>
				Si tenes alguna consulta o sugerencia, te dejo mi mail de
				contacto: niceckell@hotmail.com
			</p>
		</div>
	);

	const [stage1, setStage1] = useState([]);
	const [isStage2, setIsStage2] = useState(false);

	const buildArr = (values, bands) => {
		let obj = [];
		Object.keys(bands1).map((key) =>
			values[key].map((band, idx) => band && obj.push(bands1[key][idx]))
		);
		return obj;
	};

	const getFormatedText = (arr) => {
		return sortHoursDescending(arr).reduce((acc, item) => {
			return acc + item.start + " - " + item.band + "\n";
		}, "");
	};

	const getFinalText = (a, b) => {
		return (
			"Mi grilla del CR23: " +
			"\n\n" +
			"Dia 1: \n" +
			a +
			"\nDia 2: \n" +
			b +
			"\n" +
			"Quieres armar tu grilla? Ingresa a (sitio seguro):"
		);
	};

	const exportData = (data) => {
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

	const onSubmit = (values) => {
		if (isStage2) {
			onSubmit2(values);
			return;
		}
		let aux = buildArr(values, bands1);
		setStage1(aux);
		setIsStage2(true);
		window.scrollTo({
			top: 100,
			left: 0,
			behavior: "smooth",
		});
	};

	const onSubmit2 = (values) => {
		let aux = buildArr(values, bands2);

		let data1 = getFormatedText(stage1);
		let data2 = getFormatedText(aux);

		let data = getFinalText(data1, data2);

		exportData(data);
	};

	const layout = (
		<>
			{header}
			<CrForm
				onSubmit={onSubmit}
				bands={isStage2 ? bands2 : bands1}
				isStage2={isStage2}
			/>
			{footer}
		</>
	);

	return <div className="app">{layout}</div>;
}

export default App;
