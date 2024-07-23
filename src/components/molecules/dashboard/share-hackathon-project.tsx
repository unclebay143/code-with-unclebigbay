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
  PhoneMobile,
  Share,
} from '@hashnode/matrix-ui';
import { useCallback } from 'react';
import { toast } from 'sonner';

type Props = {
  slug: String;
  authorUserName: String;
  currentLoggedInUserName: String | undefined;
};

export const ShareHackathonButton = ({
  slug,
  authorUserName,
  currentLoggedInUserName,
}: Props) => {
  const hackathonUrl = `https://www.codewithunclebigbay.com/dashboard/hackathons/${slug}/submissions`;

  const socialMessage =
    authorUserName === currentLoggedInUserName
      ? `🎉 I am glad to share my just concluded project at ${hackathonUrl}, hackathon... #codewithunclebigbay`
      : `Check out this awesome project from the hackathon at ${hackathonUrl} #codewithunclebigbay`;

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(socialMessage).then(() => {
      toast.success('Link copied to clipboard.');
    });
  }, [socialMessage]);

  return (
    <section>
      <DropdownMenu>
        <div>
          <DropdownMenuTrigger asChild>
            <Button size="sm" appearance="secondary-slate" startIcon={Share}>
              Share project
            </Button>
          </DropdownMenuTrigger>
        </div>
        <DropdownMenuContent hideWhenDetached sideOffset={8} align="start">
          <DropdownMenuItemLink
            startIcon={PhoneMobile}
            text="WhatsApp"
            href={`https://wa.me/?text=${encodeURIComponent(socialMessage)}`}
            target="_blank"
            rel="noopener"
          />

          <DropdownMenuItemLink
            startIcon={BrandXTwitter}
            text="Twitter(X)"
            href={`https://x.com/intent/tweet?text=${encodeURIComponent(socialMessage)}`}
            target="_blank"
            rel="noopener"
          />
          <DropdownMenuItemLink
            startIcon={Linkedin}
            text="LinkedIn"
            href={`https://www.linkedin.com/sharing/share-offsite/?url=https://www.codewithunclebigbay.com/dashboard/hackathon}`}
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
    </section>
  );
};
