import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Profile() {
  const router = useRouter();
  const { data: session, status } = useSession();

  function handleSignOut() {
    signOut();
  }

  if (status === "loading") {
    return (
      <>
        <h1>Loading.......</h1>
      </>
    );
  } else if (status === "unauthenticated") {
    router.push("/login");
  } else {
    return (
      <>
        <h1>Your Profile</h1>

        <Image
          src={
            !session.user.image
              ? "http://www.gravatar.com/avatar/?d=identicon"
              : session.user.image
          }
          alt="Upload your Avatar"
          width={100}
          height={100}
        />

        <h4>Name: {session.user.name} </h4>
        <h4>Email: {session.user.email}</h4>

        <Link href="/">
          <button style={{ cursor: "pointer", marginRight: "10px" }}>
            Home
          </button>
        </Link>
        <Link href="/">
          <button style={{ cursor: "pointer" }} onClick={handleSignOut}>
            Logout
          </button>
        </Link>
      </>
    );
  }
}
