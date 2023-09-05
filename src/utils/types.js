import PropTypes from "prop-types";

const productsPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired,
});

const categoryPropTypes = PropTypes.shape({
  idCategory: PropTypes.number.isRequired,
  nameCategory: PropTypes.string.isRequired,
  products: PropTypes.arrayOf(productsPropTypes).isRequired,
});

export const burgerCardPropTypes = {
  ingredient: productsPropTypes.isRequired,
};

export const burgerConstructorPropTypes = {
  ingredients: PropTypes.arrayOf(productsPropTypes).isRequired,
};

export const burgerCategoryPropTypes = {
  ingredients: categoryPropTypes.isRequired,
};

export const burgerIngredientPropTypes = {
  ingredients: PropTypes.shape({
    bun: categoryPropTypes.isRequired,
    sauce: categoryPropTypes.isRequired,
    main: categoryPropTypes.isRequired,
  }).isRequired,
};

export const burgerPricePropTypes = {
  price: PropTypes.number.isRequired,
  fontStyle: PropTypes.string.isRequired,
};
