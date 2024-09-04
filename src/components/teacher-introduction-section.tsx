import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import TeacherCard from '@/components/teacher-card';
import { teacherList } from '@/data/teacher-list';
import { cn } from '@/lib/utils';

export default function TeacherIntroductionSection() {
  return (
    <Carousel>
      <CarouselContent className="ml-1 flex flex-row">
        {teacherList.map((teacher) => {
          return (
            <CarouselItem
              key={`${teacher.id}`}
              className={cn('basis-5/6 px-2 py-6', 'md:basis-[360px] md:px-0')}
            >
              <TeacherCard {...teacher} />
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselNext className="-right-2" />
      <CarouselPrevious className="-left-2" />
    </Carousel>
  );
}

// TODO: The card will become to colorful and scale-[101%] instead of grayscale style when mobile size's card focused in screen viewpoint.
// TODO: Change carousel button styling.
// FIXME: Fix event-pointer type to none when carousel was scrolling till transition end.
