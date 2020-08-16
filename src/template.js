import React, { useState } from 'react';
import MarkdownIt from 'markdown-it';
import MarkdownItContainer from 'markdown-it-container';
import MarkdownItAttrs from 'markdown-it-attrs';
import MarkdownItEmoji from 'markdown-it-emoji';
import './markdown.css';

const md = new MarkdownIt()
.use(MarkdownItContainer, 'traits')
.use(MarkdownItContainer, 'rolls')
.use(MarkdownItContainer, 'oneaction')
.use(MarkdownItAttrs)
.use(MarkdownItEmoji, {
  shortcuts: {
    oneaction: ':one:',
  },
  defs: {
    oneaction: '<span class="one-action"></span>',
  },
  enabled: [
    'oneaction',
  ],
});

export const Template = () => {
  const [state, setState] = useState({
    markdown: `
| Monster | Creature 10 |
| :-- | --: |
---
::: traits
- LG
- SMALL
- HUMANOID
:::

**Percetion** +19; darkvision

**Skills** Acrobatics +2, Stealth +10 (+12 forests)

**Str** +4, **Dex** +5

**Fire Breath** (traits) this is a very long description very long description very long description very long description very long description

::: rolls
**Critical Success** 2d6 damage

**Success** 1d6 damage
:::

**Items** +1 items

---

**AC** 10

**Super Attack Mode** :one: (traits) Strike 50 times
`
  });
  
  const handleOnChange = (event) => {
    const markdown = event.target.value;
    setState({ ...state, markdown });
  };

  return (
    <div className="split-editor">
      <textarea className="markdown-template" onChange={handleOnChange} value={state.markdown} />
      <div className="parchment" dangerouslySetInnerHTML={{__html: md.render(state.markdown)}}></div>
    </div>
  );
};