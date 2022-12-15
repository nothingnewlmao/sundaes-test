import {FC, useEffect, useState} from "react";
import axios from "axios";
import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";

export const BASE_URL = 'http://localhost:3030'

export enum EOptionType {
  scoops = 'scoops',
  toppings = 'toppings'
}

const Options: FC<{ optionType: EOptionType }> = ({ optionType}) => {
  const [items, setItems] = useState([])

  useEffect(() => {
    axios.get(`${BASE_URL}/${optionType}`)
      .then(({ data }) => setItems(data))
      .catch((err) => {})
  }, [optionType])

  const ItemComponent = optionType === EOptionType.scoops ? ScoopOption : ToppingOption

  const optionItems = items.map((el) => (
    <ItemComponent
      key={el.name}
      name={el.name}
      imageUrl={el.imageUrl} />
    )
  )

  return (
    <div>
      {optionItems}
    </div>
  )
}

export default Options
