// CSS
import styles from "./CreateOrder.module.css"

// Modules
import dbFetch from "../../config/axios"

const CreateOrder = () => {
    return (
        <div>
            <h2>Endereço</h2>
            <p>...</p>

            <h2>Cupom</h2>
            <div>
                <input
                    type="text"
                    name="coupon"
                    id="coupon"
                    placeholder="Digite o cupom"
                />
                <button>Adicionar Cupom</button>
            </div>

            <h2>Entrega</h2>
            <select name="delivery" id="delivery">
                <option value="">PAC</option>
                <option value="">Sedex</option>
            </select>

            <h2>Detalhes</h2>
            <p>...</p>
        </div>
    )
}

export default CreateOrder
