declare module "*.svg" {
  import type React from "react";
  import type { SvgProps } from "react-native-svg";
  const content: FC<SvgProps>;
  export default content;
}
