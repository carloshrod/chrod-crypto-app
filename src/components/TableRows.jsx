import { useCoinsContext } from '../context/CoinsContext';
import { currencyFormatter } from '../utils';

function TableRows({ coin, index }) {
    const { id, name, image, symbol, current_price, price_change_percentage_24h, total_volume } = coin;
    const { setCoinId, setModalAction } = useCoinsContext();

    const color = price_change_percentage_24h === 0
        ? "" : price_change_percentage_24h > 0 ? "#4caf50" : "#f44336";

    const handleDetails = () => {
        setModalAction("details");
        setCoinId(id);
    }

    const handleConverter = () => {
        setModalAction("convert");
        setCoinId(id);
    }

    return (
        <>
            <tr>
                <th className="align-middle">{index}</th>
                <td>
                    <div className="grid">
                        <div>
                            <img src={image} alt={name} />
                        </div>
                        <span>
                            {name}
                        </span>
                    </div>
                </td>
                <td>{symbol}</td>
                <td>{currencyFormatter(current_price)}</td>
                <td style={{ color: `${color}` }}>{price_change_percentage_24h}</td>
                <td>{total_volume}</td>
                <td>
                    <i
                        className="fa-solid fa-eye me-3"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={handleDetails}
                    />
                    <i
                        className="fa-solid fa-dollar"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={handleConverter}
                    />
                </td>
            </tr>
        </>
    )
}

export default TableRows;