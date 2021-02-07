import React from 'react';
import { PERIODS } from '../api/apiService';

export default function Select({ period, onChange }) {
  // useEffect(() => {
  //   M.AutoInit();
  // }, []);

  const handlePeriodChange = (e) => {
    onChange(e.target.value);
  };
  return (
    <div styles={styles.flexRow}>
      <select
        value={period}
        onChange={handlePeriodChange}
        style={{ zIndex: 0 }}
        className="browser-default"
      >
        {PERIODS.map((period) => {
          return (
            <option key={period.id} value={period.value} className="center">
              {period.description}
            </option>
          );
        })}
      </select>
    </div>
  );
}

const styles = {
  select: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    zIndex: 0,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '40px',
    padding: '50px',
  },
};
