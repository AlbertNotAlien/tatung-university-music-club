import React from 'react';
import TeacherCard from '@/components/teacher-card';
import { teacherList } from '@/data/teacher-list';

// TODO: The card will become to colorful and scale-[101%] instead of grayscale style when mobile size's card focused in screen viewpoint.

export default function TeacherIntroductionSection() {
  return (
    <section className="no-scrollbar flex snap-x snap-mandatory flex-row overflow-x-scroll">
      {teacherList.map((teacher) => (
        <TeacherCard key={teacher.id} {...teacher} />
      ))}
    </section>
  );
}
