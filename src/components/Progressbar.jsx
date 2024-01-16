/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import styles from "./progressbar.module.css";

export default function Progressbar({pleaseGo, increment}) {

  const [percent, setPercent] = useState(100); 

  useEffect(() => {
    let intervalId
    if (pleaseGo) {
        intervalId = setInterval(() => {
            if(percent > 0) {
                setPercent(prevPercent => prevPercent - increment)
            } 
        }, 200)

        return () => clearInterval(intervalId)
    } 

    if (!pleaseGo) {
      setPercent(100) 
    }
  }, [increment, percent, pleaseGo]);

  const getColor = () => {
    if (percent < 20) {
      return "#ff0000";
    } else if (percent < 40) {
      return "#ffa500";
    } else {
      return "#2ecc71";
    }
  };

  return (
    <>
      <div className={styles.progressbar}>
        <div
          className={styles.progressbarfill}
          style={{ width: `${percent}%`, backgroundColor: getColor() }}
        ></div>
      </div>
    </>
  );
}

