import React from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import SignInBox from "../components/SignInBox";

const SignInPage: React.FunctionComponent = () => {
  return (
    <Layout title="About | Next.js + TypeScript Example">
      <h1>Sign In</h1>
      <SignInBox />
      <p>
        <Link href="/">
          <a>Cancel</a>
        </Link>
      </p>
    </Layout>
  );
};

export default SignInPage;
