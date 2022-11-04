import styles from "../../styles/Login.module.css";
import { useState, useRef } from "react";
import { useRouter } from "next/router";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const error = useRef();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      if (process.env.NODE_ENV === "development") {
        const res = await fetch("http://localhost:3000/api/login", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ username, password }),
        });
        const data = await res.json();

        router.push("/admin");
        if (data.status === 200) {
          error.current = false;
        } else {
          throw new Error(data.message);
        }
      } else {
        const res = await fetch(
          "https://pizza-store-seven-self.vercel.app//api/login",
          {
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ username, password }),
          }
        );
        const data = await res.json();

        router.push("/admin");
        if (data.status === 200) {
          error.current = false;
        } else {
          throw new Error(data.message);
        }
      }
    } catch (err) {
      error.current = true;
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Admin Dashboard</h1>
        <input
          placeholder="username"
          className={styles.input}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          placeholder="password"
          type="password"
          className={styles.input}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button onClick={handleLogin} className={styles.button}>
          Log In
        </button>
        {console.log(error)}
        {error.current === true && (
          <span className={styles.error}>Wrong Credentials!</span>
        )}
      </div>
    </div>
  );
};

export default Login;
