const sortHoursDescending = (hours) => {
	// Ordenar las horas en orden descendente
	hours.sort(function (a, b) {
		let aAsMinutes =
			parseInt(a.start.split(":")[0], 10) * 60 +
			parseInt(a.start.split(":")[1], 10);
		let bAsMinutes =
			parseInt(b.start.split(":")[0], 10) * 60 +
			parseInt(b.start.split(":")[1], 10);
		return bAsMinutes - aAsMinutes;
	});

	// Encontrar la posición de la primera hora mayor o igual a 4:00
	let i = 0;
	while (
		i < hours.length &&
		(hours[i].start === "04:00" || hours[i].start >= "04:01")
	) {
		i++;
	}

	// Mover las horas entre 0 y 3 al principio
	let firstPart = hours.slice(0, i);
	let secondPart = hours.slice(i);
	hours = secondPart.concat(firstPart);

	return hours;
};

export default sortHoursDescending;
