import React, {useState} from 'react'
import styles from "./Paginator.module.css";
import classNames from "classnames"

type PropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    portionSize?: number
}

let Paginator: React.FC<PropsType> = ({totalItemsCount,pageSize,currentPage,onPageChanged,portionSize = 10}) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return <div className={styles.paginator}>
        {portionNumber > 1 &&
        <button onClick={() => {
            setPortionNumber(portionNumber - 1)
        }}>пред.</button>}
        {pages
            .filter(portion => portion >= leftPortionPageNumber && portion <= rightPortionPageNumber)
            .map(page => {
                return <span className={ classNames({
                    [styles.selectedPage]: currentPage === page},
                    styles.pageNumber)}

                             onClick={(e) => {
                                 onPageChanged(page)
                             }}
                             key={page}>
                        {page}
                    </span>
            })}
        {portionCount > portionNumber &&
        <button onClick={() => {
            setPortionNumber(portionNumber + 1)
        }}>след.</button>}
    </div>
}

export default Paginator;