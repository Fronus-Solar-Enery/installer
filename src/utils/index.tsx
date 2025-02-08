import { useEffect } from 'react';
import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/store/themeConfigSlice';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const useSetTitle = (title: string) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle(title));
  }, [dispatch, title]);
};
