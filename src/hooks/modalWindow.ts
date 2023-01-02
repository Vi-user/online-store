import { useState } from 'react';

export default function useModal() {
  const [isOpen, setIsOpen] = useState(false);

  const changeModalVisibility = (): void => {
    setIsOpen(!isOpen);
  };

  return {
    isOpen,
    changeModalVisibility,
  };
}
