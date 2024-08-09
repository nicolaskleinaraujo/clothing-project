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
                speed="3.5"
                color="black" 
            ></l-hatch>
        </div>
    )
}

export default Loading