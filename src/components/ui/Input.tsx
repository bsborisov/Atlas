"use client";

import { cn } from '@/lib/utils';
import { InputHolderProps, InputProps } from '@/types/ui';
import { forwardRef, useState } from 'react';

const InputHolder = ({
  children,
  isMultiSelect,
  hasError = false,
  usePointer,
  isDisabled,
  isFocused,
  isReadonly,
  className,
  style,
}: InputHolderProps) => {
  return (
    <div
      className={cn(
        // Layout
        "flex flex-row items-center gap-2 bg-input-background",

        // Shadow
        "shadow-[inset_0_0_0_1px_#F1F1F114]",
        "shadow-[inset_0_1px_0_#F1F1F10A]",
        "shadow-[inset_0_-1px_0_#0606067A]",

        // Size
        isMultiSelect ? "h-fit" : "h-10",

        // Width / spacing
        "w-full p-2 box-border",

        // Border
        "border border-solid rounded-md",

        // Background
        hasError ? "border-red-500" : "border-input-border",

        // Cursor
        usePointer && "cursor-pointer",
        isDisabled && "cursor-not-allowed",
        isFocused && "bg-black",
        // Focus
        !isReadonly &&
        "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-blue-500",
        //Additional classes
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
};



const StyledInput = forwardRef<HTMLInputElement, InputProps>((
  {
    isMultiSelect,
    disableEllipsis,
    usePointer,
    ...rest
  },
  ref
) => {
  return (
    <input
      ref={ref}
      className={cn(
        `
      flex-auto h-full min-w-0 w-full m-0 border-0 p-0 rounded-[1px] outline-none box-border

      text-white bg-transparent placeholder:text-white/60 
      
      disabled:cursor-not-allowed 
      disabled:text-white/40

      not-first:ps-0
      not-last:pe-0

      text-ellipsis
      overflow-hidden
      whitespace-nowrap

      font-montserrat
      tracking-[0.0025em]
      text-base
      font-normal
      leading-6
      `,

        isMultiSelect && `
        min-w-[30px]
        flex-1
      `,

        disableEllipsis && `
        text-clip
      `,

        usePointer && `
        cursor-pointer
      `,

        `
      [dir="rtl"]&
      {
        height: fit-content;
      }
      `
      )}
      {...rest}
    />
  );
})

StyledInput.displayName = "StyledInput"

export const Input = forwardRef<HTMLInputElement, InputProps>((
  {
    value,
    placeholder,
    style,
    className,
    id,
    autoFocus,
    onFocus,
    onBlur,
    disabled,
    readOnly,
    tabIndex,
    type,
    onChange,
    startSlot,
    endSlot,
    preValueSlot,
    hasError,
    usePointer,
    name,
    disableEllipsis,
    ...rest
  },
  ref
) => {


  const [isFocused, setIsFocused] = useState(autoFocus ?? false);
  const isMultiSelect = !!preValueSlot

  return (
    <InputHolder
      className={className}
      style={style}
      isFocused={isFocused && !readOnly}
      isDisabled={disabled}
      isReadonly={readOnly}
      hasError={hasError}
      usePointer={usePointer}
      isMultiSelect={isMultiSelect}
    >
      {startSlot}

      <div className=' flex flex-1 flex-wrap grow gap-x-1 gap-y-2 items-center min-w-0'>
        {preValueSlot}

        <StyledInput
          ref={ref}
          id={id}
          value={value}
          placeholder={placeholder}
          tabIndex={tabIndex}
          type={type}
          disabled={disabled}
          readOnly={readOnly}
          name={name}
          disableEllipsis={disableEllipsis}
          usePointer={usePointer}
          onChange={onChange}
          autoFocus={autoFocus}
          {...rest}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
        />
      </div>

      {endSlot}
    </InputHolder>
  );
});

Input.displayName = "Input";

export default Input;