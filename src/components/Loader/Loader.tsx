import css from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.loadingWave}>
        <div className={css.loadingBar} />
        <div className={css.loadingBar} />
        <div className={css.loadingBar} />
        <div className={css.loadingBar} />
      </div>
    </div>
  );
};

export default Loader;
