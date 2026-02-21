import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { registerUser } from "../../api/authApi";
import { AxiosError } from "axios";
import css from "./RegisterPage.module.css";
export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    setIsLoading(true);
    try {
      await registerUser({ email, password });
      toast.success("Registration successful! Please log in.");
      navigate("/login");
    } catch (error) {
      const errorMessage =
        (error as AxiosError<{ message?: string }>)?.response?.data?.message ||
        "Failed to register. Please try again.";
      toast.error(errorMessage);
      console.error("Registration failed:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={css.container}>
      <div className={css.imageSection}></div>
      <div className={css.formSection}>
        <div className={css.formWrapper}>
          <h1 className={css.title}>Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <div className={css.inputGroup}>
              <label htmlFor="email" className={css.label}>
                Email
              </label>
              <input
                type="email"
                id="email"
                className={css.input}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={css.inputGroup}>
              <label htmlFor="password" className={css.label}>
                Password
              </label>
              <input
                type="password"
                id="password"
                className={css.input}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <div className={css.inputGroup}>
              <label htmlFor="confirmPassword" className={css.label}>
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className={css.input}
                placeholder="Repeat your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className={css.submitBtn}
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>
          <p className={css.signupText}>
            Already have an account?{" "}
            <Link to="/login" className={css.signupLink}>
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
