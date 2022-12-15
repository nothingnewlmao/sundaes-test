import {FC} from "react";
import {BASE_URL} from "./Options";

const ToppingOption: FC<IToppingOption> = ({ name, imageUrl }) => {
  return (
    <div>
      <img src={`${BASE_URL}${imageUrl}`} alt={`${name} topping`}/>
    </div>
  )
}

interface IToppingOption {
  name: string,
  imageUrl: string,
}

export default ToppingOption
