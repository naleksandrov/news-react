import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import HomePage from '../home/HomePage';
import NewsDetailsPage from '../news_details/NewsDetailsPage';

const root = (props) => {
	return <Redirect to="/bg/" />;
};

const redirect = (props) => {
	let langs = ['bg', 'en', 'de'];
	let arr = props.location.pathname.substring(1).split('/');

	if (langs.includes(arr[0])) {
		return <HomePage {...props} />;
	} else {
		return <Redirect to="/bg/" />;
	}
};

const NotFoundPage = () => (
		<div><h1>Not Found</h1></div>
);

const Routes = () => (
	<Switch>
		<Route exact path="/" render={root} />
		<Route exact path="/:lang" render={redirect} />
		<Route path="/:lang/news/:id" component={NewsDetailsPage} />
		<Route path="*" component={NotFoundPage} />
	</Switch>
);

export default Routes;