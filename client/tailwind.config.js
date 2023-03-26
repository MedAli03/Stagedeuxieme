/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}",
            'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
],
  theme: {
    extend: {
      backgroundImage: {
        'background': "url('../../public/images/bibliotheque.jpg')",
        'books': "url('../../public/images/books.jpg')",
        'books1': "url('../../public/images/books1.jpg')",
        
      }
    },
  },
  daisyui: {
    themes: ["light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter"],
  },
  plugins: [
    require("daisyui"), 
    require('flowbite/plugin')

],
  
}