import styles from "../../Users/Users.module.css";
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