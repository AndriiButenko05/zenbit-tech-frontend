import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { setCredentials } from "../../features/authSlice";
import css from "./LoginPage.module.css";
import { loginUser } from "../../api/authApi";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await loginUser({ email, password });
      const token = data.access_token;
      if (!token) {
        throw new Error("No token received from server");
      }
      dispatch(setCredentials({ token: token, email: email }));
      toast.success("Successfully logged in!");
      navigate("/");
    } catch {
      toast.error("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={css.container}>
      <div className={css.imageSection}></div>
      <div className={css.formSection}>
        <div className={css.formWrapper}>
          <h1 className={css.title}>Login</h1>
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
            <div className={css.inputGroup}>
              <label htmlFor="password" className={css.label}>
                Password
              </label>
              <input
                type="password"
                id="password"
                className={css.input}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Link to="/resetPwd" className={css.forgotPassword}>
              Forgot password?
            </Link>
            <button
              type="submit"
              className={css.submitBtn}
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className={css.signupText}>
            Don't have account?{" "}
            <Link to="/register" className={css.signupLink}>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
