import { BounceLoader } from "react-spinners";
import { useCoinsContext } from "../context/CoinsContext";
import { useSort } from "../utils";
import { TableRows } from "./";

function Table() {
    const { filteredCoins: coins, areCoinsLoading } = useCoinsContext();
    const { sortingField, sortingOrder, onSortingChange } = useSort(coins);

    const tableHeaders = [
        {
            label: "#",
            sortable: false
        },
        {
            label: "Coin",
            sortable: false
        },
        {
            label: "Symbol",
            sortable: false
        },
        {
            label: "Price(USD)",
            field: "current_price",
            sortable: true
        },
        {
            label: "Price Change 24h %",
            field: "price_change_percentage_24h",
            sortable: true
        },
        {
            label: "Total Volume",
            field: "total_volume",
            sortable: true
        },
        {
            label: "Details",
            sortable: false
        }
    ];

    return (
        <div className="container my-3">
            <div className="card table-responsive p-2">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            {tableHeaders.map((header, index) => (
                                <th
                                    key={index}
                                    className={`${header.sortable ? "pointer" : ""}`}
                                    onClick={() => header.sortable ? onSortingChange(header.field) : null}
                                >
                                    {header.label}
                                    {sortingField && sortingField === header.field && (
                                        sortingOrder === "asc"
                                            ? <i className="fa-solid fa-caret-up" />
                                            : <i className="fa-solid fa-caret-down" />
                                    )
                                    }
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {areCoinsLoading
                            ?
                            <tr>
                                <td colSpan={7}>
                                    <div className="table__loader">
                                        <BounceLoader
                                            color="black"
                                            size={100}
                                            aria-label="Loading Spinner"
                                        />
                                    </div>
                                </td>
                            </tr>
                            :
                            <>
                                {coins.length === 0
                                    ?
                                    <tr>
                                        <td colSpan={7}>
                                            <div className="table__noData">
                                                <span>No results!</span>
                                            </div>
                                        </td>
                                    </tr>
                                    :
                                    <>
                                        {
                                            coins.map((coin, index) => (
                                                <TableRows
                                                    key={coin.id}
                                                    index={index + 1}
                                                    coin={coin}
                                                />
                                            ))
                                        }
                                    </>
                                }
                            </>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Table;
