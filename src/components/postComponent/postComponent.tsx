import React from 'react';
import { Link } from 'react-router-dom';
import timeSinceCurrent, { formatTimeSince } from '../../utils/timeSinceCurrent';

import './postComponent.scss';

interface propTypes {
	postContent: post;
	isExpanded?: boolean | null;
	additionalClassNames?: string[];
}

const postComponent = ({ postContent, isExpanded, additionalClassNames }: propTypes) => {
	const RenderPostType = () => {
		if (postContent.is_self && postContent.selftext_html) {
			return (
				<span
					dangerouslySetInnerHTML={{
						__html:
							new DOMParser().parseFromString(postContent.selftext_html, 'text/html')
								.documentElement.textContent || ''
					}}
				/>
			);
		} else if (postContent.is_video && postContent.media) {
			return (
				<video controls={true}>
					<source src={postContent.media.reddit_video.dash_url} type="video/mp4" />
					<source
						src={postContent.media.reddit_video.dash_url.replace(
							/(DASH_)(\d*)(.mp4)/,
							(_ign1, part1: string, _ign2, part3: string, _ign3) => part1 + 'AUDIO' + part3
						)}
						type="audio/mp4"
					/>
				</video>
			);
		} else if (postContent.post_hint === 'link')
			return (
				<>link</>
				// <div
				// 	className="postContent"
				// 	dangerouslySetInnerHTML={{
				// 		__html:
				// 			new DOMParser().parseFromString(postContent.media., 'text/html')
				// 				.documentElement.textContent || ''
				// 	}}
				// />
			);
		else if (postContent.post_hint === 'image') return <img src={postContent.url} alt="" />;
		else {
			return <>this is a reddit collage</>;
		}
	};

	return (
		<div
			id={postContent.id}
			className={[additionalClassNames, ...[isExpanded ? 'expanded' : []]]?.join(' ')}
		>
			<div className="postInfo">
				<h1 className="postTitle">{postContent.title}</h1>
				<div>
					<p>
						<Link to={'/' + postContent.subreddit_name_prefixed}>
							{postContent.subreddit_name_prefixed}
						</Link>{' '}
						| u/
						{postContent.author} | posted{' '}
						{formatTimeSince(timeSinceCurrent(postContent.created_utc))}
					</p>
				</div>
			</div>
			<div className="postContent">
				<RenderPostType />
			</div>
		</div>
	);
};

export default postComponent;
