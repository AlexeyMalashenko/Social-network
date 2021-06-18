import React, {useState} from 'react'
import styles from "./Paginator.module.css";
import classNames from "classnames"

let Paginator = (props) => {

    let pagesCount = Math.ceil(props.totalItemsCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / props.portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * props.portionSize + 1;
    let rightPortionPageNumber = portionNumber * props.portionSize;

    return <div className={styles.paginator}>
        {portionNumber > 1 &&
        <button onClick={() => {
            setPortionNumber(portionNumber - 1)
        }}>пред.</button>}
        {pages
            .filter(portion => portion >= leftPortionPageNumber && portion <= rightPortionPageNumber)
            .map(page => {
                return <span className={ classNames({
                    [styles.selectedPage]: props.currentPage === page},
                    styles.pageNumber)}

                             onClick={(e) => {
                                 props.onPageChanged(page)
                             }}
                             key={page.id}>
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