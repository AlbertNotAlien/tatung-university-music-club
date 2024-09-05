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
  ExpandableCardContainer,
} from '@/components/ui/expandable-card';
import { Separator } from '@radix-ui/react-dropdown-menu';

// TODO: Social Media Links icons style seem a little bit incongruous, maybe it could be change in future.

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

const descriptionMotion = {
  initial: { opacity: 0, scale: 0.8, y: 100 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.8, y: 100 },
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
    <motion.div className="relative bottom-0 flex h-fit flex-row gap-3">
      {facebook.length > 0 && (
        <motion.a
          layout
          style={socialMediaIcon.style}
          variants={socialMediaIcon.motion}
          whileHover="hover"
          className="text-2xl text-zinc-500"
          href={facebook}
          target="_blank"
          rel="noreferrer"
        >
          <FaFacebookF />
        </motion.a>
      )}
      {instagram.length > 0 && (
        <motion.a
          layout
          style={socialMediaIcon.style}
          variants={socialMediaIcon.motion}
          whileHover="hover"
          className="text-2xl text-zinc-500"
          href={instagram}
          target="_blank"
          rel="noreferrer"
        >
          <FaInstagram />
        </motion.a>
      )}
      {youtube.length > 0 && (
        <motion.a
          layout
          style={socialMediaIcon.style}
          variants={socialMediaIcon.motion}
          whileHover="hover"
          className="text-2xl text-zinc-500"
          href={youtube}
          target="_blank"
          rel="noreferrer"
        >
          <FaYoutube />
        </motion.a>
      )}
      {official.length > 0 && (
        <motion.a
          layout
          style={socialMediaIcon.style}
          variants={socialMediaIcon.motion}
          whileHover="hover"
          className="text-2xl text-zinc-500"
          href={official}
          target="_blank"
          rel="noreferrer"
        >
          <FaLink />
        </motion.a>
      )}
    </motion.div>
  );
}

type TeacherListProps = {
  name: string;
  subtitle: string;
  imgSrc: string;
  bandRole: string;
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
      className={cn('h-auto w-full snap-start p-0', 'md:min-w-[360px] md:p-4')}
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
          style={triggerCard.style}
          variants={triggerCard.motion}
          className={cn(
            'flex flex-col overflow-hidden',
            'border border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900',
          )}
        >
          <ExpandableCardImage
            src={imgSrc}
            alt={`${name}_${subtitle}`}
            className="h-full w-full object-cover"
            width={300}
            height={300}
          />
          <div className="flex flex-grow flex-col items-start justify-between space-y-1.5 p-4">
            <ExpandableCardTitle className="text-2xl text-zinc-950 dark:text-zinc-50">
              {name}
            </ExpandableCardTitle>
            <ExpandableCardSubtitle className="text-zinc-700 dark:text-zinc-400">
              {subtitle}
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
              src={imgSrc}
              alt={`${name}_${subtitle}`}
              className="h-full w-full object-cover"
              width={700}
              height={700}
            />
            <div className="flex flex-col gap-4 p-6">
              <div className="flex flex-row justify-between">
                <div className="flex flex-col gap-4">
                  <ExpandableCardTitle className="text-3xl font-bold text-zinc-950 dark:text-zinc-50">
                    {name}
                  </ExpandableCardTitle>
                  <ExpandableCardSubtitle className="text-zinc-700 dark:text-zinc-400">
                    {subtitle}
                  </ExpandableCardSubtitle>
                </div>
                <SocialMediaLinks links={links} />
              </div>
              <Separator />
              <ExpandableCardDescription
                disableLayoutAnimation
                variants={descriptionMotion}
                className="flex flex-col gap-4"
              >
                <Markdown className="prose">{description}</Markdown>
              </ExpandableCardDescription>
              {videoLink.length > 0 && (
                <iframe
                  title={`${name}_video`}
                  src={videoLink}
                  width="100%"
                  height="auto"
                  allowFullScreen
                  className="aspect-video"
                />
              )}
            </div>
            <ExpandableCardClose className="text-zinc-50" />
          </ExpandableCardContent>
        </ExpandableCardContainer>
      </ExpandableCard>
    </motion.div>
  );
}
