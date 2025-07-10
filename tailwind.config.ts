
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'sans': ['Nunito Sans', 'sans-serif'],
				'script': ['Dancing Script', 'cursive'],
				'serif': ['Crimson Text', 'serif'],
			},
			colors: {
				// Enhanced brand colors for food website
				primary: {
					DEFAULT: 'hsl(145, 70%, 45%)', // Rich forest green
					foreground: 'hsl(0, 0%, 100%)',
					50: 'hsl(145, 70%, 97%)',
					100: 'hsl(145, 70%, 90%)',
					200: 'hsl(145, 70%, 80%)',
					300: 'hsl(145, 70%, 70%)',
					400: 'hsl(145, 70%, 60%)',
					500: 'hsl(145, 70%, 45%)',
					600: 'hsl(145, 70%, 38%)',
					700: 'hsl(145, 70%, 30%)',
					800: 'hsl(145, 70%, 25%)',
					900: 'hsl(145, 70%, 18%)',
				},
				secondary: {
					DEFAULT: 'hsl(28, 90%, 55%)', // Warm orange
					foreground: 'hsl(0, 0%, 100%)',
					50: 'hsl(28, 90%, 95%)',
					100: 'hsl(28, 90%, 88%)',
					200: 'hsl(28, 90%, 78%)',
					300: 'hsl(28, 90%, 68%)',
					400: 'hsl(28, 90%, 62%)',
					500: 'hsl(28, 90%, 55%)',
					600: 'hsl(28, 90%, 48%)',
					700: 'hsl(28, 90%, 38%)',
					800: 'hsl(28, 90%, 28%)',
					900: 'hsl(28, 90%, 18%)',
				},
				accent: {
					DEFAULT: 'hsl(45, 100%, 92%)', // Warm cream
					foreground: 'hsl(145, 70%, 45%)',
				},
				warm: {
					50: 'hsl(35, 100%, 98%)',
					100: 'hsl(35, 100%, 95%)',
					200: 'hsl(35, 90%, 88%)',
					300: 'hsl(35, 85%, 78%)',
					400: 'hsl(35, 80%, 68%)',
					500: 'hsl(35, 75%, 58%)',
					600: 'hsl(35, 70%, 48%)',
					700: 'hsl(35, 65%, 38%)',
					800: 'hsl(35, 60%, 28%)',
					900: 'hsl(35, 55%, 18%)',
				},
				border: 'hsl(214.3, 31.8%, 91.4%)',
				input: 'hsl(214.3, 31.8%, 91.4%)',
				ring: 'hsl(145, 70%, 45%)',
				background: 'hsl(0, 0%, 100%)',
				foreground: 'hsl(222.2, 84%, 4.9%)',
				card: {
					DEFAULT: 'hsl(0, 0%, 100%)',
					foreground: 'hsl(222.2, 84%, 4.9%)'
				},
				popover: {
					DEFAULT: 'hsl(0, 0%, 100%)',
					foreground: 'hsl(222.2, 84%, 4.9%)'
				},
				muted: {
					DEFAULT: 'hsl(210, 40%, 96.1%)',
					foreground: 'hsl(215.4, 16.3%, 46.9%)'
				},
				destructive: {
					DEFAULT: 'hsl(0, 84.2%, 60.2%)',
					foreground: 'hsl(210, 40%, 98%)'
				},
				sidebar: {
					DEFAULT: 'hsl(0, 0%, 98%)',
					foreground: 'hsl(240, 5.3%, 26.1%)',
					primary: 'hsl(240, 5.9%, 10%)',
					'primary-foreground': 'hsl(0, 0%, 98%)',
					accent: 'hsl(240, 4.8%, 95.9%)',
					'accent-foreground': 'hsl(240, 5.9%, 10%)',
					border: 'hsl(220, 13%, 91%)',
					ring: 'hsl(217.2, 91.2%, 59.8%)'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			boxShadow: {
				'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
				'elegant': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 35px -8px rgba(0, 0, 0, 0.06)',
				'warm': '0 4px 20px -2px rgba(251, 146, 60, 0.15)',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'scale-in': {
					'0%': {
						transform: 'scale(0.9)',
						opacity: '0'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				},
				'slide-up': {
					'0%': {
						transform: 'translateY(30px)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateY(0)',
						opacity: '1'
					}
				},
				'shimmer': {
					'0%': {
						backgroundPosition: '-200% 0'
					},
					'100%': {
						backgroundPosition: '200% 0'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0px)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'scale-in': 'scale-in 0.3s ease-out',
				'slide-up': 'slide-up 0.6s ease-out',
				'shimmer': 'shimmer 2s linear infinite',
				'float': 'float 3s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
