import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import Header from './header.component';

const GET_CART_HIDDEN_AND_USER = gql`
	{
		cartHidden @client
		currentUser @client
	}
`;

const HeaderContainer = () => (
	<Query query={GET_CART_HIDDEN_AND_USER}>
		{({ data: { cartHidden, currentUser } }) => (
			<Header hidden={cartHidden} currentUser={currentUser}></Header>
		)}
	</Query>
);

export default HeaderContainer;
