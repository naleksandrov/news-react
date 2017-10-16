import dispatcher from '../dispatcher';

class NewsActions {
	static getAll(data) {
		dispatcher.dispatch({
			type: 'GET_ALL_NEWS',
			data
		});
	}

	static getNewsDetails(data) {
		dispatcher.dispatch({
			type: 'GET_NEWS_DETAILS',
			data
		});
	}

	static getNewsCount(langId) {
		dispatcher.dispatch({
			type: 'GET_NEWS_COUNT',
			langId
		});
	}
}

export default NewsActions;