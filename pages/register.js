import Link from "next/link";

export default function Register() {
  return (
    <>
      <h1>Create a New Account!</h1>
      <form>
        <input type="email" placeholder="Your email" name="email" />
        <br />
        <input type="text" placeholder="Full name" name="full_name" />
        <br />
        <input type="password" placeholder="password" name="password" />
        <br />
        <input
          type="password"
          placeholder="confirm password"
          name="cpassword"
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
