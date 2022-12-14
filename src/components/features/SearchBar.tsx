import { useState } from 'react';
import { PRIMARY_BLUE, SECONDARY_TEXT } from '../../colors';
import Icon, { iSearch } from '../../icons';

export const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className="sticky top-0 h-14 flex items-center bg-blur transition-none"
      style={{ backdropFilter: 'blur(12px)' }}
    >
      <form className="flex items-center relative w-full">
        <div className="absolute ml-4">
          <Icon
            icon={iSearch}
            size={20}
            color={isFocused ? PRIMARY_BLUE : SECONDARY_TEXT}
          />
        </div>
        <input
          className="appearance-none outline-none bg-search  pr-3 pl-14 text-sm focus:border-primary-blue border border-search h-11 w-full rounded-full focus:bg-transparent text-white"
          type="text"
          name="search"
          id="search"
          aria-label="Seach"
          placeholder="Search WebTwitter"
          autoComplete="off"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </form>
    </div>
  );
};
