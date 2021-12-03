import React, { useState, useEffect, useReducer, useContext } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import Input from "../UI/Input/Input";

const emailReducer = (state, action) => {
  if(action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.includes('@') };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes('@') };
  }
  return { value: '', isValid: false };
};

const passwordReducer = (state, action) => {
  if(action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: '', isValid: false };
};

const Login = (props) => {
  // Combine the 2 following useState hook in the emailReducer function by using a useReducer hook
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();

  // Combine the 2 following useState hook in the passwordReducer fct the same way 
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  // Reducer function 
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const authCtx = useContext(AuthContext); 

  useEffect(() => {
    console.log('EFFECT RUNNING');
    return () => {
      console.log('EFFECT CLEANUP');
    };
  }, []);

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    
    const identifier = setTimeout(() => {
      console.log('Checking form validity!');
      setFormIsValid(
        emailIsValid && passwordIsValid);
    }, 500);

    // Clean up function 
    return () => {
      console.log('cleanup');
      // Built in browser function 
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

    const emailChangeHandler = (event) => {
      dispatchEmail({type: 'USER_INPUT', val: event.target.value});

      // setFormIsValid(
      //   event.target.value.includes('@') && passwordState.isValid
      // );
  };

    const passwordChangeHandler = (event) => {
      dispatchPassword({type: 'USER_INPUT', val: event.target.value});

      // setFormIsValid(
      //   event.target.value.includes("@") && event.target.value.trim().length > 6
      // );
    };

    const validateEmailHandler = () => {
      dispatchEmail({type: 'INPUT_BLUR'});
    };

    const validatePasswordHandler = () => {
      dispatchPassword({type: 'INPUT_BLUR'});
    };

    const submitHandler = (event) => {
      event.preventDefault();
      authCtx.onLogin(emailState.value, passwordState.value);
    };

    return (
      <Card className={classes.login}>
        <form onSubmit={submitHandler}>
          <Input
            id="email"
            label="E-mail"
            type="email"
            isValid={emailIsValid}  
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
           <Input
            id="password"
            label="Password"
            type="password"
            isValid={passwordIsValid}  
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
          <div className={classes.actions}>
            <Button
              type="submit"
              className={classes.btn}
              disabled={!formIsValid}
            >
              Login
            </Button>
          </div>
        </form>
      </Card>
    );
  };

export default Login;
