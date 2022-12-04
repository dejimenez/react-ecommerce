import { useState, useEffect } from "react";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  checkRedirectResult,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import { SignInContainer, ButtonsContainer } from "./sign-in.style";

const defaultFormFields = {
  email: "",
  password: "",
};

export default function SignIn() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  useEffect(() => {
    checkRedirectResult();
  }, []);

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    createUserDocumentFromAuth(user);
  };

  const signInWithRedirect = async () => {
    await signInWithGoogleRedirect();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      setFormFields(defaultFormFields);
    } catch (error) {
      if (error.code === "auth/email-already-in-use")
        console.error("User creation error", error.message);
    }
  };

  return (
    <SignInContainer>
      <h2>Already have an account?</h2>
      <span>Sign In with email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
          label="Email"
        />

        <FormInput
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
          label="Password"
        />
        <ButtonsContainer>
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            onClick={signInWithGoogle}
            buttonType={BUTTON_TYPE_CLASSES.google}
          >
            Google Sign In
          </Button>
          {/* <Button onClick={signInWithRedirect} buttonType="google">
            Google Sign In
          </Button> */}
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
}
