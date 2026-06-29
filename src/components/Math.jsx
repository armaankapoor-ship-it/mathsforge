import katex from 'katex'

export function MathLine({ children, block = false }) {
  const html = katex.renderToString(String(children), {
    throwOnError: false,
    displayMode: block,
    strict: false,
  })

  return (
    <span
      className={block ? 'math-block' : 'math-inline'}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
