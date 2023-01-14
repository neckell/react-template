import { Paths } from "./paths";
import App from "../app/components/App/App";

export const routes = [
  {
    path: Paths.base,
    component: App,
    exact: true,
  },
]