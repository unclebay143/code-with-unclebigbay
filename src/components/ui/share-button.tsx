import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItemLink,
  DropdownMenuTrigger,
  DropdownMenuItemButton,
  BrandXTwitter,
  Linkedin,
  Copy,
  BrandWhatsapp,
  Share,
} from '@hashnode/matrix-ui';
import { useCallback } from 'react';
import { toast } from 'sonner';

type Props = {
  copy: string;
  slug?: string;
  placeholder?: string;
  size?: 'xs' | 'sm';
};

export const ShareButton = ({
  copy,
  slug,
  placeholder,
  size = 'sm',
}: Props) => {
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(copy).then(() => {
      toast.success('Course details copied to clipboard.');
    });
  }, [copy]);

  return (
    <DropdownMenu>
      <div>
        <DropdownMenuTrigger asChild>
          <Button size={size} appearance="secondary-slate" startIcon={Share}>
            {placeholder || 'Share'}
          </Button>
        </DropdownMenuTrigger>
      </div>
      <DropdownMenuContent hideWhenDetached sideOffset={8} align="start">
        <DropdownMenuItemLink
          startIcon={BrandXTwitter}
          text="Twitter(X)"
          href={`https://x.com/intent/tweet?text=${encodeURIComponent(copy)}`}
          target="_blank"
          rel="noopener"
        />
        {slug && (
          <DropdownMenuItemLink
            startIcon={Linkedin}
            text="LinkedIn"
            href={`https://www.linkedin.com/sharing/share-offsite/?url=https://www.codewithunclebigbay.com/courses/${slug}`}
            target="_blank"
            rel="noopener"
          />
        )}

        <DropdownMenuItemLink
          startIcon={BrandWhatsapp}
          text="WhatsApp"
          href={`https://wa.me/?text=${encodeURIComponent(copy)}`}
          target="_blank"
          rel="noopener"
        />

        <DropdownMenuItemButton
          startIcon={Copy}
          text="Copy Link"
          onClick={handleCopy}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
