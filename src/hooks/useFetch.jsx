import { useEffect, useState } from "react";

export function useFetch(initialValue, fetchFn) {
        const [fetchedData, setFetchedData] = useState(initialValue);
        const [isFetching, setIsFetching] = useState(false);
        const [error, setError] = useState();

        useEffect(() => {
                async function fetchData() {
                        setIsFetching(true);
                        try {
                                const data = await fetchFn();
                                setFetchedData(data);
                                setIsFetching(false);
                        } catch (error) {
                                setError(error.message || "Please try again latter.");
                                setIsFetching(false);
                        }
                }
                fetchData();
        }, [fetchFn])

        return {
                fetchedData,
                isFetching,
                error,
        }
}