// CSS
import styles from "./Loading.module.css"

// Modules
import 'ldrs/hatch'

const Loading = () => {
    return (
        <div>
            <l-hatch
                size="28"
                stroke="4"
                speed="4.5"
                color="#F5DADF" 
            ></l-hatch>
        </div>
    )
}

export default Loading