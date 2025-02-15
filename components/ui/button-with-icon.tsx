"use client";

import type { View } from "react-native";
import React from "react";

import type { ButtonProps } from "~/components/ui/button";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { cn } from "~/lib/utils";

/**
 * ButtonWithIcon component
 * 
 * A reusable button component that displays an icon with optional label and consistent styling
 * 
 * @example
 * ```tsx
 * <ButtonWithIcon
 *   icon={<Icon />}
 *   label="Click me"
 *   onClick={() => {}}
 *   disabled={false}
 *   className="custom-class"
 * />
 * ```
 */
type ButtonWithIconProps = Omit<ButtonProps, "children"> & {
  icon: React.ReactNode;
  label?: string;
  disabledHoverClass?: string;
};

function _ButtonWithIcon(
  { icon, label, className, disabledHoverClass, disabled, ...rest }: ButtonWithIconProps,
  ref: React.Ref<View>,
) {
  return (
    <Button 
      ref={ref} 
      disabled={disabled}
      className={cn(
        "flex flex-row items-center gap-2",
        !label && "h-10 w-10",
        disabled && disabledHoverClass,
        className
      )} 
      {...rest}
    >
      <Text>{icon}</Text>
      {label && <Text>{label}</Text>}
    </Button>
  );
}

export const ButtonWithIcon = React.forwardRef(_ButtonWithIcon);
