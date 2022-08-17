import Axios from "axios";

const getTime = () => {
	return new Date().toISOString().slice(0, 19).replace('T', ' ');
}

const addDays = (date, days) => {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export const validbnettoken = (userid, callback) => {
	Axios.get('http://localhost:3001/api/user/tokeninfo', {params: {userid: userid}}).then(response => {
		const tokendateplusone = addDays(response.data[0].bnetexpiration, 1)
		const currentdate = new Date(getTime())

		callback(tokendateplusone > currentdate || response.data[0].bnetexpiration == null)
	})
}

export const spaceToSlug = (name) => {
	return name.replace(/\s+/g, '-').toLowerCase();
}