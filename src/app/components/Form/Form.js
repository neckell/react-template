import React from "react";
import { useFormik } from "formik";
import "./Form.scss";

const CrForm = ({ bands, onSubmit }) => {
	const CheckBox = ({ groupName, index, band, start }) => (
		<div className="checkbox">
			<span className="band">{band}</span>
			<div className="checkbox-time">
				<span className="start">{start}</span>
				<input
					type="checkbox"
					value={index}
					onChange={handleChange}
					checked={formik?.values["norte"][index]}
				/>
			</div>
		</div>
	);

	const Button = () => (
		<button className="button add-button">Siguiente día {"->"}</button>
	);

	const Group = ({ groupBands, groupName }) => (
		<div className="group">
			<div className="group-name">
				<strong>Escenario</strong>: {groupName}
			</div>
			{groupBands[groupName]?.map((show, key) => (
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

	const formik = useFormik({
		initialValues: {
			norte: [...Array(10).keys()].map((k) => false),
		},
		onSubmit: (values) => {
			onSubmit(values);
		},
	});

	const handleChange = (event) => {
		const newInterests = [...formik.values.norte];
		newInterests[event.target.value] = event.target.checked;
		formik.setValues({
			...formik.values,
			norte: newInterests,
		});
	};

	if (!!!bands) return <></>;
	return (
		<div>
			<form onSubmit={formik.handleSubmit}>
				<div className="groups">
					<Group groupBands={bands} groupName="norte" />
					<Group groupBands={bands} groupName="sur" />
					<Group groupBands={bands} groupName="montaña" />
					<Group groupBands={bands} groupName="boomerang" />
					<Group groupBands={bands} groupName="Casita de Blues" />
					<Group groupBands={bands} groupName="Paraguay" />
				</div>
				<Button />
			</form>
		</div>
	);
};

export default CrForm;
