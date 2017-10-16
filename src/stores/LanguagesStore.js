import {EventEmitter} from 'events';
import dispatcher from '../dispatcher';

import LanguagesData from '../data/LanguagesData';

class LanguagesStore extends EventEmitter {
	constructor(props) {
		super(props);

		this.languages = [];
		this.selected = 1;
		this.countryCode = 'bg'
	}

	getAll() {
		return this.languages;
	}

	getCountryCode() {
		return this.countryCode;
	}

	getSelected() {
		return this.selected;
	}

	changeSelected(id) {
		this.selected = id;
		this.countryCode = this.languages[id - 1].country_code;
		this.emit(this.eventTypes.LANGUAGE_CHANGED);
	}

	fetchAll() {
		LanguagesData.getAll().then(result => {
			this.languages = result.data;
			this.emit(this.eventTypes.LANGUAGES_FETCHED, result);
		});
	}

	handleAction(action) {
		switch (action.type) {
			case 'FETCH_ALL_LANGS':
				this.fetchAll();
				break;
			case 'CHANGE_SELECTED':
				this.changeSelected(action.id);
				break;
			default:
				break;
		}
	}
}

let languagesStore = new LanguagesStore();

languagesStore.eventTypes = {
	LANGUAGES_FETCHED: 'languages_fetched',
	LANGUAGE_CHANGED: 'language_changed',
};

dispatcher.register(languagesStore.handleAction.bind(languagesStore));
export default languagesStore;