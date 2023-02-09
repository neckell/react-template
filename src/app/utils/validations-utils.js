export const isNullOrEmpty = (val) => {
	return (
		val === null ||
		val === "" ||
		val === undefined ||
		isEmptyArray(val) ||
		isEmptyObject(val)
	);
};

const isEmptyArray = (arr) => Array.isArray(arr) && arr.length === 0;

export const isEmptyObject = (obj) =>
	Object.getPrototypeOf(obj) === Object.prototype &&
	Object.keys(obj).length === 0;
