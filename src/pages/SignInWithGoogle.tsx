import { signInWithGoogle } from "../firebaseConfig";

const SignInWithGoogle = () => {
  return (
    <div>
      <button onClick={signInWithGoogle}>Sign In With Google</button>
    </div>
  );
};

export default SignInWithGoogle;
