import React from 'react';
import { cn } from '@/lib/utils';

type IconProps = {
  className?: string;
};

function FacebookIcon({ className }: IconProps) {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      xmlSpace="preserve"
      className={cn('h-6 w-6', className)}
    >
      <path
        d="M12,2C6.48,2,2,6.48,2,12c0,5.01,3.69,9.15,8.51,9.88v-7.23H8.03v-2.63h2.47v-1.75c0-2.9,1.41-4.17,3.82-4.17
	c1.15,0,1.76,0.09,2.05,0.12v2.29h-1.64c-1.02,0-1.38,0.97-1.38,2.06v1.44h2.99l-0.41,2.63h-2.59v7.25C18.24,21.24,22,17.06,22,12
	C22,6.48,17.52,2,12,2z"
      />
    </svg>
  );
}

function InstagramIcon({ className }: IconProps) {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      xmlSpace="preserve"
      className={cn('h-6 w-6', className)}
    >
      <path
        d="M8,3C5.24,3,3,5.24,3,8v8c0,2.76,2.24,5,5,5h8c2.76,0,5-2.24,5-5V8c0-2.76-2.24-5-5-5H8z M18,5c0.55,0,1,0.45,1,1
	s-0.45,1-1,1s-1-0.45-1-1S17.45,5,18,5z M12,7c2.76,0,5,2.24,5,5s-2.24,5-5,5s-5-2.24-5-5S9.24,7,12,7z M12,9c-1.66,0-3,1.34-3,3
	s1.34,3,3,3s3-1.34,3-3S13.66,9,12,9z"
      />
    </svg>
  );
}

function YoutubeIcon({ className }: IconProps) {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      xmlSpace="preserve"
      className={cn('h-6 w-6', className)}
    >
      <path
        d="M21.58,6.19c-0.23-0.86-0.91-1.54-1.77-1.77C18.25,4,12,4,12,4S5.75,4,4.19,4.42C3.33,4.65,2.65,5.33,2.42,6.19
	C2,7.75,2,12,2,12s0,4.25,0.42,5.81c0.23,0.86,0.91,1.54,1.77,1.77C5.75,20,12,20,12,20s6.25,0,7.81-0.42
	c0.86-0.23,1.54-0.91,1.77-1.77C22,16.25,22,12,22,12S22,7.75,21.58,6.19z M10,15.46V8.54L16,12L10,15.46z"
      />
    </svg>
  );
}

function LinkIcon({ className }: IconProps) {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      xmlSpace="preserve"
      className={cn('h-6 w-6', className)}
    >
      <g>
        <path
          d="M22,9.01c-0.03,1.28-0.46,2.39-1.35,3.3c-1.32,1.34-2.61,2.7-4,3.97c-2.59,2.37-6.84,1.11-7.76-2.28
		c-0.4-1.49-0.15-2.88,0.78-4.13c0.27-0.36,0.71-0.5,1.1-0.38c0.45,0.14,0.74,0.44,0.76,0.91c0.01,0.26-0.09,0.56-0.23,0.79
		c-0.37,0.63-0.58,1.29-0.43,2.02c0.2,0.99,0.77,1.69,1.73,2.03c0.95,0.33,1.85,0.18,2.6-0.49c0.72-0.65,1.39-1.36,2.07-2.04
		c0.59-0.59,1.18-1.19,1.77-1.78c0.99-1,1.1-2.5,0.22-3.58c-0.89-1.09-2.29-1.28-3.41-0.63c-0.29,0.17-0.56,0.37-0.92,0.35
		c-0.45-0.02-0.85-0.33-0.98-0.76c-0.13-0.43,0.04-0.88,0.43-1.16c2.58-1.86,6.19-0.76,7.29,2.22c0.1,0.27,0.17,0.56,0.23,0.84
		C21.96,8.46,21.97,8.73,22,9.01z"
        />
        <path
          d="M2,15.14c0.02-1.4,0.41-2.5,1.28-3.38c1.36-1.38,2.71-2.78,4.12-4.1c1.81-1.7,4.92-1.5,6.58,0.34
		c1.55,1.72,1.73,4.06,0.46,5.97c-0.37,0.56-0.96,0.72-1.48,0.42c-0.54-0.32-0.69-0.93-0.34-1.48c0.32-0.5,0.54-1.03,0.53-1.63
		c-0.02-1.03-0.47-1.84-1.38-2.33C10.83,8.43,9.89,8.5,8.99,9.07c-0.13,0.09-0.26,0.19-0.37,0.3c-1.26,1.27-2.53,2.53-3.78,3.81
		c-0.78,0.8-0.94,2.04-0.42,3.01c0.55,1.04,1.64,1.59,2.77,1.42c0.47-0.07,0.86-0.28,1.26-0.52c0.39-0.24,0.79-0.23,1.17,0.04
		c0.36,0.25,0.49,0.61,0.43,1.04c-0.05,0.32-0.24,0.55-0.49,0.72c-1.62,1.06-3.31,1.22-5.03,0.29C2.87,18.28,2.07,16.84,2,15.14z"
        />
      </g>
    </svg>
  );
}

export { FacebookIcon, InstagramIcon, YoutubeIcon, LinkIcon };
