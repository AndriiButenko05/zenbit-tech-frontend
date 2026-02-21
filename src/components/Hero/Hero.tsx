import css from "./Hero.module.css";
export default function Hero() {
  return (
    <section className={css.section}>
      <div>
        <h1 className={css.heading}>The chemical negatively charged</h1>
        <p className={css.text}>
          Numerous calculations predict, and experiments confirm, that the force
          field reflects the beam, while the mass defect is not formed. The
          chemical compound is negatively charged. Twhile the mass defect is
        </p>
        <a className={css.button} href="#properties">
          Get started
        </a>
      </div>
    </section>
  );
}
