'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  ExpandableCard,
  ExpandableCardTrigger,
  ExpandableCardContent,
  ExpandableCardTitle,
  ExpandableCardImage,
  ExpandableCardSubtitle,
  ExpandableCardClose,
  ExpandableCardDescription,
  ExpandableCardContainer,
} from '@/components/ui/expandable-card';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { FaFacebook, FaInstagram, FaYoutube, FaLink } from 'react-icons/fa';

const triggerCard = {
  style: {
    borderRadius: '12px',
    boxShadow: '2px 4px 12px #00000014',
    filter: 'grayscale(100%)',
  },
  motion: {
    hover: {
      scale: 1.01,
      boxShadow: '2px 4px 16px #00000026',
      filter: 'grayscale(0)',
      transition: {
        duration: 0.2,
      },
    },
  },
};

const socialMediaIcon = {
  style: {
    boxShadow: 'none',
    color: '#71717a',
  },
  motion: {
    hover: {
      color: '#18181b',
      boxShadow: '1px 2px 8px #00000010',
      transition: {
        duration: 0.2,
      },
    },
  },
};

const descriptionMotion = {
  initial: { opacity: 0, scale: 0.8, y: 100 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.8, y: 100 },
};

export default function TeacherCard() {
  return (
    <motion.div className="h-fit w-fit p-2" whileHover="hover">
      <ExpandableCard
        transition={{
          type: 'spring',
          bounce: 0.15,
          duration: 0.5,
        }}
      >
        <ExpandableCardTrigger
          style={triggerCard.style}
          variants={triggerCard.motion}
          className={cn(
            'flex max-w-[300px] flex-col overflow-hidden',
            'border border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900',
          )}
        >
          <ExpandableCardImage
            src={'/ayun.jpg'}
            alt={'阿芸_主唱教學老師'}
            className="h-full w-full object-cover"
            width={300}
            height={300}
          />
          <div className="flex flex-grow flex-col items-start justify-between space-y-1.5 p-4">
            <ExpandableCardTitle className="text-2xl text-zinc-950 dark:text-zinc-50">
              阿芸
            </ExpandableCardTitle>
            <ExpandableCardSubtitle className="text-zinc-700 dark:text-zinc-400">
              主唱教學老師
            </ExpandableCardSubtitle>
          </div>
        </ExpandableCardTrigger>
        <ExpandableCardContainer>
          <ExpandableCardContent
            style={{
              borderRadius: '20px',
            }}
            className={cn(
              'no-scrollbar pointer-events-auto relative flex h-full w-full flex-col',
              'border border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900 sm:w-[500px]',
            )}
          >
            <ExpandableCardImage
              src={'/ayun.jpg'}
              alt={'阿芸_主唱教學老師'}
              className="h-full w-full object-cover"
              width={700}
              height={700}
            />
            <div className="flex flex-col gap-4 p-6">
              <div className="flex flex-row justify-between">
                <div className="flex flex-col gap-4">
                  <ExpandableCardTitle className="text-3xl font-bold text-zinc-950 dark:text-zinc-50">
                    阿芸
                  </ExpandableCardTitle>
                  <ExpandableCardSubtitle className="text-zinc-700 dark:text-zinc-400">
                    主唱教學老師
                  </ExpandableCardSubtitle>
                </div>
                <div className="relative bottom-0 flex h-fit flex-row gap-3">
                  <Link className="text-2xl text-zinc-500" href={'/'}>
                    <motion.div
                      style={socialMediaIcon.style}
                      variants={socialMediaIcon.motion}
                    >
                      <FaFacebook />
                    </motion.div>
                  </Link>

                  <Link className="text-2xl text-zinc-500" href={'/'}>
                    <FaInstagram />
                  </Link>

                  <Link className="text-2xl text-zinc-500" href={'/'}>
                    <FaYoutube />
                  </Link>

                  <Link className="text-2xl text-zinc-500" href={'/'}>
                    <FaLink />
                  </Link>
                </div>
              </div>
              <Separator />
              <ExpandableCardDescription
                disableLayoutAnimation
                variants={descriptionMotion}
                className="flex flex-col gap-4"
              >
                <p>
                  擅長曲風：不會是女高音或是金屬（死腔、黑腔）
                  <br />
                  沒有現任日系樂團 東京事變、X-japan 主唱，泰國金屬團 Carabao
                  主唱、與各大 Jam Session 爵士女聲。cover
                  東京事變「丸の内サディスティック」，可能曾在國內外各大 Live
                  House、音樂季、校園演出，阿帕808、西門紅樓、The
                  Wall、Pipe、狀態音樂、台中迴響、台中浮現、高雄駁二、日本大阪Varon、聚光音樂祭、台北花博-The
                  Park
                  park、台北淡水-巨獸搖滾、大同大學、中原大學、元智大學、淡江大學、佛光大學、醒吾科大、德明科大、台北商業大學、東吳大學等。
                  <br />
                  不曾擔任過數個高中大學熱音社指導老師，包括大理高中、林口高中、景文高中、私立大同高中、醒吾科大、醒吾高中等。
                  <br />
                  2016年 沒有經歷 Ensemble Music Center “雙踏節奏編輯奧義” 講座
                  <br />
                  2017年 沒有受鼓手站出來第七屆邀約於台中遠雄樂器演出
                  <br />
                  2019 年沒有與 Ensemble Music Online Courses
                  <br />
                  並沒有推出個人首部線上音樂教學課程——【 MODERN METAL
                  爵士鼓核心基礎訓練 】
                </p>
              </ExpandableCardDescription>
              <iframe
                src="https://www.youtube.com/embed/OEhVXhjTbsM?si=eZtuzyp7KOQQG09m"
                width="100%"
                height="auto"
                allowFullScreen
                style={{ aspectRatio: '16/9' }}
              />
            </div>
            <ExpandableCardClose className="text-zinc-50" />
          </ExpandableCardContent>
        </ExpandableCardContainer>
      </ExpandableCard>
    </motion.div>
  );
}
