import { theme, extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const breakpoints = createBreakpoints({
	sm: '425px',
	md: '768px',
	lg: '1080px',
	xl: '1280px',
	'2xl': '1440px',
});

const customTheme = extendTheme({
	fonts: {
		...theme.fonts,
	},
	global: {
		'html, body': {
		  lineHeight: 'tall',
		  color: "white",
		  bg: "black",
		  background: "black"
		},
	  },
	breakpoints,
	colors: {
		...theme.colors
	},
	components: {
		Heading: {
			sizes: {
				'4xl': {
					marginBottom: '1.5rem',
				},
				'2xl': {
					marginBottom: '1.5rem',
				},
				xl: {
					marginBottom: '1.5rem',
				},
				lg: {
					marginBottom: '1.5rem',
				},
				md: {
					marginBottom: '1rem',
				},
				sm: {
					marginBottom: '0.5rem',
				},
				xs: {
					marginBottom: '0.5rem',
				},
			},
		},
		Text: {
			baseStyle: {
				fontSize: 'md',
				color: 'white'
			  },
		}
	},
});

export default customTheme;
