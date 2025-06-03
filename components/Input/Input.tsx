import { InputFrame as TamaguiInputFrame, styled } from "tamagui";

export const Input = styled(TamaguiInputFrame, {
  name: "Input",
  w: "100%",
  h: "$9",
  rounded: "$md",
  px: "$3",
  py: "$2",
  boxShadow: "$shadow.sm",
  selectionColor: "$color",
});
