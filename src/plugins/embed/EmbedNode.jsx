import React, { Component } from 'react'

class EmbedNode extends Component {
  /**
   * TO-DOs
   *
   * - fix input focus weirdness
   * - deal with state changes
   * - replace iframe and youtube/vimeo nodes
   */
  constructor(props) {
    super(props)

    /**
     * INPUT: renderInputNode
     * EMBED: renderEmbedNode
     */
    this.state = {
      input: this.props.src ? false : true
    }
  }

  renderInputNode = () => {
    const { src, selected, ...attributes } = this.props

    return (
      <input
        className="input"
        style={{ marginBottom: '1em' }}
        {...attributes}
        type="text"
        placeholder="Insert link"
      />
    )
  }

  renderEmbedNode = () => {
    const { src, selected, ...attributes } = this.props

    return (
      <div
        className={`plugin-wrapper ${selected ? 'selected' : ''}`}
        style={{ display: 'flex', flexDirection: 'column' }}
        {...attributes}
      >
        <iframe
          title="XXX XXX CHANGE ME XXX XXX"
          style={{ minHeight: '25rem' }}
          src={src}
          frameBorder="0"
          allowFullScreen
        />
      </div>
    )
  }

  render() {
    return this.state.input ? this.renderInputNode() : this.renderEmbedNode()
  }
}

export default EmbedNode
