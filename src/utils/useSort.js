import { useState } from "react";

export const useSort = (coins) => {
    const [sorting, setSorting] = useState({ field: "", order: "" });
    const [sortingField, setSortingField] = useState("");
    const [sortingOrder, setSortingOrder] = useState("asc");

    const onSorting = (field, order) => setSorting({ field, order })

    const onSortingChange = field => {
        const order = field === sortingField && sortingOrder === "asc" ? "desc" : "asc";
        setSortingField(field);
        setSortingOrder(order);
        onSorting(field, order);
    };

    if (sorting.field) {
        const reversed = sorting.order === "asc" ? 1 : -1;
        coins = coins.sort((a, b) => reversed * (a[sorting.field] - b[sorting.field]))
    };

    return {
        sorting, setSorting,
        sortingField, sortingOrder,
        onSortingChange
    }
}

