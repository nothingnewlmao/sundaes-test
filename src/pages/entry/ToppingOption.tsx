import React, {FC} from "react";
import {BASE_URL, EOptionType} from "./Options";
import {useOrderDetails} from "../../contexts/OrderDetails";

const ToppingOption: FC<IToppingOption> = ({ name, imageUrl }) => {

  // @ts-ignore
  const { updateItemCount } = useOrderDetails()

  const handleCheck = (e) =>  updateItemCount(
    name,
    +(e.target.checked),
    EOptionType.toppings
  )

  return (
    <div>
      <img src={`${BASE_URL}${imageUrl}`} alt={`${name} topping`}/>
      <label htmlFor={`${name}-chkbx`}>
        <input
          id={`${name}-chkbx`}
          type="checkbox"
          title={name}
          onChange={handleCheck}
        />
        {name}
      </label>
    </div>
  )
}

interface IToppingOption {
  name: string,
  imageUrl: string,
}

export default ToppingOption
