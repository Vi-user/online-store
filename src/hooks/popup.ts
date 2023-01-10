import { useState } from 'react';

export default function usePopup(): {
  isOpenPopup: boolean;
  togglePopup: () => void;
} {
  const [isOpenPopup, setIsOpen] = useState(false);

  const togglePopup = (): void => {
    setIsOpen((prev) => !prev);
  };

  return {
    isOpenPopup,
    togglePopup,
  };
}
