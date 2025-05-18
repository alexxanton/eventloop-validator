import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
export const ErrorLogo = (props: SvgProps) => (
  <Svg
    width={159}
    height={159}
    fill="none"
    {...props}
  >
    <Path
      stroke="#900B09"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={22.167}
      d="m99.376 59.626-39.75 39.75m0-39.75 39.75 39.75M52.073 13.251h54.855l38.823 38.823v54.854l-38.823 38.823H52.074L13.25 106.928V52.074L52.074 13.25Z"
    />
  </Svg>
)
