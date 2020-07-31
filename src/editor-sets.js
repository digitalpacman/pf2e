import React, { useEffect } from 'react';
import './App.css';

const editing = (fields, editField) => {
  if (!Array.isArray(fields)) {
    fields = [fields];
  }

  return fields.find(x => x === editField);
};

export const SetEditor = ({ fields, editField, editValue, componentResetState, onSave, parse, stringify }) => {
  const refs = [];

  if (!parse) {
    parse = (value) => value;
  }

  if (!stringify) {
    stringify = (value) => value;
  }

  editValue = editValue && editValue.length > 0 ? editValue : [];
  editValue = editValue.map(stringify);

  useEffect(() => {
    if (!editing(fields, editField)) {
      return;
    }

    if (componentResetState) {
      const { focusIndex } = componentResetState;
      if (typeof focusIndex === 'number' && focusIndex >= 0) {
        refs[focusIndex].focus();
      }
    }
  });

  const editingField = editing(fields, editField);
  if (!editingField) {
    return null;
  }

  const handleOnChange = (event, editIndex) => {
    const values = event.target.value.split(';');
    for (let i = 0; i < values.length; ++i) {
      const value = values[i];
      if (i === 0) {
        editValue[editIndex] = value;
      } else {
        editValue.push(value)
      }
    }

    event.stopPropagation();    
    const focusIndex = values.length > 1 && editValue.length - 1;
    const parsedValues = editValue.map(parse);
    onSave(parsedValues, { focusIndex });
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
      editValue.push(parse(''));
    } else if ((event.keyCode === backspaceCode || event.keyCode === deleteCode) && value.length <= 1) {
      deleted = true;
      editValue.splice(editIndex, 1);
    } else if (event.keyCode === enterCode) {
      added = true;
      editValue.push(parse(''));
    } else {
      return;
    }
    
    event.stopPropagation();
    const focusIndex = added ? editValue.length - 1 : deleted ? Math.min(editValue.length - 1, editIndex) : 0;
    onSave(editValue, { focusIndex });
  };

  const handleAdd = () => {
    editValue.push(parse(''));
    const focusIndex = 0;
    onSave(editValue, { focusIndex });
  };

  if (editValue.length === 0) {
    return (
      <div onClick={handleAdd}>+ Add</div>
    );
  }

  const render = (value, i) => {
    return (
      <input
        key={i}
        ref={input => refs.push(input)}
        type="text"
        onKeyDown={(event) => handleKeyDown(event, i)}
        onChange={(event) => handleOnChange(event, i)}
        value={value} />
    );
  };

  return (
    <div>
      {editValue.map(render)}
    </div>
  );
};