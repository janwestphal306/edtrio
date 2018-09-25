import React from 'react'
import { Block, Text } from 'slate'

import './style.css'

export default function Notes(options) {
  return {
    changes: {
      insertNotes
    },
    helpers: {},
    components: {
      NotesNode
    },
    plugins: [RenderNotesNode]
  }
}

function insertNotes(change) {
  change.insertBlock(
    Block.create({
      type: 'notes',
      nodes: [Text.create()]
    })
  )
}

function NotesNode(props) {
  const { selected, children, ...attributes } = props

  return (
    <aside className="notes" {...attributes}>
      {children}
    </aside>
  )
}

const RenderNotesNode = {
  renderNode(props) {
    const { attributes, children, node } = props

    if (node.type === 'notes') {
      return <NotesNode {...attributes}>{children}</NotesNode>
    }
  }
}
