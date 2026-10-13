export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { accent: '#F64302', story: '#f0eded', products: '#E8E5E9', card: '#EBE8EB' },
      fontFamily: {
        bubbledot: ['BubbledotICG-FinePos', 'monospace'],
        jetbrains: ['JetBrains Mono', 'monospace'],
      },
      keyframes: {
        'fade-up': { from: { opacity: '0', transform: 'translateY(30px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        'scale-in': { from: { opacity: '0', transform: 'scale(.95)' }, to: { opacity: '1', transform: 'scale(1)' } },
      },
      animation: {
        'fade-up': 'fade-up .8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fade-in .8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scale-in .8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
    },
  },
  plugins: [],
}
