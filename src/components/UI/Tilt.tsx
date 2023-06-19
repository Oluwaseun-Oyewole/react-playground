import React, { useEffect, useRef } from "react";
import VanillaTilt from "vanilla-tilt";

export const Tilt = (props: any) => {
  const { options, ...rest } = props;
  const tilt = useRef<any>(null);

  useEffect(() => {
    VanillaTilt.init(tilt.current, options);
  }, [options]);

  return <div ref={tilt} {...rest} />;
};
