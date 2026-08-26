import adapter from '@sveltejs/adapter-auto'

const config = {
  kit: {
    adapter: adapter(),
    alias: {
      '@shared': '../shared.io/src'
    }
  },
  compilerOptions: {
    runes: true
  }
}

export default config