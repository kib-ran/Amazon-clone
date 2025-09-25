import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { auth } from "../../Utility/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { FadeLoader } from "react-spinners";
import { useCart } from "../../Context/CartProvider";
import classes from "./Auth.module.css";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loadingAction, setLoadingAction] = useState("");

  const navigate = useNavigate();
  const { dispatch } = useCart();
  const navStateData = useLocation();

  const handleAuth = async (e) => {
    e.preventDefault();
    const action = e.target.name;

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoadingAction(action);

    try {
      let userCredential;
      if (action === "signin") {
        userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      } else {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
      }

      dispatch({ type: "SET_USER", payload: userCredential.user });
      setError("");

      navigate(navStateData?.state?.redirect || "/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingAction("");
    }
  };

  return (
    <section className={classes.login}>
      <div className={classes.logoContainer}>
        <Link to="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
            alt="Amazon"
            className={classes.logo}
          />
        </Link>
        <h1 className={classes.heading}>Sign In</h1>
        {navStateData?.state?.msg && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
              display: "block",
            }}
          >
            {navStateData.state.msg}
          </small>
        )}
      </div>

      <div className={classes.formContainer}>
        <form name="authForm">
          <div className={classes.inputGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={classes.inputGroup}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            name="signin"
            onClick={handleAuth}
            className={classes.signInBtn}
            disabled={loadingAction === "signin" || loadingAction === "signup"}
          >
            {loadingAction === "signin" ? (
              <div className={classes.spinnerWrapper}>
                <FadeLoader
                  height={10}
                  width={4}
                  radius={2}
                  margin={-4}
                  color="#D49644"
                />
              </div>
            ) : (
              "Sign In"
            )}
          </button>

          {error && <p className={classes.error}>{error}</p>}
        </form>

        <button
          name="signup"
          onClick={handleAuth}
          className={classes.createBtn}
          disabled={loadingAction === "signin" || loadingAction === "signup"}
        >
          {loadingAction === "signup" ? (
            <div className={classes.spinnerWrapper}>
              <FadeLoader
                height={10}
                width={4}
                radius={2}
                margin={-4}
                color="#85bfeeff"
              />
            </div>
          ) : (
            "Create your Amazon Account"
          )}
        </button>

        <p className={classes.disclaimer}>
          By signing-in you agree to the <strong>AMAZON FAKE CLONE</strong>{" "}
          Conditions of Use & Sale. Please see our Privacy Notice, our Cookies
          Notice and our Interest-Based Ads Notice.
        </p>
      </div>
    </section>
  );
}

export default Auth;
