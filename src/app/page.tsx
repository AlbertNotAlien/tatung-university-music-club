import React, { useId } from 'react';
import TeacherCard from '@/components/teacher-card';
import { teacherList } from '@/data/teacher-list';

function TeacherCardsSection() {
  const id = useId();

  return (
    <section className="no-scrollbar container overflow-x-scroll">
      <div className="flex w-[2000px] flex-row">
        {teacherList.map((teacher) => {
          return <TeacherCard key={`${teacher.name}_${id}`} {...teacher} />;
        })}
      </div>
    </section>
  );
}

export default function Home() {
  return <TeacherCardsSection />;
}
