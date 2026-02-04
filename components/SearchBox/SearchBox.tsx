'use client';

// Styles
import css from './SearchBox.module.css';

// Types
interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBox({ value, onChange }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      type='search'
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder='Search notes...'
      aria-label='Search notes'
    />
  );
}
