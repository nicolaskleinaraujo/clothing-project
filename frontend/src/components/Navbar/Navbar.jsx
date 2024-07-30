// CSS
import styles from "./Navbar.module.css"

const Navbar = () => {
    return (
        <div>
            <img src="https://via.assets.so/img.jpg?w=100&h=100&tc=black&bg=#cecece&t=logo" alt="Logo do Projeto" />
            <div>
                <button>Categorias</button>
                <div>
                    <a href="#">Categoria 1</a>
                </div>
            </div>

            <div>
                <button>Tamanhos</button>
                <div>
                    <a href="#">Tamanho 1</a>
                </div>
            </div>

            <div>
                <a href="#">conta</a>
                <a href="#">pedidos</a>
            </div>
        </div>
    )
}

export default Navbar
