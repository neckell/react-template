import "./main.css"

import { Analytics } from "@vercel/analytics/react"
import * as React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import Layout from "./app/layout/Layout"
import { store } from "./app/redux/config/store"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <Analytics />
      <Layout />
    </Provider>
  </React.StrictMode>,
)
