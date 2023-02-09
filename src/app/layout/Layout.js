import React from "react";
import { Route } from "react-router-dom";
import App from "../components/App/App";
import "./Layout.scss";

const Layout = () => (
	<div className="app__content">
		<App />
		{/* <Switch>
			{routes.map((route) => (
				<Route key={route.path} {...route} />
			))}
    </Switch> */}
	</div>
);

export default Layout;
