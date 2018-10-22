import React from 'react'
import EmbedNode from './EmbedNode'

export default function Embed(options) {
  return {
    changes: {
      insertEmbedNode
    },
    helpers: {},
    components: {
      EmbedNode
    },
    plugins: [RenderEmbedNode, { schema }]
  }
}

const schema = {
  blocks: {
    embed: {
      isVoid: true
    }
  }
}

function insertEmbedNode(change, src, target) {
  if (target) {
    change.select(target)
  }

  change.insertBlock({
    type: 'embed',
    data: { src }
  })
}

const RenderEmbedNode = {
  renderNode(props) {
    const { attributes, node, isFocused } = props

    if (node.type === 'embed') {
      const src = node.data.get('src')

      return <EmbedNode src={src} selected={isFocused} {...attributes} />
    }
  }
}
