// CSS
import styles from "./Navbar.module.css"

const Navbar = () => {
    return (
        <div className={styles.navbar}>
            <img src="https://via.placeholder.com/70x70" alt="Logo do Projeto" />

            <div className={styles.category}>
                <button>Categorias &#8595;</button>
                <div className={styles.category_content}>
                    <a href="#">Masculini</a>
                    <a href="#">Feminino</a>
                    <a href="#">Camisas</a>
                    <a href="#">Calças</a>
                    <a href="#">meias</a>
                    <a href="#">Cuecas</a>
                </div>
            </div>

            <div className={styles.size}>
                <button>Tamanhos &#8595;</button>
                <div className={styles.size_content}>
                    <a href="#">Tamanho 1</a>
                </div>
            </div>

            <div className={styles.account}>
                <a href="#">conta</a>
                <a href="#">pedidos</a>
            </div>
        </div>
    )
}

export default Navbar
