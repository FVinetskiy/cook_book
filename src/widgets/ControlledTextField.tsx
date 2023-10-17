import { TextField } from "@consta/uikit/TextField";
import { useId } from "react";
import { Control, useController } from "react-hook-form";
import { Text } from "@consta/uikit/Text";

type Inputs = {
  mail: string;
  password: string;
};

type Rules = {
  required?: string;
  pattern?: { value: RegExp; message: string };
  minLength?: {
    value: number;
    message: string;
  };
};

type ControlTextFieldProps = {
  placeholder: string;
  control?: Control<Inputs, any>;
  name: "mail" | "password";
  rules?: Rules;
  type: string;
};

const ControlledTextField = (props: ControlTextFieldProps) => {
  const { placeholder, control, name, rules, type } = props;
  const id = useId();

  const { field, fieldState } = useController({
    name,
    control,
    rules,
  });

  const handleOnChange = ({ value }: any) => {
    field.onChange(value);
  };

  return (
    <div style={{ marginBottom: 24 }}>
      <TextField
        id={id}
        value={field.value}
        onChange={handleOnChange}
        status={fieldState.invalid ? "alert" : undefined}
        width="full"
        placeholder={placeholder}
        type={type}
      />
      {fieldState.invalid && fieldState.error?.message && (
        <Text view="alert">{fieldState.error?.message}</Text>
      )}
    </div>
  );
};

export default ControlledTextField;
