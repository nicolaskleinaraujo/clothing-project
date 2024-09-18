// CSS
import styles from "./Loading.module.css"

// Modules
import { hatch } from 'ldrs'
hatch.register()

const Loading = () => {
    return (
        <div className={styles.loading}>
            <l-hatch
                size="80"
                stroke="10"
                speed="3.8"
                color="#F5DADF"
            ></l-hatch>
        </div>
    )
}

export default Loading
