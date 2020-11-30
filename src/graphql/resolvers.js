import { gql } from 'apollo-boost';

import { addItemToCart, getCartItemCount, getCartTotal } from './car.utils';

export const typeDefs = gql`
	extend type Item {
		quantity: Int
	}

	# extends it from the back end
	extend type Mutation {
		ToggleCartHidden: Boolean!
		AddItemToCart(item: Item!): [Item]!
	}
`;

const GET_CART_HIDDEN = gql`
	{
		cartHidden @client
	}
`;

const GET_ITEM_COUNT = gql`
	{
		itemCount @client
	}
`;

const GET_CART_ITEMS = gql`
	{
		cartItems @client
	}
`;

const GET_CART_TOTAL = gql`
	{
		cartTotal @client
	}
`;

export const resolvers = {
	Mutation: {
		toggleCartHidden: (_root, _args, { cache }) => {
			const { cartHidden } = cache.readQuery({
				query: GET_CART_HIDDEN,
			});

			cache.writeQuery({
				query: GET_CART_HIDDEN,
				// update
				data: { cartHidden: !cartHidden },
			});

			return !cartHidden;
		},

		addItemToCart: (_root, { item }, { cache }) => {
			const { cartItems } = cache.readQuery({
				query: GET_CART_ITEMS,
			});

			const newCartItems = addItemToCart(cartItems, item);

			// update related queries, total, itemCount and the cart itself
			updateRelatedQueries(cache, newCartItems);

			return newCartItems;
		},
	},
};

// main helper method to update	related cart items
const updateRelatedQueries = (cache, newCartItems) => {
	updateCartItems(cache, newCartItems);
	updateCartTotal(cache, newCartItems);
	updateItemCount(cache, newCartItems);
};

// helper functions to update queries
// updates cart total
const updateCartTotal = (cache, newCartItems) => {
	console.log('update cartTotal');
	cache.writeQuery({
		query: GET_CART_TOTAL,
		data: {
			cartTotal: getCartTotal(newCartItems),
		},
	});
};

// updates itemCount
const updateItemCount = (cache, newCartItems) => {
	cache.writeQuery({
		query: GET_ITEM_COUNT,
		data: { itemCount: getCartItemCount(newCartItems) },
	});
};

// updates the cart
const updateCartItems = (cache, newCartItems) => {
	cache.writeQuery({
		query: GET_CART_ITEMS,
		data: { cartItems: newCartItems },
	});
};
