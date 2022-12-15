import {FC} from "react";
import Options, {EOptionType} from "./Options";

const OrderEntry: FC = () => (
  <div>
    <Options optionType={EOptionType.scoops} />
    <Options optionType={EOptionType.toppings} />
  </div>
)

export default OrderEntry
