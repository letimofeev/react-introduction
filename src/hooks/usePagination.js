import {useMemo} from 'react';

export const usePagination = (totalPageCount) => {
    const pagesArray = useMemo(() => {
        let arr = []
        for (let i = 0; i < totalPageCount; i++) {
            arr.push(i + 1)
        }
        return arr
    }, [totalPageCount])

    return pagesArray
}