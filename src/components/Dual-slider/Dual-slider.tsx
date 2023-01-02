import React, { useState, useRef, FC, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Dual-slider.scss';

interface DualSlider {
  min: number;
  max: number;
  onChange: (...args: any[]) => void;
}

const DualSlider: FC<DualSlider> = ({ min, max, onChange }) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);
  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  return (
    <>
      <div className='container'>
        <input
          type='range'
          min={min}
          max={max}
          value={minVal}
          onChange={(event) => {
            const value = Math.min(Number(event.target.value), maxVal - 1);
            setMinVal(value);
            minValRef.current = value;
          }}
          className='thumb thumb--left'
        />
        <input
          type='range'
          min={min}
          max={max}
          value={maxVal}
          onChange={(event) => {
            const value = Math.max(Number(event.target.value), minVal + 1);
            setMaxVal(value);
            maxValRef.current = value;
          }}
          className='thumb thumb--right'
        />
        <div className='slider'>
          <div className='slider__track' />
          <div ref={range} className='slider__range' />
          <div className='slider__left-value'>{minVal}</div>
          <div className='slider__right-value'>{maxVal}</div>
        </div>
      </div>
    </>
  );
};

DualSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DualSlider;
