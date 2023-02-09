import { useLayoutEffect, useRef } from "react";
import { lightBoxAnimation } from "../helpers";
import {
  IFormFields,
  IHandleChange,
  useForm,
  useValidation,
} from "./useForm";

function useLightBox() {
  const containers = useRef<Array<HTMLDivElement>>([]);
  const lightBoxies = useRef<Array<HTMLDivElement>>([]);

  useLayoutEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      containers.current.forEach((container: HTMLDivElement, i) => {
        const lightBox = lightBoxies.current[i];
        lightBoxAnimation(e, container, lightBox)
      });
    }
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);


  return [containers, lightBoxies]
}

export {
  useForm,
  useValidation,
  useLightBox
};

export type {
  IFormFields,
  IHandleChange
};
