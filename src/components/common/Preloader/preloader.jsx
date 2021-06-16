import styles from "../Preloader/preloader.module.css";
import React from "react";

let Preloader = (props) => {
    return <div className={styles.lds_ring}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
}

export default Preloader;