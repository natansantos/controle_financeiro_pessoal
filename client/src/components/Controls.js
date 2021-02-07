import React, { useEffect } from 'react';
import M from 'materialize-css';

export default function Controls({ filter, onChangeFilter, onPersist }) {
  useEffect(() => {
    M.AutoInit();
  }, []);

  const handleInputChange = (e) => {
    onChangeFilter(e.target.value);
  };

  const handleButtonClick = () => {
    onPersist('add');
  };

  return (
    <div style={styles.flexRow}>
      <button
        className="btn waves-effect waves-light"
        name="action"
        style={{ zIndex: 0 }}
        onClick={handleButtonClick}
      >
        <i className="material-icons left">add</i>
        Novo Lançamento
      </button>
      <div
        className="input-field col s12"
        style={{ flexGrow: 1, marginLeft: '10px' }}
      >
        <input
          id="filter"
          type="text"
          placeholder="Filtro"
          value={filter}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}

const styles = {
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
};
