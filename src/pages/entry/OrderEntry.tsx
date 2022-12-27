import React, {FC} from "react";
import Options, {EOptionType} from "./Options";
import {formatCurrency} from "../../utilities";
import {useOrderDetails} from "../../contexts/OrderDetails";
import {Button} from "react-bootstrap";
import {EStatuses} from "../../contexts/AppState";
import {ICurrentBlock} from "../../types";

const OrderEntry: FC<ICurrentBlock> = ({ changePhase }) => {
  // @ts-ignore
  const { totals } = useOrderDetails()
  const grandTotal = totals[EOptionType.scoops] + totals[EOptionType.toppings]


  return (
    <>
      <h1>DesIgn SunDaes</h1>
      <h2>Grand total: {formatCurrency(grandTotal)}</h2>
      <Options optionType={EOptionType.scoops}/>
      <Options optionType={EOptionType.toppings}/>
      <Button onClick={() => changePhase(EStatuses.review)}>Create order</Button>
    </>
  )
}

export default OrderEntry
