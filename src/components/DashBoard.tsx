import * as React from 'react';
import { useParams } from '@reach/router';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { GET_LISTING } from '@redux/Listing/ListingThunks';
import { AppDispatch, ReduxStateType } from '@redux/store';
import Listing from './Listing';
import PostPreview from './PostPreview';
import Sidebar from './Sidebar';
import Layout from './Layout';
import Login from './Login';
import { PageProps } from 'gatsby';

export const Main = styled.div`
	max-height: calc(100vh - 2 * (${(props) => props.theme.base.paddingSecondary}px));
	background-color: ${(props) => props.theme.colors.tertiaryBackground};
	border-radius: ${(props) => props.theme.base.borderRadiusSecondary}px;
	padding-bottom: ${(props) => props.theme.base.paddingPrimary}px;
	padding-top: ${(props) => props.theme.base.paddingPrimary}px;
	margin: ${(props) => props.theme.base.paddingSecondary}px;
	position: relative;
	overflow: hidden;
	max-width: 100%;
	margin-right: 0;
	flex-shrink: 1;
	flex-grow: 2;
	width: 50%;
	flex: 1;
`;

interface Params extends PageProps {
	params: {
		type?: 'r' | 'm' | 'u' | '';
		name?: string;
		id?: string;
	};
}

const Dashboard: React.FC<Params> = ({ params: { type = '', name = '', id = '' } }) => {
	const dispatch = useDispatch<AppDispatch>();
	const isLoggedIn = useSelector((state: ReduxStateType) => state.settings.isLoggedIn);
	const routeMap = {
		u: ['user', name, 'submitted'],
		m: ['me', 'm', name],
		r: ['r', name],
		'': []
	};

	const [endpointName, setEndPointName] = React.useState('');
	const listingPointerArray =
		useSelector<ReduxStateType, string[] | undefined>((state) => state.listing.listingKey[endpointName]?.postKeys) ?? [];

	const listingAfterId = useSelector<ReduxStateType, string | undefined>(
		(state) => state.listing.listingKey[endpointName]?.afterId
	);

	React.useEffect(() => {
		setEndPointName('/' + routeMap[type].join('/'));
	}, [type, name]);

	React.useEffect(() => {
		if (endpointName) dispatch(GET_LISTING({ listingEndpointName: endpointName }));
	}, [endpointName]);

	return (
		<Layout
			title="Hydrova | Reddit Client"
			description="Hydrova is a react based reddit client that offers a different way of browsing reddit content"
		>
			{isLoggedIn ? (
				<>
					<Sidebar />
					<Main>
						<Listing
							idKeys={listingPointerArray}
							fetchMore={(_) => {
								dispatch(
									GET_LISTING({
										listingEndpointName: endpointName,
										listingQueryParams: !!listingAfterId ? { after: listingAfterId } : undefined
									})
								);
							}}
						/>
					</Main>
					<Main>{listingPointerArray && <PostPreview postKey={id ?? listingPointerArray[0]} />}</Main>
				</>
			) : (
				<Login />
			)}
		</Layout>
	);
};

export default Dashboard;
