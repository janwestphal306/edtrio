import React from 'react'
import './style.css'

import Controls from './Controls'
import Notes from '../notes'

export default function Section(options) {
  return {
    changes: {},
    helpers: {},
    components: {},
    plugins: [RenderSectionNode, RenderPNode, RenderPlaceholderP, { schema }]
  }
}

//TODO: have a look at normalizeNode and node_data_invalid as error code at some point
const schema = {
  blocks: {
    section: {
      data: {
        isVisible: v => typeof v === 'boolean'
      }
    }
  }
}

const RenderSectionNode = {
  renderNode({ attributes, editor, children, node, isFocused }) {
    if (node.type === 'section') {
      const isVisible = node.data.get('isVisible')
      const hasNotes = node.nodes.some(child => child.type === 'notes')

      return (
        <div className="wrapper">
          <section
            className={`section content ${!isVisible ? 'hidden' : ''}`}
            {...attributes}
          >
            {children}
            {isFocused ? (
              <Controls editor={editor} isVisible={isVisible} />
            ) : null}
          </section>
          {!hasNotes ? (
            <aside
              className="notes placeholder"
              onMouseDown={e => {
                const change = editor.value.change()
                const onChange = editor.props.onChange
                onChange(
                  change
                    .moveToEndOfNode(node)
                    .call(Notes().changes.insertNotes)
                    .focus()
                )
                return true
              }}
            >
              Klick me
            </aside>
          ) : null}
        </div>
      )
    }
  }
}

const RenderPNode = {
  renderNode({ attributes, children, node }) {
    if (node.type === 'p') {
      return <p {...attributes}>{children}</p>
    }
  }
}

const RenderPlaceholderP = {
  renderPlaceholder({ node, editor }) {
    if (node.object !== 'block') return
    if (node.type !== 'p') return
    if (node.text !== '') return

    return (
      <span
        contentEditable={false}
        style={{ display: 'inline-block', width: '0', whiteSpace: 'nowrap' }}
        className="has-text-grey"
        onMouseDown={e => {
          const change = editor.value.change()
          const onChange = editor.props.onChange
          onChange(change.moveToStartOfNode(node).focus())
          return true
        }}
      >
        Schreib etwas Spannendes...
      </span>
    )
  }
}
