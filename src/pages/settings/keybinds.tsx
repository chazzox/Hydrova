import { Main } from '@components/DashBoard';
import Layout from '@components/Layout';
import PillSelector from '@components/PillSelector';
import SettingsContainer from '@components/SettingsContainer';
import Sidebar from '@components/Sidebar';
import * as React from 'react';

const Keybinds = () => {
	return (
		<Layout
			title="Hydrova | Keybinds"
			description="Hydrova is a react based reddit client that offers a different way of browsing reddit content"
		>
			<Sidebar />
			<Main>
				<PillSelector />
				<SettingsContainer>
					<h1>Keybinds</h1>
					<p>TBD</p>
				</SettingsContainer>
			</Main>
		</Layout>
	);
};

export default Keybinds;
