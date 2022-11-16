import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import * as fs from "fs";

export async function getStaticProps() {
  const blogs = await fs.promises.readFile("./blogs/blogs.json", "utf-8");

  return {
    props: { blogs: JSON.parse(blogs) },
  };
}

export default function Home({ blogs }) {
  const { data: session, status } = useSession();

  function handleSignOut() {
    signOut();
  }

  if (status === "loading") {
    return <h1>Loading......</h1>;
  } else {
    return (
      <>
        <h1>Welcome To Filiz Blogs</h1>
        <VerifyTheUser status={status} handleSignOut={handleSignOut} />
        <h2>All Blogs</h2>
        <ul>
          {blogs.map((blog) => {
            return <li key={blog.id}>{blog.name}</li>;
          })}
        </ul>
      </>
    );
  }
}

function VerifyTheUser({ status, handleSignOut }) {
  if (status === "unauthenticated") {
    return <Guest />;
  } else {
    return <User handleSignOut={handleSignOut} />;
  }
}

function Guest() {
  return (
    <>
      <Link href="/login">
        <button style={{ cursor: "pointer", marginRight: "10px" }}>
          Login
        </button>
      </Link>
      <Link href="/register">
        <button style={{ cursor: "pointer" }}>Register</button>
      </Link>
    </>
  );
}

function User({ handleSignOut }) {
  return (
    <>
      <Link href="/profile">
        <button style={{ cursor: "pointer", marginRight: "10px" }}>
          Your Profile
        </button>
      </Link>
      <button style={{ cursor: "pointer" }} onClick={handleSignOut}>
        Logout
      </button>
    </>
  );
}
