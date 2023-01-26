import { createContext, useContext, useEffect, useState } from "react";
import { http } from "../utils";

const CoinsContext = createContext();

const CoinsProvider = ({ children }) => {
    const [coins, setCoins] = useState([]);
    const [coinId, setCoinId] = useState({});
    const [coin, setCoin] = useState({});
    const [filter, setFilter] = useState("");
    const [areCoinsLoading, setAreCoinsLoading] = useState(false);
    const [isCoinLoading, setIsCoinLoading] = useState(false);
    const [modalAction, setModalAction] = useState(null);
    const [result, setResult] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setAreCoinsLoading(true);
                const res = await http().get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
                if (!res.error) {
                    setCoins(res)
                }
            } catch (error) {
                console.log(error.message);
            } finally {
                setAreCoinsLoading(false);
            }
        }
        fetchData();
    }, [])

    const fetchCoin = async () => {
        try {
            setIsCoinLoading(true);
            const res = await http().get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinId}&order=market_cap_desc&per_page=1&page=1&sparkline=false`);
            setCoin(res[0]);
        } catch (error) {
            console.log(error.message);
        } finally {
            setTimeout(() => {
                setIsCoinLoading(false);
            }, 300);
        }
    };

    const filteredCoins = coins.filter((coin) => {
        return (
            coin.name.toLowerCase().includes(filter.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(filter.toLowerCase())
        )
    });

    const data = {
        setCoins, filteredCoins,
        coinId, setCoinId, fetchCoin,
        coin, setCoin,
        filter, setFilter,
        areCoinsLoading, isCoinLoading,
        modalAction, setModalAction,
        result, setResult
    }

    return (
        <CoinsContext.Provider value={data}>
            {children}
        </CoinsContext.Provider>
    )
}

export const useCoinsContext = () => useContext(CoinsContext);
export { CoinsProvider };