import React from 'react';
import getProfileURL from '../../utils/imgQuerySplit';

import './subredditInfoBar.scss';

const subredditInfoBar = ({ infoBar }: { infoBar: AboutApiResponse }) => {
	console.log(infoBar.data.description_html);
	return (
		<div id="subredditInfoBar">
			<div id="subredditHeader">
				<img id="subredditBanner" src={getProfileURL(infoBar.data.banner_background_image)} />
				<img id="subredditIcon" src={getProfileURL(infoBar.data.community_icon)} />
				<h1>{infoBar.data.url}</h1>
				<p>{infoBar.data.subscribers} Subscribers</p>
			</div>
			<div
				dangerouslySetInnerHTML={{
					__html: (
						new DOMParser().parseFromString(infoBar.data.description_html, 'text/html').documentElement
							?.textContent || ''
					).replace('href="/', 'href="#/')
				}}
			/>
		</div>
	);
};

export default subredditInfoBar;
