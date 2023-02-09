import React from "react";
import { Form, Formik, Field } from "formik";
import "./../../styles/styles.scss";
import "../App/App.scss";
import "./Purchase.scss";

const NewPurchase = (props) => {
	return (
		<Formik
			validateOnChange={true}
			validateOnBlur={true}
			initialValues={{
				item_name: "",
				store_name: "",
				purchasing_date: "",
				total_amount: "",
				bank: "",
				card: "",
			}}
			onSubmit={(values, actions) => {
				props.onSubmitPurchase(values);
			}}
		>
			{({
				values,
				errors,
				touched,
				isValid,
				dirty,
				handleChange,
				handleBlur,
			}) => {
				return (
					<Form>
						<div className="card-container">
							<div className="card">
								<Field
									id="item_name"
									name="item_name"
									type={"text"}
									className="card-input"
									placeholder="Nombre de la compra*"
								/>
								<Field
									id="store_name"
									name="store_name"
									type={"text"}
									className="card-input"
									placeholder="Nombre del comercio*"
								/>
								<Field
									id="purchasing_date"
									name="purchasing_date"
									type={"text"}
									className="card-input"
									placeholder="Fecha de compra* Formato: dic/20"
								/>
								<Field
									id="total_amount"
									name="total_amount"
									type={"number"}
									className="card-input"
									placeholder="Precio final*"
								/>
								<Field
									id="card"
									name="card"
									type={"text"}
									className="card-input"
									placeholder="Tarjeta Adquirente*"
								/>
								<Field
									id="bank"
									name="bank"
									type={"text"}
									className="card-input"
									placeholder="Nombre del banco emisor*"
								/>
							</div>
							<button
								className="button add-enter-button"
								title="Add new purchase"
								type="submit"
							>
								Add
							</button>
						</div>
					</Form>
				);
			}}
		</Formik>
	);
};

export default NewPurchase;
