import $ from '../../node_modules/jquery/dist/jquery.min';

function requester(method, url) {
	return $.ajax({
		method: method,
		url: url,
		dataType: 'json'
	});
}

class Data {
	static get(url) {
		return requester('GET', url);
	}

	static post(url) {
		return requester('POST', url);
	}
}

export default Data;