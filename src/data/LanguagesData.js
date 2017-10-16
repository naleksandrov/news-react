import Data from './Data';

class LanguagesData {
	static getAll() {
		return Data.get('http://localhost:5000/api/languages/list');
	}
}

export default LanguagesData;