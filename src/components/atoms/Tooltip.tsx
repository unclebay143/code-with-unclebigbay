import * as RadixTooltip from '@radix-ui/react-tooltip';

type Props = { tooltip: string | null; children: React.ReactNode };

export const Tooltip = ({ tooltip, children }: Props) => {
  if (!tooltip) return children;
  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            className="z-[999999] rounded-md px-3 py-2 text-xs text-white bg-slate-900"
            sideOffset={5}
          >
            {tooltip}
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
};
