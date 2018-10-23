import React from 'react'
import { isThisSecond } from 'date-fns'

export default function Embed(options) {
  return {
    changes: {
      insertEmbed
    },
    helpers: {},
    components: {},
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

/**
 * Change that inserts an image block displaying the src image
 */
function insertEmbed(change, src, target) {
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
    return props.node.type === 'embed' ? (
      <Input selected={props.isFocused} {...props} />
    ) : null
  }
}

class Input extends React.Component {
  render() {
    const { selected, children, ...attributes } = this.props

    return (
      <pre
        className={`code-block ${selected ? 'selected' : ''}`}
        {...attributes}
      >
        <code>{children}</code>
      </pre>
    )
  }
}
