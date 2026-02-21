import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";
export default function NotFoundPage() {
  return (
    <div className={css.container}>
      <h1 className={css.code}>404</h1>
      <div className={css.divider} />
      <h2 className={css.title}>Page Not Found</h2>
      <p className={css.text}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className={css.button}>
        Back to Home
      </Link>
    </div>
  );
}
