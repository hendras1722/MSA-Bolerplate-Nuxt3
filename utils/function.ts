import { ResetState } from "@/module";

export const FunctionResetState = (value: ResetState) => {
  let i: keyof ResetState;
  for (i in value) {
    value[i] = "";
  }
};
