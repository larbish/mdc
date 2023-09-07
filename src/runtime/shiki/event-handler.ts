import type { BuiltinLanguage, BuiltinTheme } from 'shikiji'
import { loadWasm } from 'shikiji'
import { eventHandler, getQuery, lazyEventHandler } from 'h3'
import { useShikiHighlighter } from './highlighter'

export default lazyEventHandler(async () => {
  try {
    // try loading `.wasm` directly, for cloudflare workers
    // @ts-expect-error
    const wasm = await import('shikiji/onig.wasm').then(r => r.default)
    await loadWasm(async obj => WebAssembly.instantiate(wasm, obj))
  }
  catch {
    // otherwise fallback to base64 inlined wasm
    await loadWasm({ data: await import('shikiji/wasm').then(r => r.getWasmInlined()).then(r => r.data) })
  }

  const shiki = useShikiHighlighter({})

  return eventHandler(async (event) => {
    const { code, lang, theme: themeString, highlights: highlightsString } = getQuery(event)
    const theme = JSON.parse(themeString as string)
    const highlights = JSON.parse(highlightsString as string) as number[]

    return await shiki.getHighlightedAST(code as string, lang as BuiltinLanguage, theme as BuiltinTheme, { highlights })
  })
})
