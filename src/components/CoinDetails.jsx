import { BounceLoader } from "react-spinners";
import { useCoinsContext } from "../context/CoinsContext";

function CoinDetails() {
    const { coin, isCoinLoading } = useCoinsContext();

    if (!coin) return null;

    const coinProps = [
        {
            label: "Name",
            data: coin.name
        },
        {
            label: "Rank",
            data: coin.market_cap_rank
        },
        {
            label: "Symbol",
            data: coin.symbol
        },
        {
            label: "Price(USD)",
            data: coin.current_price
        },
        {
            label: "Price Change 24h %",
            data: coin.price_change_percentage_24h
        },
        {
            label: "Price Change 24h",
            data: coin.price_change_24h
        },
        {
            label: "Circulating Supply",
            data: coin.circulating_supply
        },
        {
            label: "Total Supply",
            data: coin.total_supply
        },
        {
            label: "Total Volume",
            data: coin.total_volume
        }
    ]

    return (
        <div className="details d-flex row g-3">
            {isCoinLoading
                ?
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <BounceLoader
                        color="black"
                        size={100}
                        aria-label="Loading Spinner"
                    />
                </div>
                :
                <>
                    <div>
                        <img src={coin.image} alt={coin.name} />
                        <h2>{coin.name}</h2>
                    </div>
                    {coinProps.map((item, index) => (
                        <div key={index} className="col-6 col-lg-4 p-3">
                            <div className="details__label blue-label">{item.label}</div>
                            <div className="details__data mt-2">{item.data}</div>
                        </div>
                    ))}
                </>
            }
        </div>
    )
}

export default CoinDetails;