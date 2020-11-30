import React from 'react';
// import { Mutation, Query, graphql } from 'react-apollo';
import { graphql } from 'react-apollo';
import * as compose from 'lodash.flowright';
import { gql } from 'apollo-boost';

import CartIcon from './cart-icon.component';

const TOGGLE_CART_HIDDEN = gql`
	mutation ToggleCartHidden {
		toggleCartHidden @client
	}
`;

const GET_ITEM_COUNT = gql`
	{
		itemCount @client
	}
`;

// const CartIconContainer = () => (
// 	<Query query={GET_ITEM_COUNT}>
// 		{({ data: { itemCount } }) => (
// 			<Mutation mutation={TOGGLE_CART_HIDDEN}>
// 				{(toggleCartHidden) => (
// 					<CartIcon toggleCartHidden={toggleCartHidden} itemCount={itemCount} />
// 				)}
// 			</Mutation>
// 		)}
// 	</Query>
// );

const CartIconContainer = ({ data: { itemCount }, toggleCartHidden }) => (
	<CartIcon toggleCartHidden={toggleCartHidden} itemCount={itemCount} />
);

// pass our CartIconContainer to the return of compose
// that groups all of the queries and mutations that we add to cartIconContainer
// graphql takes mutations and queries and binds them to a component
export default compose(
	graphql(GET_ITEM_COUNT),
	graphql(TOGGLE_CART_HIDDEN, { name: 'toggleCartHidden' })
)(CartIconContainer);

// export default CartIconContainer;
