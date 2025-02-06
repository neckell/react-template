import "./main.css"

import * as React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"

import { SpeedInsights } from "@vercel/speed-insights/next"
import Layout from "./app/layout/Layout"
import { store } from "./app/redux/config/store"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <SpeedInsights />
      <Layout />
    </Provider>
  </React.StrictMode>
)
