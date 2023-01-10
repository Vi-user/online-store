import React, { useState } from 'react';
import './Sort.scss';

function Sort(): JSX.Element {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const list = [
    ' .....',
    ' Sort by price ASC',
    ' Sort by price DESK',
    ' Sort by discount ASC',
    ' Sort by discount DESC',
  ];

  const onClickListItem = (i: React.SetStateAction<number>) => {
    setSelected(i);
    setOpen(false);
  };

  return (
    <div className='sort'>
      <div className='sort__label'>
        <b>Sort options: </b>
        <span onClick={() => setOpen(!open)}>{list[selected]}</span>
      </div>
      {open && (
        <div className='sort__popup'>
          <ul>
            {list.map((name, i) => (
              <li
                key={i}
                onClick={() => onClickListItem(i)}
                className={selected === i ? 'active' : ''}
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sort;
