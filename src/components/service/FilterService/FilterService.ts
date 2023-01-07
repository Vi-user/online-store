export default class SearchFilterService {
  static searchByParams(
    checked: boolean,
    value: string,
    nameSearchTODO: string,
    urlSearchParams: URLSearchParams,
    filterCategory: Array<string>
  ): URLSearchParams {
    const currentParams = Object.fromEntries([...urlSearchParams]);
    if (checked) {
      const newFilter = [...filterCategory, value].join(',');
      return { ...currentParams, [nameSearchTODO]: newFilter } as unknown as URLSearchParams;
    } else {
      const indexValue = filterCategory.indexOf(value);
      const newFilter = [
        ...filterCategory.slice(0, indexValue),
        ...filterCategory.slice(indexValue + 1),
      ].join(',');
      if (!newFilter.length) {
        delete currentParams[nameSearchTODO];
        return {
          ...currentParams,
        } as unknown as URLSearchParams;
      } else {
        return { ...currentParams, [nameSearchTODO]: newFilter } as unknown as URLSearchParams;
      }
    }
  }
}
