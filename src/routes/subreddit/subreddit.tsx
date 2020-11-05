import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import SubredditInfoBar from '../../components/subredditInfoBar/subredditInfoBar';
import Listing from '../../components/listing/listing';

import { AppDispatch, ReduxStateType } from '../../redux/reduxWrapper';
import { GET_SUBREDDIT_ABOUT } from '../../redux/postStore/postThunks';
import { SET_SIZE_MODE } from '../../redux/sidebar/sidebarReducer';
import { GET_LISTING } from '../../redux/postStore/postThunks';

const SubredditHome: React.FC<RouteComponentProps> = props => {
	const dispatch: AppDispatch = useDispatch();

	const [subredditName, setSubName] = useState(props.location.pathname);
	const subredditPointerArray = useSelector(
		(state: ReduxStateType) => state.post.subredditKeys[subredditName]?.postKeys
	);
	const subredditInfoBar = useSelector(
		(state: ReduxStateType) => state.post.subredditKeys[subredditName]?.sidebar
	);

	useEffect(() => {
		dispatch(SET_SIZE_MODE(true));
		if (!subredditPointerArray) dispatch(GET_LISTING(subredditName));
		if (!subredditInfoBar) dispatch(GET_SUBREDDIT_ABOUT(subredditName));
	}, [subredditName]);

	useEffect(() => setSubName(props.location.pathname), [props.location.pathname]);

	return (
		<>
			{subredditInfoBar ? <SubredditInfoBar infoBar={subredditInfoBar} /> : null}
			{subredditPointerArray ? (
				<Listing postData={subredditPointerArray} />
			) : (
				<div id="contentContainer" className="home" />
			)}
		</>
	);
};

export default SubredditHome;
