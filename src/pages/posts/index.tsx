import Head from "next/head";
import styles from "./styles.module.scss";

export default function Posts() {
  return (
    <>
      <Head>
        <title>Post | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#">
            <time>12 de março de 2021</time>
            <strong>creating bla bla bla</strong>
            <p>encher de linguiça para ocupar espaço</p>
          </a>

          <a href="#">
            <time>12 de março de 2021</time>
            <strong>creating bla bla bla</strong>
            <p>encher de linguiça para ocupar espaço</p>
          </a>

          <a href="#">
            <time>12 de março de 2021</time>
            <strong>creating bla bla bla</strong>
            <p>encher de linguiça para ocupar espaço</p>
          </a>
        </div>
      </main>
    </>
  );
}
