import React, {Component} from 'react';

import BurgerMenu from './BurgerMenu';

class Header extends Component {
	render() {
		return (
			<header>
				<nav className="navbar navbar-default">
					<div className="container">
						<BurgerMenu />
					</div>
				</nav>
			</header>
		);
	}
}

export default Header;