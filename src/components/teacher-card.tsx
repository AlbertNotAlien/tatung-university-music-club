'use client';

import React from 'react';
import Markdown from 'react-markdown';
import { FaInstagram, FaYoutube, FaLink, FaFacebookF } from 'react-icons/fa';
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
  ExpandableCardItemsWrapper,
  ExpandableCardContainer,
} from '@/components/ui/expandable-card';
import { Separator } from '@/components/ui/separator';

// TODO: Social Media Links icons style seem a little bit incongruous, maybe it could be change in future.

const triggerCard = {
  defaultStyle: {
    boxShadow: '2px 4px 12px #00000014',
    filter: 'grayscale(100%)',
  },
  hoverMotion: {
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

const descriptionAppearMotion = {
  initial: { opacity: 0, scale: 0.8, y: 100 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.8, y: 100 },
};

const socialMediaAppearMotion = {
  initial: { opacity: 0, y: 100 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 100 },
};

type SocialMediaLinksProps = {
  facebook: string;
  instagram: string;
  youtube: string;
  official: string;
};

function SocialMediaLinks({ links }: { links: SocialMediaLinksProps }) {
  const { facebook, instagram, youtube, official } = links;

  return (
    <ExpandableCardItemsWrapper
      variants={socialMediaAppearMotion}
      className="flex flex-row items-end gap-3 pb-1"
    >
      {facebook.length > 0 && (
        <a
          className="text-2xl text-zinc-500 duration-300 hover:text-zinc-900 dark:hover:text-zinc-200"
          href={facebook}
          target="_blank"
          rel="noreferrer"
        >
          <FaFacebookF />
        </a>
      )}
      {instagram.length > 0 && (
        <a
          className="text-2xl text-zinc-500 duration-300 hover:text-zinc-900 dark:hover:text-zinc-200"
          href={instagram}
          target="_blank"
          rel="noreferrer"
        >
          <FaInstagram />
        </a>
      )}
      {youtube.length > 0 && (
        <a
          className="text-2xl text-zinc-500 duration-300 hover:text-zinc-900 dark:hover:text-zinc-200"
          href={youtube}
          target="_blank"
          rel="noreferrer"
        >
          <FaYoutube />
        </a>
      )}
      {official.length > 0 && (
        <a
          className="text-2xl text-zinc-500 duration-300 hover:text-zinc-900 dark:hover:text-zinc-200"
          href={official}
          target="_blank"
          rel="noreferrer"
        >
          <FaLink />
        </a>
      )}
    </ExpandableCardItemsWrapper>
  );
}

type TeacherListProps = {
  name: string;
  subtitle: string;
  imgSrc: string;
  description: string;
  videoLink: string;
  links: SocialMediaLinksProps;
};

export default function TeacherCard({
  name,
  subtitle,
  imgSrc,
  description,
  videoLink,
  links,
}: TeacherListProps) {
  return (
    <motion.div
      className={cn(
        'h-auto min-w-[280px] snap-center px-1.5 py-3',
        'md:min-w-[360px] md:snap-start md:px-2 md:py-5',
      )}
      whileHover="hover"
    >
      <ExpandableCard
        transition={{
          type: 'spring',
          bounce: 0.15,
          duration: 0.5,
        }}
      >
        <ExpandableCardTrigger
          style={triggerCard.defaultStyle}
          variants={triggerCard.hoverMotion}
          className={cn(
            'flex flex-col overflow-hidden',
            'rounded-xl border-0 bg-white dark:bg-zinc-900',
          )}
        >
          <ExpandableCardImage
            src={imgSrc}
            alt={`${name}_${subtitle}`}
            className="h-full w-full object-cover"
            width={300}
            height={300}
          />
          <div className="flex flex-row justify-between p-6">
            <div className="flex flex-col gap-3">
              <ExpandableCardTitle className="text-4xl font-bold text-zinc-950 dark:text-zinc-50">
                {name}
              </ExpandableCardTitle>
              <ExpandableCardSubtitle className="text-sm font-normal text-zinc-700 dark:text-zinc-400">
                {subtitle}
              </ExpandableCardSubtitle>
            </div>
          </div>
        </ExpandableCardTrigger>
        <ExpandableCardContainer>
          <ExpandableCardContent
            className={cn(
              'no-scrollbar pointer-events-auto relative flex h-full w-full flex-col overflow-y-scroll',
              'rounded-xl bg-white dark:bg-zinc-900 sm:w-[550px] md:rounded-2xl',
              'shadow-[2px_4px_12px_#00000014] dark:shadow-[2px_4px_12px_#00000075]',
            )}
          >
            <ExpandableCardClose className="absolute right-2 top-2 text-zinc-50" />
            <ExpandableCardImage
              src={imgSrc}
              alt={`${name}_${subtitle}`}
              className="h-full w-full object-cover"
              width={700}
              height={700}
            />
            <div className="flex flex-col gap-4 p-8">
              <div className="flex flex-row justify-between">
                <div className="flex flex-col gap-4">
                  <ExpandableCardTitle className="text-4xl font-bold text-zinc-950 dark:text-zinc-50">
                    {name}
                  </ExpandableCardTitle>
                  <ExpandableCardSubtitle className="text-sm font-normal text-zinc-700 dark:text-zinc-400">
                    {subtitle}
                  </ExpandableCardSubtitle>
                </div>
                <SocialMediaLinks links={links} />
              </div>
              <Separator />
              <ExpandableCardDescription
                disableLayoutAnimation
                variants={descriptionAppearMotion}
                className="flex flex-col gap-4"
              >
                <Markdown
                  className={cn(
                    'prose prose-p:text-zinc-800 prose-strong:text-zinc-900 prose-ul:text-zinc-700',
                    'dark:prose-p:text-zinc-300 dark:prose-strong:text-zinc-100 dark:prose-ul:text-zinc-400',
                  )}
                >
                  {description}
                </Markdown>
              </ExpandableCardDescription>
              {videoLink.length > 0 && (
                <iframe
                  title={`${name}_video`}
                  src={videoLink}
                  width="100%"
                  height="auto"
                  className="aspect-video"
                  allowFullScreen
                />
              )}
            </div>
          </ExpandableCardContent>
        </ExpandableCardContainer>
      </ExpandableCard>
    </motion.div>
  );
}
