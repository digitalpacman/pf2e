import React, { useEffect } from 'react';
import { SetEditor } from './editor-sets';
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

  const { hidden, fields, editField, editValue, componentResetState, onSave, parse, stringify } = props;
  const editorProps = { hidden, fields, editField, editValue, componentResetState, onSave, parse, stringify };

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