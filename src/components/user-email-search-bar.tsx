'use client';

import React, { ChangeEvent, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Member } from '@/types/band';

// TODO: Debounce on input.
// TODO: Option will no longer be displayed after they are selected.

type UserSearchBarPropsProps = {
  userData: Member[];
  selectedUsers: Member[];
  onSetSelectedUsers: (selectedUser: Member[]) => void;
};

export default function UserSearchBarProps({
  userData,
  selectedUsers,
  onSetSelectedUsers,
}: UserSearchBarPropsProps) {
  const [isListVisible, setIsListVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsListVisible(e.target.value !== '');
  };

  const handleSelect = (email: string) => {
    const selectedUser = userData.find((user) => user.email === email);
    if (!selectedUser) return;

    const isAlreadySelected = selectedUsers.some(
      (user) => user.email === email,
    );
    if (isAlreadySelected) return;

    onSetSelectedUsers([
      ...selectedUsers,
      { ...selectedUser, isLeader: false },
    ]);
    setIsListVisible(false);
    setInputValue('');
  };

  const handleRemove = (user: Member) => {
    const newUsers = selectedUsers.filter(
      (removedUser) => user.displayName !== removedUser.displayName,
    );

    onSetSelectedUsers(newUsers);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="no-scrollbar flex min-h-[56px] flex-row gap-2 overflow-x-scroll rounded-lg bg-zinc-100 p-2 dark:bg-zinc-700 md:flex-wrap md:overflow-hidden">
        {selectedUsers.map((user) => {
          const { displayName, email, image } = user;
          return (
            <div
              key={email}
              className="flex w-auto max-w-[250px] flex-row items-center gap-2 rounded-full bg-zinc-50 py-2 pl-2 pr-4 dark:bg-black/80"
            >
              <div className="h-[24px] w-[24px] flex-shrink-0 rounded-full bg-zinc-300">
                {image}
              </div>
              <p className="text-sm truncate">{displayName}</p>
              <Button
                className="h-[20px] w-fit rounded-full border-none bg-transparent p-0 text-base text-foreground hover:bg-transparent"
                type="button"
                onClick={() => handleRemove(user)}
              >
                ✕
              </Button>
            </div>
          );
        })}
      </div>
      <Command className="rounded-lg border shadow-md md:min-w-[450px]">
        <CommandInput
          value={inputValue}
          placeholder="Search your band members."
          onChangeCapture={handleChange}
        />
        <CommandList
          className={cn(
            isListVisible ? 'relative md:absolute' : 'hidden',
            'h-[calc(100%-450px)] overflow-y-scroll p-2',
            'sm:w-[450px] md:mt-12 md:h-auto md:overflow-auto md:rounded-lg md:border md:bg-background',
          )}
        >
          <CommandEmpty>No user found.</CommandEmpty>
          <CommandGroup>
            {userData.map((user: Member) => {
              const { displayName, email, image } = user;
              return (
                <CommandItem
                  key={email}
                  value={email}
                  onSelect={() => handleSelect(email)}
                  className="flex justify-start cursor-pointer"
                >
                  <div className="h-[48px] w-[48px] flex-shrink-0 rounded-full bg-zinc-300">
                    {image}
                  </div>
                  <div className="w-auto min-w-0">
                    <p className="text-base truncate">{displayName}</p>
                    <p className="text-sm truncate text-zinc-600">{email}</p>
                  </div>
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}
