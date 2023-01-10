import { useSearchParams } from 'react-router-dom';

export const useSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const valueInput = searchParams.get('value') || '';

  const setSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const currentParams = Object.fromEntries([...searchParams]);
    setSearchParams({ ...currentParams, value });

    if (!value) {
      delete currentParams.value;
      setSearchParams({
        ...currentParams,
      });
    }
  };
  return { valueInput, setSearch };
};
