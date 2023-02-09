import { Stack } from "@mui/material";
// components
import { Layout } from "./Layout";
import { BuyBox } from "./BuyBox";
// packages and types
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { IAppDispatch } from "../store";
import { fetchArtists } from "../store/data/data.reducer";
import { Wizard } from "./Wizard";
import { Receipt } from "./Receipt";
import { useForm, useValidation } from "../utils/hooks";
import useAccessToken from "../utils/hooks/useAccessToken";

// form State
export interface IInitialFormState {
  name: string;
  mobile: string;
  email: string;
}

const initailState = {
  name: "",
  mobile: "",
  email: "",
} as IInitialFormState;

const validationSchema = {
  name: {
    required: [true, "Name field is required"],
    regex: [/^[a-zA-Z\s]+$/, "Name should include letters only"],
  },
  mobile: {
    required: [true, "Mobile field is required"],
    regex: [/^01[0125][0-9]{8}$/, "Invalid mobile number"],
  },
  email: {
    required: [true, "Email field is required"],
    regex: [/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email"],
  },
} as any;

function App() {
  const dispatch: IAppDispatch = useDispatch();
  const [showReciept, setShow] = useState(false);
  const [fields, handleChange] = useForm(initailState);
  const [errors, checkValidation] = useValidation(
    initailState,
    validationSchema
  );

  const [token, loading] = useAccessToken();

  useEffect(() => {
    dispatch(fetchArtists());
  
  }, [dispatch]);

  return (
    <div className="App">
      <Layout>
        <Stack direction="row" spacing={3} justifyContent="center">
          <Wizard
            fields={fields}
            errors={errors}
            handleChange={handleChange}
            checkValidation={checkValidation}
          />
          <BuyBox setShow={setShow} handleChange={handleChange} />
        </Stack>
      </Layout>

      {showReciept && <Receipt close={setShow} />}
    </div>
  );
}

export default App;
