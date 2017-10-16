import React, {Component} from 'react';

import t from '../../languages';
import NewsActions from '../../actions/NewsActions';
import NewsStore from '../../stores/NewsStore';
import LanguagesStore from '../../stores/LanguagesStore';

class NewsDetailsPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			news: [],
			newsId: this.props.match.params.id,
			currentLanguage: LanguagesStore.getSelected()
		};

		this.handleNewsFetching =  this.handleNewsFetching.bind(this);
		this.handleLanguageChange =  this.handleLanguageChange.bind(this);

		NewsStore.on(NewsStore.eventTypes.NEWS_DETAILS_FETCHED, this.handleNewsFetching);
		LanguagesStore.on(LanguagesStore.eventTypes.LANGUAGE_CHANGED, this.handleLanguageChange);
	}

	componentDidMount() {
		this.getNewsDetails();
	}

	componentWillUnmount() {
		NewsStore.removeListener(NewsStore.eventTypes.NEWS_DETAILS_FETCHED, this.handleNewsFetching);
		LanguagesStore.removeListener(LanguagesStore.eventTypes.LANGUAGE_CHANGED, this.handleLanguageChange);
	}

	handleLanguageChange() {
		this.setState({
			currentLanguage: LanguagesStore.getSelected()
		}, () => {
			this.getNewsDetails();
		});
	}

	getNewsDetails() {
		let {newsId, currentLanguage} = this.state;
		let data = {
			newsId,
			currentLanguage
		};
		NewsActions.getNewsDetails(data);
	}

	handleNewsFetching(data) {
		if (data.success) {
			this.setState({
				news: data.data[0]
			});
		}
	}

	render() {
		const news = (
			<div>
				<h2 dangerouslySetInnerHTML={{__html: this.state.news.title}} />
				<div dangerouslySetInnerHTML={{__html: this.state.news.short_description}} />
				<div dangerouslySetInnerHTML={{__html: this.state.news.description}} />
				<div dangerouslySetInnerHTML={{__html: this.state.news.source}} />
				<div>{this.state.news.date}</div>
			</div>
		);

		return (
		<div>
			<h2>{t[this.state.currentLanguage].newsDetails}</h2>
			<div className="well">
				{news}
			</div>
		</div>
		);
	}
}

export default NewsDetailsPage;