// CSS
import styles from "./Footer.module.css"

// Modules
import { FiTruck, FiThumbsUp } from "react-icons/fi"
import { MdOutlineMarkChatRead } from "react-icons/md"
import { AiOutlineSafety } from "react-icons/ai"

const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.footer_compliments}>
                <div>
                    <h2><FiTruck /> Entregamos em todo Brasil</h2>
                    <p>Envio imediato após a confirmação de pagamento</p>
                </div>

                <div>
                    <h2><FiThumbsUp /> Cliente Satisfeito</h2>
                    <p>Nota maxima no <a href="https://reclameaqui.com.br" target="_blank">Reclame AQUI</a></p>
                </div>

                <div>
                    <h2><MdOutlineMarkChatRead /> Suporte ao cliente</h2>
                    <p>Atendimento de Seg. a Sab. das 8h às 15h</p>
                </div>

                <div>
                    <h2><AiOutlineSafety /> Pagamento seguro</h2>
                    <p>Pagamento gerenciado pelo Mercado Pago para assegurar sua segurança</p>
                </div>
            </div>

            <div className={styles.footer_payments}>
                <img src="/visa-logo.png" alt="Logo da Visa" />
                <img src="/mastercard-logo.png" alt="Logo da Mastercard" />
                <img src="/pix-logo.png" alt="Logo do Pix" />
                <img src="/mercadopago-logo.png" alt="Logo do Mercado Pago" />
                <img src="/caixa-logo.png" alt="Logo da Caixa Economica Federal" />
            </div>

            <div className={styles.footer_disclaimer}>
                <p>Este site foi feito por <a href="https://github.com/nicolaskleinaraujo" target="_blank">Nicolas Klein</a></p>
                <p>NÃO EFETUE COMPRAS NESTE SITE</p>
                <p>Favor, utilizar as features com moderação e consciência</p>
                <p><a href="mailto:contatonkfa@gmail.com">contatonkfa@gmail.com</a></p>
            </div>
        </div>
    )
}

export default Footer
