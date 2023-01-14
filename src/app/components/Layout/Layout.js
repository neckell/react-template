import React from "react";
import { Route } from "react-router-dom";
import { routes } from "../../../routes/routes";
import App from "../App/App";
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
