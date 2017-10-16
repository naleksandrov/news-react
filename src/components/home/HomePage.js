import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import queryString from 'query-string';
import Pagination from 'react-js-pagination';

import t from '../../languages';
import NewsActions from '../../actions/NewsActions';
import NewsStore from '../../stores/NewsStore';
import LanguagesStore from '../../stores/LanguagesStore';


class HomePage extends Component {
	constructor(props) {
		super(props);

		const query = queryString.parse(this.props.location.search);
		const page = Number(query.page) || 1;

		this.state = {
			news: [],
			newsCount: 0,
			page: page,
			limit: 5,
			currentLanguage: LanguagesStore.getSelected()
		};

		this.handleNewsFetching =  this.handleNewsFetching.bind(this);
		this.handlePageChange =  this.handlePageChange.bind(this);
		this.handleNewsCountFetching =  this.handleNewsCountFetching.bind(this);
		this.handleLanguageChange =  this.handleLanguageChange.bind(this);

		NewsStore.on(NewsStore.eventTypes.NEWS_FETCHED, this.handleNewsFetching);
		NewsStore.on(NewsStore.eventTypes.NEWS_COUNT_FETCHED, this.handleNewsCountFetching);
		LanguagesStore.on(LanguagesStore.eventTypes.LANGUAGE_CHANGED, this.handleLanguageChange);
	}

	componentDidMount() {
		this.getNewsCount();
	}

	componentWillUnmount() {
		NewsStore.removeListener(NewsStore.eventTypes.NEWS_FETCHED, this.handleNewsFetching);
		NewsStore.removeListener(NewsStore.eventTypes.NEWS_COUNT_FETCHED, this.handleNewsCountFetching);
		LanguagesStore.removeListener(LanguagesStore.eventTypes.LANGUAGE_CHANGED, this.handleLanguageChange);
	}

	handleLanguageChange() {
		this.setState({
			currentLanguage: LanguagesStore.getSelected()
		}, () => {
			this.getAllNews();
		});
	}

	getAllNews() {
		let {page, limit, currentLanguage} = this.state;
		let data = {
			page,
			limit,
			currentLanguage
		};
		NewsActions.getAll(data);
	}

	getNewsCount() {
		let {currentLanguage} = this.state;

		NewsActions.getNewsCount(currentLanguage);
	}

	handleNewsFetching(data) {
		if (data.success) {
			this.setState({
				news: data.data
			});
		}
	}

	handleNewsCountFetching(data) {
		if (data.success) {
			this.setState({
				newsCount: data.data[0].count
			}, () => {
				this.getAllNews();
			});
		}
	}

	handlePageChange(page) {
		const countryCode = LanguagesStore.getCountryCode();
		this.setState({
			page: page
		}, () => {
			this.props.history.push(`/${countryCode}/?page=${page}`);
			this.getAllNews();
		});
	}

	render() {
		let pagination;
		let countryCode = LanguagesStore.getCountryCode();
		const news = this.state.news.map((news) => (
			<li key={news.id}>
				<Link to={`/${countryCode}/news/${news.id}`} className="well show">
					<h2 dangerouslySetInnerHTML={{__html: news.title}} />
					<div dangerouslySetInnerHTML={{__html: news.short_description}} />
					<div dangerouslySetInnerHTML={{__html: news.source}} />
					<div>{news.date}</div>
				</Link>
			</li>
		));

		if (this.state.newsCount) {
			pagination = (
				<Pagination
					innerClass="pagination"
					activePage={this.state.page}
					itemsCountPerPage={this.state.limit}
					totalItemsCount={this.state.newsCount}
					pageRangeDisplayed={this.state.limit}
					onChange={this.handlePageChange}
				/>
			);
		}

		return (
			<div>
				<h1>{t[this.state.currentLanguage].news}</h1>
				<ul className="news">
					{news}
				</ul>
				<div className="clearfix">
					<div className="pull-right">
						{pagination}
					</div>
				</div>
			</div>
		);
	}
}

export default HomePage;