import type { SVGProps } from "react";

export function ImpactRoute(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={"1440"}
      height={"360"}
      viewBox={"0 0 1440 360"}
      fill={"none"}
      {...props}
    >
      <path
        d={"M-40 250C180 250 186 96 408 96s220 168 444 168 228-154 628-154"}
        stroke={"#789987"}
        strokeWidth={"2"}
        opacity={".48"}
      />
      <path
        d={"M-40 286C180 286 198 142 408 142s220 166 444 166 234-148 628-148"}
        stroke={"#c9aa70"}
        strokeWidth={"1.5"}
        strokeDasharray={"8 12"}
        opacity={".55"}
      />
      <g fill={"#c9aa70"}>
        <circle cx={"408"} cy={"96"} r={"6"} />
        <circle cx={"852"} cy={"264"} r={"6"} />
        <circle cx={"1212"} cy={"152"} r={"6"} />
      </g>
    </svg>
  );
}
