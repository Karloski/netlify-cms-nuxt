export function createExcerpt ({ text, length = 150 }) {
  return text
    .split('', length)
    .concat(['...'])
    .join('')
}

export async function getContent ({ context, path }) {
  const content = []

  // Get slugs
  for (let index = 0; index < context.keys().length; index++) {
    const slug = await context.keys()[index].replace(/^.\/|.json$/g, '')

    // FIXME: Nuxt cannot resolve links this way.
    const entry = await require(`@/${path}/${slug}.json`)

    // Add the slug to the post object
    Object.assign(entry, { slug })

    content.push({
      slug,
      ...entry
    })
  }

  return content
}
