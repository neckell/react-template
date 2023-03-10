import React from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import Layout from "./app/layout/Layout";
import configureStore from "./app/redux/store/configureStore";
import mainTheme from "./app/styles/mainTheme";

export default function Root(props) {
	const store = configureStore({});
	const resolveThemeProvider = () => mainTheme;

	return (
		<Provider store={store}>
			<ThemeProvider theme={resolveThemeProvider()}>
				<Layout />
			</ThemeProvider>
		</Provider>
	);
}
