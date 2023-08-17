import { createContext, useState } from "react";
import { AsteroidType } from "../misc/types";

type StateType= {
  state: AsteroidType[];
  cartHandler: Function;
  addToState: Function;
  removeFromState: Function;
}

type Props = {
  children: JSX.Element,
};

const StateContext = createContext<StateType>({state: [], cartHandler: () => {}, removeFromState: () => {}, addToState: () => {}});

const StateProvider = ({ children }: Props) => {
  const [state, setState] = useState<AsteroidType []>([]);
  const cartHandler = (id: string) => {
    const newState = state.map((item) => {
      if (item.id === id) {
        item.inCart = !item.inCart;
        return item;
      }
      return item;
    });
    setState(newState);
  };
  const addToState = (value: AsteroidType[]) => {
    setState([...state, ...value]);
  };
  const removeFromState = () => {
    setState(state.filter((item) => !item.inCart));
  }
  return (
    <StateContext.Provider value={{state, cartHandler, addToState, removeFromState}}>
      {children}
    </StateContext.Provider>
  );
};

export { StateContext, StateProvider };