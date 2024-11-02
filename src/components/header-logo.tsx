'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';

export default function HeaderLogo() {
  const { theme } = useTheme();

  const [src, setSrc] = useState('/ttumc-logo.svg');

  useEffect(() => {
    if (theme === 'dark') {
      setSrc('/ttumc-logo-white.svg');
    } else {
      setSrc('/ttumc-logo.svg');
    }
  }, [theme]);

  return <Image src={src} alt="ttumc-logo" width={36} height={36} priority />;
}
