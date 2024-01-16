import styles from "./footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.logospan}>Palabricidio</p>

      <div className={styles.autor}>
        <p>Contactar Autor:</p>
        <p>
          <a
            href="https://contact-gdominguez.netlify.app"
            target="_blank"
            rel="noreferrer"
            className={styles.hyper}
          >
            Guillermo Domínguez
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;