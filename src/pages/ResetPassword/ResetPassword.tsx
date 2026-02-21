import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import css from "./ResetPassword.module.css";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      toast.success("Mail with instructions sent");
      setEmail("");
      setIsLoading(false);
    }, 1500);
  };
  return (
    <div className={css.container}>
      <div className={css.imageSection}></div>
      <div className={css.formSection}>
        <div className={css.formWrapper}>
          <h1 className={css.title}>Reset Password</h1>
          <form onSubmit={handleSubmit}>
            <div className={css.inputGroup}>
              <label htmlFor="email" className={css.label}>
                Email
              </label>
              <input
                type="email"
                id="email"
                className={css.input}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className={css.submitBtn}
              disabled={isLoading}
            >
              {isLoading ? "Resetting password..." : "Reset password"}
            </button>
          </form>

          <p className={css.signupText}>
            Have account?{" "}
            <Link to="/login" className={css.signupLink}>
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
