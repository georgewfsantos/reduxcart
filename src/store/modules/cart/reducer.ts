import { Reducer } from "redux";
import produce from "immer";
import { ActionTypes, ICartState } from "./types";

const INITIAL_STATE: ICartState = {
  items: [],
  productsOutOfStock: [],
};

const cart: Reducer<ICartState> = (state = INITIAL_STATE, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionTypes.addProductToCartSuccess: {
        const { product } = action.payload;

        const IndexOfProductInCart = draft.items.findIndex(
          (item) => item.product.id === product.id
        );

        if (IndexOfProductInCart >= 0) {
          draft.items[IndexOfProductInCart].quantity++;
        } else {
          draft.items.push({
            product,
            quantity: 1,
          });
        }

        break;
      }
      case ActionTypes.addProductToCartFailure: {
        draft.productsOutOfStock.push(action.payload.productId);

        break;
      }
      default: {
        return draft;
      }
    }
  });
};

export default cart;
