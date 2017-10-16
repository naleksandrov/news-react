import {EventEmitter} from 'events';
import dispatcher from '../dispatcher';
import NewsData from '../data/NewsData';

class NewsStore extends EventEmitter {
	getAll(data) {
		NewsData.getAll(data.page, data.limit, data.currentLanguage).then((result) => {
			this.emit(this.eventTypes.NEWS_FETCHED, result);
		});
	}

	getNewsDetails(data) {
		NewsData.getNewsDetails(data.newsId, data.currentLanguage).then((result) => {
			this.emit(this.eventTypes.NEWS_DETAILS_FETCHED, result);
		});
	}

	getNewsCount(langId) {
		NewsData.getNewsCount(langId).then((result) => {
			this.emit(this.eventTypes.NEWS_COUNT_FETCHED, result);
		});
	}

	handleAction(action) {
		switch (action.type) {
			case 'GET_ALL_NEWS':
				this.getAll(action.data);
				break;
			case 'GET_NEWS_DETAILS':
				this.getNewsDetails(action.data);
				break;
			case 'GET_NEWS_COUNT':
				this.getNewsCount(action.currentLanguage);
				break;
			default:
				break;
		}
	}
}

let newsStore = new NewsStore();

newsStore.eventTypes = {
	NEWS_FETCHED: 'news_fetched',
	NEWS_DETAILS_FETCHED: 'news_details_fetched',
	NEWS_COUNT_FETCHED: 'news_count_fetched',
};

dispatcher.register(newsStore.handleAction.bind(newsStore));
export default newsStore;