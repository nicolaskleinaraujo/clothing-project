// CSS
import styles from "./Footer.module.css"

const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.footer_compliments}>
                <div>
                    <h2>Entregamos em todo Brasil</h2>
                    <p>Envio imediato após a confirmação de pagamento</p>
                </div>

                <div>
                    <h2>Cliente Satisfeito</h2>
                    <p>Nota maxima no <a href="http://www.reclameaqui.com.br" target="_blank">Reclame AQUI</a></p>
                </div>

                <div>
                    <h2>Suporte ao cliente</h2>
                    <p>Atendimento de Seg. a Sab. das 8h às 15h</p>
                </div>

                <div>
                    <h2>Pagamento seguro</h2>
                    <p>Pagamento gerenciado pelo Mercado Pago para assegurar sua segurança</p>
                </div>
            </div>

            <div className={styles.footer_payments}>
                <img src="https://placehold.co/50x50" alt="Metodo de Pagamento" />
                <img src="https://placehold.co/50x50" alt="Metodo de Pagamento" />
                <img src="https://placehold.co/50x50" alt="Metodo de Pagamento" />
            </div>
        </div>
    )
}

export default Footer
