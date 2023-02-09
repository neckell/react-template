import React from "react";
import { Field, useFormikContext } from "formik";
import { isEmptyObject } from "../../utils/validations-utils";
import "./Form.scss";

const CheckBox = ({ groupName, index, band, start }) => {
	const { values, setValues } = useFormikContext();

	const handleChange = (event) => {
		const index = event.target.value;
		const groupName = event.target.id;
		const value = event.target.checked;
		let modifiedInterest = [...values[groupName]];
		modifiedInterest[index] = value;
		let newInterests = {
			...values,
		};
		newInterests[groupName] = modifiedInterest;
		setValues(newInterests);
	};

	const arr = isEmptyObject(values) ? null : values[groupName][index];
	return (
		<div className="checkbox">
			<span className="band">{band}</span>
			<div className="checkbox-time">
				<span className="start">{start}</span>
				<Field
					type="checkbox"
					id={groupName}
					value={index}
					onChange={handleChange}
					checked={arr}
				/>
			</div>
		</div>
	);
};

export default CheckBox;
