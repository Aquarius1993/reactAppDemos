export default {
	setItem: (key, value) => {
		try {
			localStorage.setItem(key, value)
		} catch (err) {
			console.log(err.message);
		}
	},
	getItem: (key) => {
		let value
		try {
			value = localStorage.getItem(key)
		} catch (err) {
			console.log(err.message);
		} finally {
			return value
		}
	}
}