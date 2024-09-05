import React from 'react';
import TeacherCard from '@/components/teacher-card';
import { teacherList } from '@/data/teacher-list';

export default function TeacherIntroductionSection() {
  return (
    <section className="no-scrollbar flex snap-x snap-mandatory flex-row overflow-y-scroll">
      {teacherList.map((teacher) => (
        <TeacherCard key={teacher.id} {...teacher} />
      ))}
    </section>
  );
}

// TODO: The card will become to colorful and scale-[101%] instead of grayscale style when mobile size's card focused in screen viewpoint.
// TODO: Change carousel button styling.
// FIXME: Fix event-pointer type to none when carousel was scrolling till transition end.
