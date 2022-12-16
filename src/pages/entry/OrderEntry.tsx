import {FC} from "react";
import Options, {EOptionType} from "./Options";
import {formatCurrency} from "../../utilities";
import {useOrderDetails} from "../../contexts/OrderDetails";

const OrderEntry: FC = () => {
  const { totals } = useOrderDetails()
  const grandTotal = totals[EOptionType.scoops] + totals[EOptionType.toppings]

  return <div>
    <h2>Grand total: {formatCurrency(grandTotal)}</h2>
    <Options optionType={EOptionType.scoops}/>
    <Options optionType={EOptionType.toppings}/>
  </div>
}

export default OrderEntry
