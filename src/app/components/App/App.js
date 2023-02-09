import React, { useState, useEffect } from "react";
import "./App.scss";
import { Toast, useToast } from "../Toast/Toast";
import CrForm from "../Form/Form";
import file from "../../resources/cr23_day_1.json";
// import bg from "../../assets/background-loader.png";

function App() {
	const [bands, setBands] = useState({});
	const [total, setTotal] = useState(null);
	const [enableNewPurchase, setEnableNewPurchases] = useState(true);

	useEffect(() => {
		loadData();
	}, []);

	const loadData = () => {
		setBands(file);
	};

	const addNewItemHandler = () => {
		setEnableNewPurchases(true);
	};

	const pushNewItem = ({
		item_name,
		store_name,
		purchasing_date,
		total_amount,
		card,
		bank,
	}) => {
		var body = {
			item_name: item_name,
			store_name: store_name,
			purchasing_date: purchasing_date,
			total_amount: total_amount,
			bank: card,
			card: bank,
		};
		fetch("http://localhost:3001/purchases", {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(body),
		})
			.then(function (r) {
				r.text().then((data) => {
					if (r.status === 201) {
						useToast.success("Purchase created", "toast-gen");
						setEnableNewPurchases(false);
						loadData();
					} else if (r.status === 404) {
						useToast.error(JSON.parse(data)[0], "toast-gen");
					}
				});
			})
			.catch((e) => console.log(e));
	};

	const deleteItemHandler = (id) => {
		fetch("http://localhost:3001/purchases/" + id, {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			method: "DELETE",
		})
			.then(function (r) {
				r.text().then((data) => {
					if (r.status === 204) {
						useToast.warning("Purchase deleted", "toast-gen");
						loadData();
					} else if (r.status === 404) {
						useToast.error(JSON.parse(data)[0], "toast-gen");
					}
				});
			})
			.catch((e) => console.log(e));
	};

	// const generateResume = () => {
	// 	let out = [];
	// 	purchases.forEach((val) => {
	// 		out.push(
	// 			val.purchasing_date +
	// 				"\t\t" +
	// 				val.item_name +
	// 				"\t\t" +
	// 				val.store_name +
	// 				"\t\t" +
	// 				val.total_amount +
	// 				"\t\t" +
	// 				val.card +
	// 				"\t\t" +
	// 				val.bank
	// 		);
	// 		out.push("\n");
	// 	});
	// 	return out;
	// };

	// const downloadResume = () => {
	// 	const element = document.createElement("a");
	// 	const resume = generateResume();
	// 	const file = new Blob(resume, {
	// 		type: "text/plain",
	// 	});
	// 	element.href = URL.createObjectURL(file);
	// 	element.download = "resumen.txt";
	// 	document.body.appendChild(element);
	// 	element.click();
	// };

	const toastGen = <Toast autoClose={3000} id="toast-gen" />;

	// const userNameMarkUp = (
	// 	<Input
	// )

	// const newPurchaseMarkUp = <NewPurchase />;

	// const addButtonMarkUp = !enableNewPurchase && (
	// 	<button
	// 		className="button add-button"
	// 		title="Add new purchase"
	// 		onClick={() => addNewItemHandler()}
	// 	>
	// 		+
	// 	</button>
	// );

	// const totalMarkUp = total !== null && (
	// 	<div className="mb-2">
	// 		<div className="total">
	// 			<label></label>Total a liquidar en este mes: ${total}
	// 		</div>
	// 		<button className="button download" onClick={downloadResume}>
	// 			Descargar resumen
	// 		</button>
	// 	</div>
	// );

	const body = (
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

	const [loading, setLoading] = useState(false);

	// const loader = <img src={bg} alt="fondo" />;

	// setTimeout(() => {
	// 	setLoading(false);
	// }, 3000);

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
			final +
			"\n" +
			"Quieres armar tu grilla? Ingresa a (es un sitio seguro):"
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
			{body}
			<CrForm onSubmit={onSubmit} bands={bands} />
			{footer}
		</>
	);

	return (
		<div className="app">
			{/* {toastGen} */}
			{/* {loading && loader} */}
			{!loading && layout}
		</div>
	);
}

export default App;
