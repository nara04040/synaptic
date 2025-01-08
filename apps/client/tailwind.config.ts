import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	container: {
  		center: true,
  		padding: {
				DEFAULT: '1rem',
				sm: '2rem',
				lg: '4rem',
				xl: '5rem',
				'2xl': '6rem',
			},
  		screens: {
				sm: '640px',
				md: '768px',
				lg: '1024px',
				xl: '1280px',
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			primary: {
  				'100': '#E3F2FD',
  				'300': '#64B5F6',
  				'500': '#2196F3',
  				'700': '#1976D2',
  				'900': '#0D47A1',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				'100': '#F3E5F5',
  				'300': '#BA68C8',
  				'500': '#9C27B0',
  				'700': '#7B1FA2',
  				'900': '#4A148C',
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			success: '#4CAF50',
  			warning: '#FFC107',
  			error: '#F44336',
  			info: '#2196F3',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			sans: [
  				'Pretendard',
  				'system-ui',
  				'sans-serif'
  			],
  			mono: [
  				'JetBrains Mono',
  				'monospace'
  			]
  		},
  		spacing: {
  			'layout-xs': '1rem',
  			'layout-sm': '1.5rem',
  			'layout-md': '2rem',
  			'layout-lg': '3rem',
  			'layout-xl': '4rem'
  		},
  		borderRadius: {
  			card: '12px',
  			button: '8px',
  			input: '8px',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		boxShadow: {
  			card: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  			dropdown: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
  		},
  		animation: {
  			'fade-in': 'fadeIn 150ms ease',
  			'slide-up': 'slideUp 250ms ease',
  			pulse: 'pulse 2s infinite'
  		},
  		keyframes: {
  			fadeIn: {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			slideUp: {
  				'0%': {
  					transform: 'translateY(10px)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'translateY(0)',
  					opacity: '1'
  				}
  			},
  			pulse: {
  				'0%, 100%': {
  					transform: 'scale(1)'
  				},
  				'50%': {
  					transform: 'scale(1.05)'
  				}
  			}
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

