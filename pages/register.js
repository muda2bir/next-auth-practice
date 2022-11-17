import Link from "next/link";
import { useFormik } from "formik";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      cpassword: "",
    },
    onSubmit,
  });

  async function onSubmit(values) {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    const response = await fetch(
      "http://localhost:3000/api/auth/signup",
      options
    );
    const data = response.json();
    if (data) {
      router.push("http://localhost:3000/login");
    }
  }

  return (
    <>
      <h1>Create a New Account!</h1>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="email"
          placeholder="Your email"
          name="email"
          {...formik.getFieldProps("email")}
        />
        <br />
        <input
          type="text"
          placeholder="Full name"
          name="name"
          {...formik.getFieldProps("name")}
        />
        <br />
        <input
          type="password"
          placeholder="password"
          name="password"
          {...formik.getFieldProps("password")}
        />
        <br />
        <input
          type="password"
          placeholder="confirm password"
          name="cpassword"
          {...formik.getFieldProps("cpassword")}
        />
        <br />
        <button style={{ cursor: "pointer" }} type="submit">
          Create Account
        </button>
        <br />
        <Link href="/">
          <button>Home</button>
        </Link>
      </form>
    </>
  );
}
