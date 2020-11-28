import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import { InputType } from 'reactstrap/lib/Input';
import { FieldConfig } from 'formik/dist';
import ErrorSpan from './ErrorSpan';
interface ICustomField extends FieldConfig {
  type: InputType;
}
interface ITextInputProps {
  field: ICustomField;
  label: string;
  name: string;
  type: InputType;
  placeholder?: string;
  error?: string;
}

function TextInput({ label, placeholder, field, error }: ITextInputProps) {
  console.log(field);
  return (
    <FormGroup>
      <Label htmlFor={field.name}>{label}</Label>
      <Input id={field.name} placeholder={placeholder} {...field} />
      {error && <ErrorSpan>{error}</ErrorSpan>}
    </FormGroup>
  );
}

export default TextInput;
