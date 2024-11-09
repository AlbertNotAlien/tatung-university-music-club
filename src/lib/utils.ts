import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getCurrentWeekRange = (): [startDate: Date, endDate: Date] => {
  const today = new Date();

  // 計算當週的星期日
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - today.getDay());

  // 計算當週的星期六
  const saturday = new Date(sunday);
  saturday.setDate(sunday.getDate() + 6);

  return [sunday, saturday];
};
