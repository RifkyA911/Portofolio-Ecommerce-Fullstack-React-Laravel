import { createContext, useContext } from "react";
import { useForm, Controller } from "react-hook-form";

const ReactHookFormContext = createContext();

export const useReactHookFormContext = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    setFocus,
    setError,
    control,
    formState: { errors, isValid, dirtyFields },
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      superAuthorizationPassword: import.meta.env
        .VITE_SUPER_AUTHORIZATION_PASSWORD,
    },
  });
  return useContext(ReactHookFormContext);
};
