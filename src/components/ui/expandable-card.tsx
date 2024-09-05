'use client';

import React, {
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { XIcon } from 'lucide-react';
import {
  motion,
  AnimatePresence,
  MotionConfig,
  Transition,
  Variant,
  Variants,
} from 'framer-motion';
import { cn } from '@/lib/utils';
import useOnClickOutside from '@/hooks/use-on-click-outside';

interface ExpandableCardContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  uniqueId: string;
  triggerRef: React.RefObject<HTMLDivElement>;
}

const ExpandableCardContext =
  React.createContext<ExpandableCardContextType | null>(null);

function useExpandableCard() {
  const context = useContext(ExpandableCardContext);
  if (!context) {
    throw new Error(
      'useExpandableCard must be used within a ExpandableCardProvider',
    );
  }
  return context;
}

type ExpandableCardProviderProps = {
  children: React.ReactNode;
  transition?: Transition;
};

function ExpandableCardProvider({
  children,
  transition,
}: ExpandableCardProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const uniqueId = useId();
  const triggerRef = useRef<HTMLDivElement>(null);

  const contextValue = useMemo(
    () => ({ isOpen, setIsOpen, uniqueId, triggerRef }),
    [isOpen, uniqueId],
  );

  return (
    <ExpandableCardContext.Provider value={contextValue}>
      <MotionConfig transition={transition}>{children}</MotionConfig>
    </ExpandableCardContext.Provider>
  );
}

type ExpandableCardProps = {
  children: React.ReactNode;
  transition?: Transition;
};

function ExpandableCard({ children, transition }: ExpandableCardProps) {
  return (
    <ExpandableCardProvider>
      <MotionConfig transition={transition}>{children}</MotionConfig>
    </ExpandableCardProvider>
  );
}

type ExpandableCardTriggerProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  triggerRef?: React.RefObject<HTMLDivElement>;
  variants?: Variants;
};

function ExpandableCardTrigger({
  children,
  className,
  style,
  triggerRef,
  variants,
}: ExpandableCardTriggerProps) {
  const { setIsOpen, isOpen, uniqueId } = useExpandableCard();

  const handleClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setIsOpen(!isOpen);
      }
    },
    [isOpen, setIsOpen],
  );

  return (
    <motion.div
      ref={triggerRef}
      layoutId={`dialog-${uniqueId}`}
      className={cn('relative cursor-pointer', className)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      style={style}
      role="button"
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      aria-controls={`dialog-content-${uniqueId}`}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

type ExpandableCardContentProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

function ExpandableCardContent({
  children,
  className,
  style,
}: ExpandableCardContentProps) {
  const { setIsOpen, isOpen, uniqueId, triggerRef } = useExpandableCard();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [setIsOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
      triggerRef.current?.focus();
    }
  }, [isOpen, triggerRef]);

  const isCloseExpandableCard = () => isOpen && setIsOpen(false);

  useOnClickOutside(containerRef, isCloseExpandableCard);

  return (
    <motion.div
      ref={containerRef}
      layoutId={`dialog-${uniqueId}`}
      className={cn('overflow-y-scroll', className)}
      style={style}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`dialog-title-${uniqueId}`}
      aria-describedby={`dialog-description-${uniqueId}`}
    >
      {children}
    </motion.div>
  );
}

type ExpandableCardContainerProps = {
  children: React.ReactNode;
};

function ExpandableCardContainer({ children }: ExpandableCardContainerProps) {
  const { isOpen, uniqueId } = useExpandableCard();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence initial={false} mode="sync">
      {isOpen && (
        <>
          <motion.div
            key={`backdrop-${uniqueId}`}
            className="fixed inset-0 z-10 h-full w-full bg-white/40 backdrop-blur-sm dark:bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {children}
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}

type ExpandableCardTitleProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

function ExpandableCardTitle({
  children,
  className,
  style,
}: ExpandableCardTitleProps) {
  const { uniqueId } = useExpandableCard();

  return (
    <motion.h3
      layoutId={`dialog-title-${uniqueId}`}
      className={className}
      style={style}
      layout
    >
      {children}
    </motion.h3>
  );
}

type ExpandableCardSubtitleProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

function ExpandableCardSubtitle({
  children,
  className,
  style,
}: ExpandableCardSubtitleProps) {
  const { uniqueId } = useExpandableCard();

  return (
    <motion.p
      layoutId={`dialog-subtitle-${uniqueId}`}
      className={className}
      style={style}
      layout
    >
      {children}
    </motion.p>
  );
}

type ExpandableCardDescriptionProps = {
  children: React.ReactNode;
  className?: string;
  disableLayoutAnimation?: boolean;
  variants?: {
    initial: Variant;
    animate: Variant;
    exit: Variant;
  };
};

function ExpandableCardDescription({
  children,
  className,
  variants,
  disableLayoutAnimation,
}: ExpandableCardDescriptionProps) {
  const { uniqueId } = useExpandableCard();

  return (
    <motion.div
      key={`dialog-description-${uniqueId}`}
      layoutId={
        disableLayoutAnimation
          ? undefined
          : `dialog-description-content-${uniqueId}`
      }
      variants={variants}
      className={className}
      initial="initial"
      animate="animate"
      exit="exit"
      id={`dialog-description-${uniqueId}`}
    >
      {children}
    </motion.div>
  );
}

type ExpandableCardItemsWrapperProps = {
  children: React.ReactNode;
  className?: string;
  variants?: {
    initial: Variant;
    animate: Variant;
    exit: Variant;
  };
};

function ExpandableCardItemsWrapper({
  children,
  className,
  variants,
}: ExpandableCardItemsWrapperProps) {
  const { uniqueId } = useExpandableCard();

  return (
    <motion.div
      key={`dialog-block-${uniqueId}`}
      variants={variants}
      className={className}
      initial="initial"
      animate="animate"
      exit="exit"
      id={`dialog-block-${uniqueId}`}
    >
      {children}
    </motion.div>
  );
}

type ExpandableCardImageProps = {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  width: number;
  height: number;
};

function ExpandableCardImage({
  src,
  alt,
  className,
  style,
  width,
  height,
}: ExpandableCardImageProps) {
  const { uniqueId } = useExpandableCard();

  return (
    <motion.div className="h-full w-full" layoutId={`dialog-img-${uniqueId}`}>
      <Image
        src={src}
        alt={alt}
        className={className}
        style={style}
        width={width}
        height={height}
      />
    </motion.div>
  );
}

type ExpandableCardCloseProps = {
  children?: React.ReactNode;
  className?: string;
  variants?: {
    initial: Variant;
    animate: Variant;
    exit: Variant;
  };
};

function ExpandableCardClose({
  children,
  className,
  variants,
}: ExpandableCardCloseProps) {
  const { setIsOpen, uniqueId } = useExpandableCard();

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <motion.button
      onClick={handleClose}
      type="button"
      aria-label="Close dialog"
      key={`dialog-close-${uniqueId}`}
      className={cn('absolute right-4 top-4', className)}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
    >
      {children || <XIcon size={24} />}
    </motion.button>
  );
}

export {
  useExpandableCard,
  ExpandableCard,
  ExpandableCardTrigger,
  ExpandableCardContainer,
  ExpandableCardContent,
  ExpandableCardClose,
  ExpandableCardTitle,
  ExpandableCardSubtitle,
  ExpandableCardDescription,
  ExpandableCardItemsWrapper,
  ExpandableCardImage,
};
