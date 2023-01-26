import { useState } from "react";
import { BounceLoader, BeatLoader } from "react-spinners";
import { useCoinsContext } from "../context/CoinsContext";
import { http, currencyFormatter } from "../utils";

function Converter() {
    const { coin, coinId, isCoinLoading, result, setResult } = useCoinsContext();
    const [form, setForm] = useState({ quantity: "" });
    const [isLoading, setIsLoading] = useState(false);

    if (!coin) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        })
    }

    const calculateValue = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const res = await http().get(`https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd&precision=2`);
            const total = form.quantity * res[coinId].usd;
            setTimeout(() => {
                setIsLoading(false);
                setResult(total.toFixed(2));
            }, 500);
        } catch (error) {
            console.error(error.message);
        }
    }

    const resultColor = result > 0 ? "#4caf50" : "";

    return (
        <div className="converter container">
            {isCoinLoading
                ?
                <div className="converter__loader">
                    <BounceLoader
                        color="black"
                        size={100}
                        aria-label="Loading Spinner"
                    />
                </div>
                :
                <>
                    <div className="converter__title">
                        <img src={coin.image} />
                        <h3>{coin.name}</h3>
                    </div>
                    <form className="row g-3" onSubmit={calculateValue}>
                        <input
                            className="form-control"
                            placeholder="Coin quantity" type="number"
                            name="quantity"
                            onChange={handleChange}
                        />
                        <div className="text-center">
                            <button
                                className="btn btn-dark"
                            >
                                {isLoading
                                    ?
                                    <BeatLoader
                                        color="#ddd"
                                        size={5}
                                        cssOverride={{ margin: "0 2.2rem" }}
                                        aria-label="Loading Spinner"
                                    />
                                    :
                                    <span>Convert to <i className="fa-solid fa-dollar-sign" /></span>
                                }
                            </button>
                        </div>
                    </form>
                    {result &&
                        <div className="converter__result">
                            <div>Value(USD):</div>
                            <span
                                style={{ color: `${resultColor}` }}>
                                {currencyFormatter(result)}
                            </span>
                        </div>
                    }
                </>
            }
        </div>
    )
}

export default Converter