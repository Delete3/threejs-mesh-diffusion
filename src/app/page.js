import styles from "./page.module.css";
import App from './views'

const Home = () => {
  return <main className={styles.main}>
    <App />
  </main>;
}

export default Home;