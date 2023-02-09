import { Button } from "@mui/material";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import styles from "@styles/BuyBox.module.scss";
import vector from "@assets/svgs/vector.svg"
import { Wrapper } from "./Wrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCount, selectTotal, selectUserData } from "../store/cart/cart.reducer";
import { placeOrder } from "../store/orders/order.reducer";
import { IAppDispatch } from "../store";
import { IHandleChange } from "../utils/hooks";
import { goToStep } from "../store/ui/ui.reducer";

interface IBuyBox {
    setShow: React.Dispatch<React.SetStateAction<boolean>>,
    // setStep: React.Dispatch<React.SetStateAction<number>>,
    handleChange: IHandleChange
}

const { button, total, _vector, buy_box_wrapper, selected_songs, active, icon, active_button } = styles;

export const BuyBox:React.FC<IBuyBox> = ({setShow, handleChange}) => {
    const [openBox, setOpenBox] = useState(false);
    const isPanelActive = openBox ? buy_box_wrapper : `${buy_box_wrapper} ${active}`;
    const totalPrice = useSelector(selectTotal)
    const count = useSelector(selectCount)
    const userData = useSelector(selectUserData);
    const isDataCollected = Object.values(userData).findIndex((value:string) => value === "") < 0
    const dispatch: IAppDispatch = useDispatch()

    const handlePurchase = async () => {
        const payload = {...userData, count, total: totalPrice}
        await new Promise((resolve) => resolve(dispatch(placeOrder(payload))) );
        setShow(true)
        // setStep(1)
        dispatch(goToStep(1))
        handleChange("reset")
    }

    return (
        <div className={isPanelActive} >
            <Wrapper>
                <p className={selected_songs}>
                    <span>{count}</span> Songs has been selected
                </p>

                <p className={total}>
                    Total price: <span>${totalPrice.toFixed(2)}</span>
                </p>

                <button className={_vector} onClick = {() => setOpenBox(prev => !prev)}>
                    <div className={icon}>
                        <ExpandLessIcon />
                    </div>
                    <img src={vector} alt="vecotr" />
                </button>
            </Wrapper>

            <div style={{marginTop: "24px"}}>
                <Button 
                onClick={handlePurchase}
                disabled = {count && isDataCollected ? false : true} sx= {{
                    fontSize: "1.25rem",
                    width: "100%"
                }} className={count && isDataCollected ? `${button} ${active_button}` : button}>
                    Buy Now
                </Button>
            </div>
        </div>    
    )
}
