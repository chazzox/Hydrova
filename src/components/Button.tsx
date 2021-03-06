import styled, { css } from 'styled-components';

export const ButtonStyles = css`
	border-radius: ${(props) => props.theme.base.borderRadiusPrimary}px;
	padding: ${(props) => props.theme.base.paddingSecondary}px 16px;
	color: ${(props) => props.theme.colors.primaryText};

	width: 100%;
	margin: 5px auto;
	text-transform: capitalize;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	background: none;
	border: none;
	outline: none;
	font-size: 11pt;
	line-height: 20px;
	text-align: left;

	&:hover {
		background-color: ${(props) => props.theme.colors.secondaryAccentBackground};
	}

	& > svg {
		width: 20px;
		float: left;
		margin-right: ${(props) => props.theme.base.paddingSecondary}px;
	}

	& > svg * {
		fill: none;
		stroke-width: 42px;
		stroke: ${(props) => props.theme.colors.primaryText};
		stroke-linecap: round;
		stroke-linejoin: round;
	}
`;

export const Button = styled.button`
	${ButtonStyles}
`;
