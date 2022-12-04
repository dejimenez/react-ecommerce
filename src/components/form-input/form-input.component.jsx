import { FormInputLabel, Input, Group } from "./form-input.styles";

export default function FormInput({ label, ...otherProps }) {
  const { value } = otherProps;
  return (
    <Group>
      <Input {...otherProps} />
      {label && <FormInputLabel shrink={value.length}>{label}</FormInputLabel>}
    </Group>
  );
}
