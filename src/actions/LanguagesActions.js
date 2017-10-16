import dispatcher from '../dispatcher';

class LanguagesActions {
	static getAll() {
		dispatcher.dispatch({
			type: 'FETCH_ALL_LANGS',
		});
	}

	static changeSelected(id) {
		dispatcher.dispatch({
			type: 'CHANGE_SELECTED',
			id
		});
	}
}

export default LanguagesActions;