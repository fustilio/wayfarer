import * as React from "react";
import { Platform, Text, View } from "react-native";
import * as SliderPrimitive from "@rn-primitives/slider";

import { cn } from "~/lib/utils";

// export function Slider() {
//   const [value, setValue] = React.useState(50);

//   return (
//     <View className="h-20 w-48 bg-yellow-200">
//       <Text>{Math.round(value)}</Text>
//       <Root
//         value={value}
//         onValueChange={(vals) => {
//           const nextValue = vals[0];
//           if (typeof nextValue !== "number") return;
//           setValue(nextValue);
//         }}
//       >
//         <Track>
//           <Range style={{ width: `${value}%` }} />
//           <Thumb style={{ left: `${value}%` }} />
//         </Track>
//       </Root>

//       {Platform.OS !== "web" && (
//         <Text>You will have to implement the gesture handling</Text>
//       )}
//     </View>
//   );
// }

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className,
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="absolute block h-4 w-4 -translate-y-1 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
