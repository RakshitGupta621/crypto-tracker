import React, {
    createContext,
    useContext, 
    useEffect, 
    useState 
  } from "react";
import axios from "axios";
import { CoinList } from "./config/api";
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { onSnapshot, doc } from "firebase/firestore";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [watchlist, setWatchlist] = useState([])
  const [alert, setAlert] = useState({
    open: false,
    message: " ",
    type: "success",
  })

  // shows what is stored inside the watchlist
  useEffect(() => {
    if (user) {
      const coinRef = doc(db, "watchlist", user?.uid);
      var unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          console.log(coin.data().coins);
          setWatchlist(coin.data().coins);
        } else {
          console.log("No Items in Watchlist");
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  // onAuthStateChanged tells the user is logged in
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if(user) setUser(user);
      else setUser(null);
      console.log(user);
    })
  }, [])

  const fetchCoins = async () => {
    setLoading(true);
    // we use {} because it destructures the data we get from axios
    const { data } = await axios.get(CoinList(currency));
    console.log(data);

    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);
  // whenever currency changes useEffect will run

  return (
    <Crypto.Provider value={{
      currency, 
      setCurrency, 
      symbol, 
      coins, 
      loading, 
      fetchCoins,
      alert,
      setAlert,
      user,
      watchlist
      }}
    >
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};

// https://reactjs.org/docs/context.html#reactcreatecontext

// Context provides a way to share values like these between components without having to explicitly pass a prop through every level of the tree.

// to export our state to whole of our app (all children) we are going to use the useContext hook




