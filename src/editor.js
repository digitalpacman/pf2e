import React, { useEffect } from 'react';
import './App.css';

const editing = (fields, editField) => {
  if (!Array.isArray(fields)) {
    fields = [fields];
  }

  return fields.indexOf(editField) != -1;
};

const FieldEditor = ({ fields, editField, editValue, onSave }) => {
  if (!editing(fields, editField)) {
    return null;
  }

  const handleChange = (event) => {
    onSave(event.target.value);
  };

  return (
    <div>
      {editField} <input type="text" value={editValue} onChange={handleChange} />
    </div>
  );
};

const SetEditor = ({ fields, editField, editValue, onSave }) => {
  if (!editing(fields, editField)) {
    return null;
  }

  const handleChange = (event) => {
    const values = event.target.value.split(',');
    onSave(values);
  };

  return (
    <div>
      {editField} <input type="text" value={editValue} onChange={handleChange} />
    </div>
  );
};

const TextAreaEditor = ({ fields, editField, editValue, onSave }) => {
  if (!editing(fields, editField)) {
    return null;
  }

  const handleChange = (event) => {
    const value = event.target.value;
    onSave(value);
  };

  return (
    <div>
      {editField} <textarea onChange={handleChange} value={editValue} />
    </div>
  );
};

const SourceInputs = ({ editValue, delim, componentResetState, onChange }) => {
  const refs = [];
  editValue = editValue && editValue.length > 0 ? editValue : [];

  useEffect(() => {
    if (componentResetState) {
      const { focusIndex } = componentResetState;
      if (typeof focusIndex === 'number' && focusIndex >= 0) {
        refs[focusIndex].focus();
      }
    }
  });

  const handleOnChange = (event, editIndex) => {
    const values = event.target.value.split(';');
    for (let i = 0; i < values.length; ++i) {
      const value = values[i];
      const parts = value.split(delim);
      const abbr = parts[0];
      const page_start = parts.length > 1 ? parts[1] : null;
      const source = { abbr, page_start };

      if (i === 0) {
        editValue[editIndex] = source;
      } else {
        editValue.push(source)
      }
    }

    event.stopPropagation();
    
    const focusIndex = values.length > 1 && editValue.length - 1;
    onChange(editValue, { focusIndex });
  };

  const handleKeyDown = (event, editIndex) => {
    const value = event.target.value;
    const backspaceCode = 8;
    const deleteCode = 46;
    const tabCode = 9;
    const enterCode = 13;

    let added = false;
    let deleted = false;
    if (event.keyCode === tabCode && (refs.length - 1) === editIndex) {
      added = true;
      editValue.push({ abbr: '', page_start: null });
    } else if ((event.keyCode === backspaceCode || event.keyCode === deleteCode) && value.length <= 1) {
      deleted = true;
      editValue.splice(editIndex, 1);
    } else if (event.keyCode === enterCode) {
      added = true;
      editValue.push({ abbr: '', page_start: null });
    } else {
      return;
    }
    
    event.stopPropagation();
    const focusIndex = added ? editValue.length - 1 : deleted ? Math.min(editValue.length - 1, editIndex) : 0;
    onChange(editValue, { focusIndex });
  };

  const handleAddSource = () => {
    editValue.push({ abbr: '', page_start: null });
    const focusIndex = 0;
    onChange(editValue, { focusIndex });
  };

  if (editValue.length === 0) {
    return (
      <div onClick={handleAddSource}>+ Add Source</div>
    );
  }

  return editValue.map((x, i) => {
    const value = x.page_start !== null ? `${x.abbr}${delim}${x.page_start}` : x.abbr;
    return (
      <input
        key={i}
        ref={input => refs.push(input)}
        type="text"
        onKeyDown={(event) => handleKeyDown(event, i)}
        onChange={(event) => handleOnChange(event, i)}
        value={value} />
    );
  });
};

const SourceEditor = ({ fields, editField, editValue, componentResetState, onSave }) => {
  if (!editing(fields, editField)) {
    return null;
  }

  const delim = ' pg. ';

  const handleChange = (values, componentResetState) => {
    onSave(values, componentResetState);
  };

  return (
    <div>
      <SourceInputs editValue={editValue} delim={delim} componentResetState={componentResetState} onChange={handleChange} />
    </div>
  );
};

const WrappedH1 = (props) => {
  return (<h1 {...props} />);
}

const WrappedH2 = (props) => {
  return (<h2 {...props} />);
}

const WrappedDiv = (props) => {
  return (<div {...props} />);
}

const reduceProps = (props) => {
  const { className, onClick, children } = props;
  const tagProps = { className, onClick, children };

  const { hidden, fields, editField, editValue, componentResetState, onSave } = props;
  const editorProps = { hidden, fields, editField, editValue, componentResetState, onSave };

  return { tagProps, editorProps };
};

const createEditor = (WrappedComponent, Editor) => {
  return (props) => {
    const { tagProps, editorProps } = reduceProps(props);
    return (
      <>
        {!props.hidden && <WrappedComponent {...tagProps} />}        
        <Editor {...editorProps} />
      </>
    );
  };
};

const createEditors = (WrappedComponent) => {
  return {
    FieldEditor: createEditor(WrappedComponent, FieldEditor),
    SetEditor: createEditor(WrappedComponent, SetEditor),
    TextAreaEditor: createEditor(WrappedComponent, TextAreaEditor),
    SourceEditor: createEditor(WrappedComponent, SourceEditor),
  };
};

const h1 = createEditors(WrappedH1);
const h2 = createEditors(WrappedH2);
const div = createEditors(WrappedDiv);

export {
  h1,
  h2,
  div,
};