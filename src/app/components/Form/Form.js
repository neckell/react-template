import React from "react";
import { Form, Formik, useFormikContext } from "formik";
import { isNullOrEmpty } from "../../utils/validations-utils";
import CheckBox from "./CheckBox";
import "./Form.scss";

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

const Button = ({ isStage2 }) => {
	return isStage2 ? (
		<button type="submit" className="button add-button">
			Compartir!
		</button>
	) : (
		<button type="submit" className="button add-button">
			Confirmar Dia 1
		</button>
	);
};

const reset = () => document.getElementById("form")?.reset();

const CrForm = ({ bands, isStage2, onSubmit }) => {
	if (!!!bands) return;
	reset();
	return (
		<div>
			<Formik
				initialValues={getInitialValues(bands)}
				onSubmit={onSubmit}
				enableReinitialize
			>
				{() => {
					return (
						<div className="layout">
							{isStage2 ? (
								<button
									type="submit"
									className="button delete-button"
								>
									Día 2
								</button>
							) : (
								<button
									type="submit"
									className="button delete-button"
								>
									Día 1
								</button>
							)}
							<Form className="form" id="form">
								<div className="groups">
									{Object.keys(bands).map((key) => (
										<Group
											stage={bands[key]}
											groupName={key}
											key={key}
										/>
									))}
								</div>
								<Button isStage2={isStage2} />
							</Form>
						</div>
					);
				}}
			</Formik>
		</div>
	);
};

export default CrForm;
