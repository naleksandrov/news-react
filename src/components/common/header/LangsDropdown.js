import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {withRouter} from 'react-router';

import t from '../../../languages';
import LanguagesActions from '../../../actions/LanguagesActions';
import LanguagesStore from '../../../stores/LanguagesStore';

class Dropdown extends Component {
	constructor(props) {
		super(props);

		this.mounted = false;

		this.state = {
			languages: [],
			currentLanguage: LanguagesStore.getSelected(),
			expand: false
		};

		this.toggle = this.toggle.bind(this);
		this.handleLangFetching =  this.handleLangFetching.bind(this);
		this.handleDocumentClick =  this.handleDocumentClick.bind(this);
		this.changeLanguage =  this.changeLanguage.bind(this);
		this.handleLanguageChange =  this.handleLanguageChange.bind(this);

		LanguagesStore.on(LanguagesStore.eventTypes.LANGUAGES_FETCHED, this.handleLangFetching);
		LanguagesStore.on(LanguagesStore.eventTypes.LANGUAGE_CHANGED, this.handleLanguageChange);
	}

	componentDidMount() {
		this.mounted = true;
		LanguagesActions.getAll();
		document.addEventListener('click', this.handleDocumentClick, false);
	}

	componentWillUnmount() {
		this.mounted = false;
		LanguagesStore.removeListener(LanguagesStore.eventTypes.LANGUAGES_FETCHED, this.handleLangFetching);
		LanguagesStore.removeListener(LanguagesStore.eventTypes.LANGUAGE_CHANGED, this.handleLanguageChange);
		document.removeEventListener('click', this.handleDocumentClick, false);
	}

	handleLanguageChange() {
		const countryCode = LanguagesStore.getCountryCode();
		const pathname = this.props.location.pathname.substring(3);
		const search = this.props.location.search;
		const pushHistory =  `/${countryCode}${pathname}${search}`;

		this.props.history.push(pushHistory);
		console.log(pushHistory);
	/*	console.log(this.props.location);*/
		this.setState({
			currentLanguage: LanguagesStore.getSelected()
		});
	}

	handleLangFetching(data) {
		if (data.success) {
			this.setState({
				languages: data.data
			});
		}
	}

	toggle() {
		this.setState({
			expand: !this.state.expand
		});
	}

	handleDocumentClick(e) {
		if (this.mounted) {
			if (!ReactDOM.findDOMNode(this).contains(e.target)) {
				this.setState({expand: false})
			}
		}
	}

	changeLanguage(id) {
		LanguagesActions.changeSelected(id);
	}

	render() {
		let dropdownOpen = this.state.expand ? 'dropdown open' : 'dropdown';

		const languages = this.state.languages.map((lang) => {
			const active = lang.id === this.state.currentLanguage ? 'active' : '';
			return (
				<li key={lang.id}>
					<a href="javascript:void(0);" className={active} onClick={this.changeLanguage.bind(this, lang.id)}>
						{lang.language}
					</a>
				</li>
			);
		});

		return (
			<li className={dropdownOpen}>
				<a href="javascript:void(0);" className="dropdown-toggle" onClick={this.toggle}>
					{t[this.state.currentLanguage].languages} <span className="caret"></span>
				</a>
				<ul className="dropdown-menu languages">
					{languages}
				</ul>
			</li>
		);
	}
}

export default withRouter(Dropdown);