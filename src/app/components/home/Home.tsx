import "./Home.css"

import { FC } from "react"

import logo from "../../assets/images/vite.svg"
import { Show, useGetAssetsByDayQuery } from "../../services/baseApi"
import Counter from "../counter/Counter"

interface ListShowProps {
  show: Show
}

const ListShow = ({ show }: ListShowProps) => (
  <div>
    {show.band}
    <br />
    <br />
    {show.stage}
    <br />
    <br />
    {show.start}
    <br />
    <br />
  </div>
)

const Home: FC = () => {
  // Using a query hook automatically fetches data and returns query values
  const { data, error, isLoading } = useGetAssetsByDayQuery("1")
  // Individual hooks are also accessible under the generated endpoints:
  // const { data, error, isLoading } = pokemonApi.endpoints.getPokemonByName.useQuery('bulbasaur')
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Go to Counter
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
      <div className="App">
        {error != null ? (
          <>Oh no, there was an error</>
        ) : isLoading ? (
          <>Loading...</>
        ) : data != null ? (
          <>
            {Object.values(data).map((scenario: Show[]) => {
              return scenario.map((show: Show) => (
                <ListShow key={show.band} show={show} />
              ))
            })}
          </>
        ) : null}
      </div>
    </div>
  )
}
export default Home
