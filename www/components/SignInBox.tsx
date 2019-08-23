import { useRef, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
//import redirect from "../lib/redirect";

const SIGN_IN = gql`
  mutation Signin($email: String!, $password: String!) {
    signinUser(email: $email, password: $password) {
      email
      name
    }
  }
`;

interface User {
  email: String;
  name: String;
}

const SigninBox = () => {
  const [signedInUser, setSignedInUser] = useState<User | null>(null);

  const onCompleted = (data: any) => {
    setSignedInUser(data.signinUser);
  };

  const onError = (error: any) => {
    console.error(error);
  };

  const [signinUser, { error }] = useMutation(SIGN_IN, {
    onCompleted,
    onError
  });

  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  return signedInUser ? (
    <div>user {signedInUser.name} is signed in.</div>
  ) : (
    <form
      onSubmit={e => {
        e.preventDefault();
        e.stopPropagation();

        if (email && email.current && password && password.current) {
          signinUser({
            variables: {
              email: email.current.value,
              password: password.current.value
            }
          });

          email.current.value = password.current.value = "";
        }
      }}
    >
      {error && <p>No user found with that information.</p>}
      <input name="email" placeholder="Email" ref={email} />
      <br />
      <input
        name="password"
        placeholder="Password"
        ref={password}
        type="password"
      />
      <br />
      <button>Sign in</button>
    </form>
  );
};

export default SigninBox;
