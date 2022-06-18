import { makeStyles } from "@material-ui/core";
import Homepage from "./Pages/HomePage";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import CoinPage from "./Pages/CoinPage";
import Header from "./components/Header";
import Alert from "./components/Alert"

// This is using material ui
const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#0D0D0D",
    color: "white",
    minHeight: "100vh",
  },
}));

// #14161a initial color

function App() {
  const classes = useStyles(); // importing the useStyles from above

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Route path="/" component={Homepage} exact />
        <Route path="/coins/:id" component={CoinPage} exact />
      </div>
      <Alert />
    </BrowserRouter>
  );
}

export default App;
