// CSS
import styles from "./Login.module.css"

const Login = () => {
    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log("Handled!")
    }

    return (
        <div className={styles.login}>
            <img src="https://via.placeholder.com/500x650" alt="Imagem Roupa" />

            <form onSubmit={handleSubmit}>
                <label>
                    <p>Email</p>
                    <input type="email" />
                </label>

                <label>
                    <p>Senha</p>
                    <input type="password" />
                </label>

                <input type="submit" value="Login" />

                <p>Não tem uma conta? <a href="/register">Criar</a></p>
            </form>
        </div>
    )
}

export default Login