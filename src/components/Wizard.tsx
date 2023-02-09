import { Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { userDataChanged } from "../store/cart/cart.reducer";
import { Albums } from "./albums/Albums";
import { CustomAlert } from "./Alert";
import { Artists } from "./artists/Artists";
import { Form } from "./Form";
import { StepTracker } from "./StepTracker";
import { SetOfTeacks } from "./tracks/SetOfTeacks";
import { WizardButton } from "./WizardButton";
import { WizardConent } from "./WizardConent";
import { IFormFields, IHandleChange } from "../utils/hooks/";
// import { IInitialFormState } from "./App";
import { ICheckValidition } from "../utils/hooks/useForm";
import {
  nextStep,
  prevStep,
  selectCurrentStep,
} from "../store/ui/ui.reducer";
import { useSelector } from "react-redux";

interface IWizardProps {
  // step: number;
  // handleNextStep: () => void;
  // handlePrevStep: () => void;
  // errorMessage: string;
  // stepsNames: Array<string>;
  fields: IFormFields;
  errors: IFormFields;
  handleChange: IHandleChange;
  checkValidation: ICheckValidition;
}

export const Wizard: React.FC<IWizardProps> = (props) => {
  const {
    // step,
    // handleNextStep,
    // handlePrevStep,
    // errorMessage,
    // stepsNames,
    fields,
    handleChange,
    errors,
    checkValidation,
  } = props;
  const dispatch = useDispatch();

  const handleUserState = (e: React.FocusEvent<HTMLInputElement>) => {
    const field = e.target.name;
    const value = e.target.value;

    const isValid = checkValidation(field, value);
    if (!isValid) {
      dispatch(userDataChanged({ field, value: "" }));
      return;
    }

    dispatch(userDataChanged({ field, value }));
  };

  return (
    <>
      {/* {errorMessage && <CustomAlert>{errorMessage}</CustomAlert>} */}
      <Stack spacing={3} sx={{ overflowX: "hidden", flex: "1 1 77%" }}>
        <StepTracker /> {/*stepsName={step}*/}
        <WizardConent>
          <CurrentStep
            // step={step}
            fields={fields}
            handleUserState={handleUserState}
            handleChange={handleChange}
            errors={errors}
          />
        </WizardConent>
        <Stack direction="row">
          <Control />
        </Stack>
      </Stack>
    </>
  );
};

export interface CurrentStepProps {
  fields: IFormFields;
  errors: IFormFields;
  handleUserState: (e: React.FocusEvent<HTMLInputElement>) => void;
  handleChange: IHandleChange;
}

const CurrentStep: React.FC<CurrentStepProps> = (props) => {
  const currentStep = useSelector(selectCurrentStep);

  switch (currentStep) {
    case 1:
      return <Artists />;

    case 2:
      return <Albums />;

    case 3:
      return <SetOfTeacks />;

    default:
      return <Form {...props} />;
  }
};

const Control = () => {
  const currentStep = useSelector(selectCurrentStep);
  const dispatch = useDispatch();

  const handleNextStep = () => {
    dispatch(nextStep());
  };

  const handlePrevStep = () => {
    dispatch(prevStep());
  };

  return (
    <>
      {currentStep <= 1 ? (
        <></>
      ) : (
        <WizardButton buttonProps={{ onClick: handlePrevStep }}>
          Back
        </WizardButton>
      )}
      {currentStep >= 4 ? (
        <></>
      ) : (
        <WizardButton
          buttonProps={{
            onClick: handleNextStep,
            sx: { marginLeft: "auto" },
          }}
        >
          Next
        </WizardButton>
      )}
    </>
  );
};
