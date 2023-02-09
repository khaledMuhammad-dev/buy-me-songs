import styles from "@styles/StepTracker.module.scss";
import { useSelector } from "react-redux";
import { selectCurrentStep, selectStepsLabels } from "../store/ui/ui.reducer";
import { Wrapper } from "./Wrapper";

export const StepTracker = () => {
  const { step, row, done, step_label, active } = styles;
  const steps = useSelector(selectStepsLabels);
  const currentStep = useSelector(selectCurrentStep);

  return (
    <Wrapper>
      <ul className={row}>
        {steps.map((_step, i) => {
          //  handle the class dynamically
          let clses =
            (currentStep > i + 1 && done) ||
            (currentStep === i + 1 && active) ||
            "";

          return (
            <li key={i} className={step + " " + clses}>
              <span className={step_label}>{_step}</span>
            </li>
          );
        })}
      </ul>
    </Wrapper>
  );
};
