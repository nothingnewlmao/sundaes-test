import {FC} from "react";
import { BASE_URL} from "./Options";

const ScoopOption: FC<IScoopOption> = ({ name, imageUrl }) => {
  return (
    <div>
      <img src={`${BASE_URL}${imageUrl}`} alt={`${name} scoop`}/>
    </div>
  )
}

export interface IScoopOption {
  name: string,
  imageUrl: string,
}

export default ScoopOption
