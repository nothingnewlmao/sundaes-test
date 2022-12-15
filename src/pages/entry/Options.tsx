import {FC, useEffect, useState} from "react";
import axios from "axios";
import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";
import {Alert} from "react-bootstrap";

export const BASE_URL = 'http://localhost:3030'
export const ERR_TEXT = 'an unexpected error occurred'

export enum EOptionType {
  scoops = 'scoops',
  toppings = 'toppings'
}

const Options: FC<{ optionType: EOptionType }> = ({ optionType}) => {
  const [items, setItems] = useState([])
  const [error, setError] = useState(false)

  useEffect(() => {
    axios.get(`${BASE_URL}/${optionType}`)
      .then(({ data }) => setItems(data))
      .catch((err) => setError(true))
  }, [optionType])

  if (error) {
    return <Alert variant="danger">{ERR_TEXT}</Alert>
  }

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
