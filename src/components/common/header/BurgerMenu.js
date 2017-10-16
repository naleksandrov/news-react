import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import $ from 'jquery';

import t from '../../../languages';
import LangsDropdown from './LangsDropdown';
import LanguagesStore from '../../../stores/LanguagesStore';

class BurgerMenu extends Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.handleLanguageChange = this.handleLanguageChange.bind(this);

		this.state = {
			expand: false,
			currentLanguage: LanguagesStore.getSelected()
		};

		LanguagesStore.on(LanguagesStore.eventTypes.LANGUAGE_CHANGED, this.handleLanguageChange);
	}

	componentWillUnmount() {
		LanguagesStore.removeListener(LanguagesStore.eventTypes.LANGUAGE_CHANGED, this.handleLanguageChange);
	}

	handleLanguageChange() {
		this.setState({
			currentLanguage: LanguagesStore.getSelected()
		});
	}

	toggle() {
		$(this.refs['toggle-div']).slideToggle('fast');
		this.setState({
			expand: !this.state.expand
		});
	}

	render() {
		const burgerClasses = this.state.expand ? 'navbar-toggle collapsed' : 'navbar-toggle';

		return (
			<div>
				<div className="navbar-header">
					<button type="button" className={burgerClasses} onClick={this.toggle}>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
					</button>
					<NavLink to="/" className="navbar-brand">
						{t[this.state.currentLanguage].news}
					</NavLink>
				</div>
				<div id="navbar" className='navbar-collapse collapse' ref="toggle-div">
					<ul className="nav navbar-nav">
						<li>
							<NavLink to="/" activeClassName="active">
								{t[this.state.currentLanguage].home}
							</NavLink>
						</li>
					</ul>
					<ul className="nav navbar-nav navbar-right">
						<LangsDropdown />
					</ul>
				</div>
			</div>
		);
	}
}

export default BurgerMenu;