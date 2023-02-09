import React from "react";
import { Form, Formik, Field, useFormik, useFormikContext } from "formik";
import "./Form.scss";
import { isEmptyObject, isNullOrEmpty } from "../../utils/validations-utils";
import CheckBox from "./CheckBox";

const getInitialValues = (bands) => {
	if (isNullOrEmpty(bands)) return {};
	let keys = Object.keys(bands);
	let initial = {};
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i];
		initial[key] = [...Array(bands[key].length).keys()].map((k) => false);
	}
	return initial;
};

const CrForm = ({ bands, onSubmit }) => {
	const Button = () => (
		<button type="submit" className="button add-button">
			Compartir!
		</button>
	);

	const Group = ({ stage, groupName }) => (
		<div className="group">
			<div className="group-name">
				<h1>
					<strong>Escenario</strong>: {groupName}
				</h1>
			</div>
			{stage?.map((show, key) => (
				<CheckBox
					groupName={groupName}
					index={key}
					band={show.band}
					start={show.start}
					key={key}
				/>
			))}
		</div>
	);

	if (!!!bands) return <></>;
	return (
		<div>
			<Formik
				initialValues={getInitialValues(bands)}
				onSubmit={onSubmit}
				enableReinitialize
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
						<Form className="form">
							<div className="groups">
								{Object.keys(bands).map((key) => (
									<Group
										stage={bands[key]}
										groupName={key}
										key={key}
									/>
								))}
							</div>
							<Button />
						</Form>
					);
				}}
			</Formik>
		</div>
	);
};

export default CrForm;
