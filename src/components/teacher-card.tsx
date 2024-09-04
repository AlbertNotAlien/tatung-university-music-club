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
import Markdown from 'react-markdown';

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

type TeacherListProps = {
  name: string;
  subtitle: string;
  imgSrc: string;
  bandRole: string;
  links: {
    facebook: string;
    instagram: string;
    youtube: string;
    official: string;
  };
  description: string;
  videoLink: string;
};

export default function TeacherCard({
  name,
  subtitle,
  imgSrc,
  links,
  description,
  videoLink,
}: TeacherListProps) {
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
                <div className="relative bottom-0 flex h-fit flex-row gap-3">
                  {links.facebook.length > 0 && (
                    <Link
                      className="text-2xl text-zinc-500"
                      href={links.facebook}
                    >
                      <motion.div
                        style={socialMediaIcon.style}
                        variants={socialMediaIcon.motion}
                      >
                        <FaFacebook />
                      </motion.div>
                    </Link>
                  )}
                  {links.instagram.length > 0 && (
                    <Link
                      className="text-2xl text-zinc-500"
                      href={links.instagram}
                    >
                      <FaInstagram />
                    </Link>
                  )}
                  {links.youtube.length > 0 && (
                    <Link
                      className="text-2xl text-zinc-500"
                      href={links.youtube}
                    >
                      <FaYoutube />
                    </Link>
                  )}
                  {links.official.length > 0 && (
                    <Link
                      className="text-2xl text-zinc-500"
                      href={links.official}
                    >
                      <FaLink />
                    </Link>
                  )}
                </div>
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
                  src={videoLink}
                  width="100%"
                  height="auto"
                  allowFullScreen
                  style={{ aspectRatio: '16/9' }}
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