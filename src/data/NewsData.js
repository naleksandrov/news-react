import Data from './Data';
import {API_URL} from '../constants';

class NewsData {
	static getAll(page = 1, limit = 5, langId = 1) {
		return Data.get(`${API_URL}news/list?page=${page}&limit=${limit}&langId=${langId}`);
	}

	static getNewsDetails(id, langId = 1) {
		return Data.get(`${API_URL}news/view?id=${id}&langId=${langId}`);
	}

	static getNewsCount(langId = 1) {
		return Data.get(`${API_URL}news/count?langId=${langId}`);
	}
}

export default NewsData;