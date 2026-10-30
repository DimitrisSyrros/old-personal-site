import React from "react";

const DownloadFile = ({children, src, styles, title}) => {
    return (
        <a href={src} style={styles} title={title} aria-label={title} download>{children}</a>
    )
}

export default DownloadFile;