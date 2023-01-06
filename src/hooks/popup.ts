import { useState } from 'react';

export default function usePopup() {
  const [isOpenPopup, setIsOpen] = useState(false);

  const togglePopup = (): void => {
    setIsOpen((prev) => !prev);
  };

  return {
    isOpenPopup,
    togglePopup,
  };
}
