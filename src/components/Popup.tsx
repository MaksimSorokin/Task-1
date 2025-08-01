import React from 'react'
import styles from './popup.module.css'

interface Obj extends Object {
    content: React.ReactNode,
    handleClose: React.MouseEventHandler
}

const Popup = (props: Obj) => {
    return (
        <div
            className={styles.popup_box}
        >
            <div 
                className={styles.popup_content}
            >
                {props.content}
            </div>

            <div
                onClick={props.handleClose}
                className={styles.close_background}
            >
            </div>
        </div>
    )
}

export default Popup