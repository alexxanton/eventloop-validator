import * as React from "react"
import Svg, { SvgProps, Rect, Mask } from "react-native-svg"
export const QRLogo = (props: SvgProps) => (
  <Svg
    width={166}
    height={166}
    fill="none"
    {...props}
  >
    <Rect
      width={35.52}
      height={35.52}
      x={18.847}
      y={18.847}
      fill="#B892F2"
      rx={10}
    />
    <Mask id="a" fill="#fff">
      <Rect width={73.214} height={73.214} rx={10} />
    </Mask>
    <Rect
      width={73.214}
      height={73.214}
      stroke="#B892F2"
      strokeWidth={22}
      mask="url(#a)"
      rx={10}
    />
    <Rect
      width={35.52}
      height={35.52}
      x={111.633}
      y={18.847}
      fill="#B892F2"
      rx={10}
    />
    <Mask id="b" fill="#fff">
      <Rect width={73.214} height={73.214} x={92.786} rx={10} />
    </Mask>
    <Rect
      width={73.214}
      height={73.214}
      x={92.786}
      stroke="#B892F2"
      strokeWidth={22}
      mask="url(#b)"
      rx={10}
    />
    <Rect
      width={35.52}
      height={35.52}
      x={18.847}
      y={110.834}
      fill="#B892F2"
      rx={10}
    />
    <Mask id="c" fill="#fff">
      <Rect width={73.214} height={73.214} y={91.987} rx={10} />
    </Mask>
    <Rect
      width={73.214}
      height={73.214}
      y={91.987}
      stroke="#B892F2"
      strokeWidth={22}
      mask="url(#c)"
      rx={10}
    />
  </Svg>
)
