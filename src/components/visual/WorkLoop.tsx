import type { SVGProps } from "react";

export function WorkLoop(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={"1440"}
      height={"360"}
      viewBox={"0 0 1440 360"}
      fill={"none"}
      {...props}
    >
      <path
        d={
          "M92 180h220c64 0 64-92 128-92h240c64 0 64 184 128 184h240c64 0 64-92 128-92h192"
        }
        stroke={"#789987"}
        strokeWidth={"2"}
        opacity={".5"}
      />
      <path
        d={
          "M92 216h220c64 0 64-92 128-92h240c64 0 64 184 128 184h240c64 0 64-92 128-92h192"
        }
        stroke={"#c9aa70"}
        strokeWidth={"1.5"}
        strokeDasharray={"7 11"}
        opacity={".52"}
      />
      <g fill={"#c9aa70"}>
        <circle cx={"312"} cy={"180"} r={"6"} />
        <circle cx={"680"} cy={"88"} r={"6"} />
        <circle cx={"1048"} cy={"272"} r={"6"} />
        <circle cx={"1348"} cy={"180"} r={"6"} />
      </g>
    </svg>
  );
}
