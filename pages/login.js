import Link from "next/link";
import { signIn } from "next-auth/react";

export default function Login() {
  async function handleGoogleSignIn() {
    signIn("google", { callbackUrl: "http://localhost:3000" });
  }

  return (
    <>
      <h1>Login to your Account!</h1>
      <form>
        <input type="email" placeholder="Email" name="email" />
        <br />
        <input type="password" placeholder="password" name="password" />
        <br />
        <button
          style={{ cursor: "pointer", marginRight: "10px" }}
          type="submit"
        >
          Login
        </button>
        <button
          type="button"
          style={{ cursor: "pointer" }}
          onClick={handleGoogleSignIn}
        >
          Login with Google
        </button>
        <br />
        <Link href="/">
          <button>Home</button>
        </Link>
      </form>
    </>
  );
}
