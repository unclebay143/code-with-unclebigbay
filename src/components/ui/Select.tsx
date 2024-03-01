import { FC, forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import * as RadixSelect from '@radix-ui/react-select';
import { Check, ChevronDown } from 'lucide-react';
import { MenuItemProps } from '@radix-ui/react-dropdown-menu';

export interface SelectProps extends RadixSelect.SelectProps {}
export interface SelectItemProps extends RadixSelect.SelectItemProps {
  label: string;
  startIcon?: any;
}
export interface SelectContentProps extends RadixSelect.SelectContentProps {}
export interface SelectMenuItemProps extends MenuItemProps {}

export interface SelectTriggerProps extends RadixSelect.SelectTriggerProps {
  label?: string;
  startIcon?: any;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  shape?: 'rectangle' | 'pill' | 'md-rectangle';
  borderless?: boolean;
  placeholder?: string;
}

export interface SelectViewPortProps extends RadixSelect.SelectViewportProps {
  width?: number;
}

export const menuItem = cva(
  'w-full py-2 px-4 hover:bg-slate-100 disabled:cursor-not-allowed text-base sm:text-sm dark:hover:bg-slate-800',
);

const selectTrigger = cva(
  `
  w-full h-full flex items-center justify-between 
  text-sm text-slate-600 dark:text-slate-300
   hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-900
   border-slate-200 dark:border-slate-800
  hover:border-slate-300 dark:hover:border-slate-700
  focus:outline-none focus:border-slate-300 dark:focus:border-slate-700

  `,
  {
    variants: {
      size: {
        xs: ['p-1', 'text-xs'],
        sm: ['py-1.5', 'px-2', 'gap-[2px]'],
        md: ['p-2', 'gap-1'],
        lg: ['p-3', 'text-base', 'gap-1'],
      },
      shape: {
        rectangle: ['rounded-xl'],
        'md-rectangle': ['rounded-md'],
        pill: ['rounded-full'],
      },
      border: {
        none: ['border-transparent hover:border'],
        visible: ['border'],
      },
    },
    defaultVariants: {
      size: 'md',
      shape: 'rectangle',
      border: 'visible',
    },
  },
);

const selectViewport = cva(
  `
  flex flex-col gap-2 
  py-2 
  bg-white dark:bg-slate-950
  rounded-xl shadow-xl 
  outline-none border border-slate-200 dark:border-slate-800/80
  max-h-[var(--radix-select-content-available-height)]
  `,
);

const selectItem = cva([
  menuItem({ className: 'dark:hover:bg-slate-800' }),
  `
  flex items-center justify-between 
  text-slate-500 dark:text-slate-400 
  focus:outline-none focus:bg-slate-100 dark:focus:bg-slate-800
  cursor-default
  `,
]);

const selectIcon = cva('text-slate-500 dark:text-slate-400');

export const Select: FC<SelectProps> = ({ ...props }) => {
  return <RadixSelect.Root {...props} />;
};

export const SelectTrigger: FC<SelectTriggerProps> = (props) => {
  const {
    placeholder = 'Select',
    shape,
    size = 'md',
    borderless,
    startIcon: StartIcon,
    ...restOfTheProps
  } = props;

  const mapIconSize: {
    xs: '16';
    sm: '24';
    md: '18';
    lg: '40';
  } = {
    xs: '16',
    sm: '24',
    md: '18',
    lg: '40',
  };

  return (
    <RadixSelect.Trigger
      className={selectTrigger({
        size,
        shape,
        border: borderless ? 'none' : 'visible',
      })}
      {...restOfTheProps}
    >
      {StartIcon && (
        <RadixSelect.Icon className={selectIcon()}>
          <StartIcon size={mapIconSize[size]} />
        </RadixSelect.Icon>
      )}
      <div className="px-1 truncate">
        <RadixSelect.Value placeholder={placeholder} />
      </div>
      <RadixSelect.Icon className={selectIcon()}>
        <ChevronDown size={mapIconSize[size]} />
      </RadixSelect.Icon>
    </RadixSelect.Trigger>
  );
};

export const SelectContent: FC<SelectContentProps> = (
  props: SelectContentProps,
) => {
  return (
    <RadixSelect.Portal>
      <RadixSelect.Content
        {...props}
        sideOffset={8}
        className="z-[9999] w-[var(--radix-select-trigger-width)]"
        position="popper"
      />
    </RadixSelect.Portal>
  );
};

export const SelectViewPort: FC<SelectViewPortProps> = ({
  width,
  ...restOfTheProps
}) => {
  const style = {
    ...(width && { width: `${width}px` }),
  };
  return (
    <RadixSelect.SelectViewport
      style={style}
      className={selectViewport()}
      {...restOfTheProps}
    />
  );
};

export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ label, startIcon: StartIcon, ...restOfTheProps }, forwardedRef) => {
    return (
      <RadixSelect.Item
        {...restOfTheProps}
        ref={forwardedRef}
        className={selectItem()}
      >
        <div className="flex items-center gap-x-2 w-full overflow-hidden">
          {StartIcon && (
            <RadixSelect.Icon className={selectIcon()}>
              <StartIcon size={16} />
            </RadixSelect.Icon>
          )}

          <div className="truncate">
            <RadixSelect.ItemText>{label}</RadixSelect.ItemText>
          </div>
        </div>

        <RadixSelect.ItemIndicator className="text-blue-600">
          <Check size={16} />
        </RadixSelect.ItemIndicator>
      </RadixSelect.Item>
    );
  },
);

SelectItem.displayName = 'SelectItem';
