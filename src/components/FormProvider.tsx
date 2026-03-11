import {
  FormProvider as FormProviderHookForm,
  type FieldValues,
  type FormProviderProps as FormProviderPropsHookForm,
} from "react-hook-form";

export default function FormProvider<
  TFieldValues extends FieldValues,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TContext = any,
  TTransformedValues = TFieldValues,
>({
  children,
  ...rest
}: FormProviderPropsHookForm<TFieldValues, TContext, TTransformedValues>) {
  return (
    <FormProviderHookForm {...rest}>
      <form>{children}</form>
    </FormProviderHookForm>
  );
}
