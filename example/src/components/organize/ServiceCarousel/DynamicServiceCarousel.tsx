'use client';

import dynamic from 'next/dynamic';

const DynamicServiceCarousel = dynamic(() => import('./ServiceCarousel'), {
    ssr: false,
});

export default DynamicServiceCarousel;
