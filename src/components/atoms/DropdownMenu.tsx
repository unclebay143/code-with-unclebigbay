import React from 'react';
import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';

interface DropdownMenuProps extends RadixDropdownMenu.DropdownMenuProps {}
interface DropdownMenuTriggerProps
  extends RadixDropdownMenu.DropdownMenuTriggerProps {}
interface DropdownMenuItemProps
  extends RadixDropdownMenu.DropdownMenuItemProps {}
interface DropdownMenuContentProps
  extends RadixDropdownMenu.DropdownMenuContentProps {
  width?: number;
}

export const DropdownMenu = (props: DropdownMenuProps) => {
  return <RadixDropdownMenu.Root {...props} />;
};
export const DropdownMenuTrigger = (props: DropdownMenuTriggerProps) => {
  return <RadixDropdownMenu.Trigger {...props} asChild />;
};
export const DropdownMenuItem = (props: DropdownMenuItemProps) => {
  return <RadixDropdownMenu.Item {...props} asChild />;
};
export const DropdownMenuContent = (props: DropdownMenuContentProps) => {
  const { width } = props;
  const style = {
    ...(width && { width: `${width}px` }),
  };
  return (
    <RadixDropdownMenu.Portal>
      <RadixDropdownMenu.Content
        className="bg-white p-3 rounded-lg border drop-shadow-lg sm:w-52 z-40"
        sideOffset={8}
        side="bottom"
        align="end"
        alignOffset={-3}
        style={style}
        {...props}
      />
    </RadixDropdownMenu.Portal>
  );
};
