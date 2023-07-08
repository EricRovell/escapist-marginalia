/**
 * Converts the date metadata parsed by ExifReader to timestamp.
 * 
 * "2018:08:19 20:38:00" -> 1534700280000
 */
export const timestampFromString = (input) => {
	const [ date, time ] = input.split(" ");
	const [ year, month, day ] = date.split(":").map(Number);
	const [ hours, minutes, seconds ] = time.split(":").map(Number);

	const d = new Date(year, month - 1, day, hours, minutes, seconds);
	return d.getTime();
};
