
import { FormFieldInputType, FormFieldType, InputProps } from "@/types/formfields";
import Input from "../ui/Input";
import { forwardRef, useCallback, useEffect, useState } from "react";
import { IconButton } from "../ui/IconButton";
import { useFormContext } from "react-hook-form";

const visibilityOffFilled_default = `data:image/svg+xml,%3csvg%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M12%2017c-2.76%200-5-2.24-5-5%200-.65.13-1.26.36-1.83L4.44%207.25C2.93%208.51%201.74%2010.14%201.01%2012c1.73%204.39%206%207.5%2011%207.5%201.4%200%202.74-.25%203.98-.7l-2.16-2.16c-.57.23-1.18.36-1.83.36zm10%202.73l-2.74-2.74C20.92%2015.7%2022.22%2013.98%2023%2012c-1.73-4.39-6-7.5-11-7.5-1.55%200-3.03.3-4.38.84L4.27%202%203%203.27%2020.73%2021%2022%2019.73zm-5.53-5.53l-1.55-1.55c.05-.21.08-.43.08-.65%200-1.66-1.34-3-3-3-.22%200-.44.03-.65.08L9.8%207.53C10.47%207.2%2011.21%207%2012%207c2.76%200%205%202.24%205%205%200%20.79-.2%201.53-.53%202.2zm-4.31.78l-3.15-3.15-.02.16c0%201.66%201.34%203%203%203l.17-.01z'%20fill='currentColor'/%3e%3c/svg%3e`
const visibilityOnFilled_default = `data:image/svg+xml,%3csvg%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M12%204.5C7%204.5%202.73%207.61%201%2012c1.73%204.39%206%207.5%2011%207.5s9.27-3.11%2011-7.5c-1.73-4.39-6-7.5-11-7.5zM12%2017c-2.76%200-5-2.24-5-5s2.24-5%205-5%205%202.24%205%205-2.24%205-5%205zm0-8c-1.66%200-3%201.34-3%203s1.34%203%203%203%203-1.34%203-3-1.34-3-3-3z'%20fill='currentColor'/%3e%3c/svg%3e`

const EyeButton = ({ ...params }) => <IconButton className="text-gray-500" {...params} />

const Password = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const [visible, setVisible] = useState(false);
  const hidePassword = useCallback(() => {
    setVisible(false);
  }, []);

  const showPassword = () => {
    setVisible(true);

    document.addEventListener('mouseup', hidePassword);
    document.addEventListener('touchend', hidePassword);
  };

  useEffect(() => {
    return () => {
      document.removeEventListener('mouseup', hidePassword);
      document.removeEventListener('touchend', hidePassword);
    };
  }, [hidePassword]);

  const toggleButton = (
    <EyeButton
      onMouseDown={showPassword}
      onTouchStart={showPassword}
      category="secondary"
      variant="ghost"
      type="button"
      src={
        visible
          ? visibilityOnFilled_default
          : visibilityOffFilled_default
      }
      title={"Reveal password"} //TODO translate
    />
  );

  return (
    <Input
      {...props}
      ref={ref}
      type={visible ? 'text' : 'password'}
      endSlot={toggleButton}
    />
  );
});

export const FormFieldInput = forwardRef<HTMLInputElement, FormFieldInputType>((
  {
    name,
    tabIndex,
    type,
    disabled,
    hasError,
    placeholder,
    autoFocus,
    autoComplete,
    ...rest
  },
  ref
) => {

  const Component = type === 'password' ? Password : Input;

  return (
    <Component
      ref={ref}
      id={name}
      name={name}
      autoFocus={autoFocus}
      autoComplete={autoComplete}
      tabIndex={tabIndex}
      type={type}
      hasError={hasError}
      disabled={disabled}
      placeholder={placeholder ?? ""}
      className="mt-2"
      {...rest}
    />
  );
})

export default function FormField({
  name,
  tabIndex,
  type,
  label,
  disabled,
  placeholder,
  descriptionLeading,
  descriptionTrailing,
  suppressErrors = false,
  autoFocus,
  autoComplete,
  children
}: FormFieldType) {

  const {
    register,
    formState: {
      errors,
    },
  } = useFormContext();


  const error = errors[name]?.message as string | undefined;


  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={name}
          className="font-bold flex justify-between text-sm text-subtitle"
        >
          {label}
        </label>
      )}

      {(descriptionLeading || descriptionTrailing) && (
        <div className="flex justify-between flex-wrap gap-4">
          {descriptionLeading || <div>&nbsp;</div>}
          {descriptionTrailing}
        </div>
      )}

      <FormFieldInput
        tabIndex={tabIndex}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        {...register(name)}
      />

      {(!suppressErrors && error) && (
        <div className="mt-2 text-red">
          {error}
        </div>
      )}

      {children && (
        <div className="mt-2">
          {children}
        </div>
      )}
    </div>
  )
}