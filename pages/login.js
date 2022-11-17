import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useFormik } from "formik";

export default function Login() {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
  });

  async function handleGoogleSignIn() {
    signIn("google", { callbackUrl: "http://localhost:3000" });
  }

  async function onSubmit(values) {
    const status = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: "/",
    });

    if (status.ok) {
      router.push(status.url);
    }
  }

  return (
    <>
      <h1>Login to your Account!</h1>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          {...formik.getFieldProps("email")}
        />
        <br />
        <input
          type="password"
          placeholder="password"
          name="password"
          {...formik.getFieldProps("password")}
        />
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
