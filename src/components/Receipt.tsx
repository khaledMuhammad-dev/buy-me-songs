import React from "react";
import { OverLay } from "./OverLay";
import styles from "@styles/Receipt.module.scss";
import { Button, Typography } from "@mui/material";
import receiptCover from "@assets/images/receipt-cover.png";
import { useSelector } from "react-redux";
import { selectLastOrder } from "../store/orders/order.reducer";

const { card, receipt_cover, user_info, price, container } = styles;
export const Receipt = (props: {
  close: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { close } = props;

  const { name, email, mobile, total, count: tracksCount } = useSelector(selectLastOrder);

  return (
    <>
      {name && <div className={card}>
        <div className={receipt_cover}>
          <img src={receiptCover} alt="music-cover" />
        </div>

        <div className={container}>
          <Typography variant="h4">Put the volum Up ! 🤩</Typography>

          <div className={user_info}>
            <p>
              <span>Name:</span> {name}
            </p>
            <p>
              <span>E-mail:</span> {email}
            </p>
            <p>
              <span>Mobile:</span> {mobile}
            </p>
          </div>

          <div className={price}>
            <Typography component="p" variant="h5">
              count Of Tracks <span>{tracksCount}</span>
            </Typography>

            <Typography component="p" variant="h4">
              Total Price: <span>${total}</span>
            </Typography>
          </div>

          <Button className="Button confirm" onClick={() => close(false)}>
            Confirm
          </Button>
        </div>
      </div>}
      <OverLay />
    </>
  );
};
