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
} from '@hashnode/matrix-ui';
import { useCallback } from 'react';
import { toast } from 'sonner';

type Props = {
  slug: String;
  isEnrolled: Boolean;
};

export const ShareButton = ({ slug, isEnrolled }: Props) => {
  const courseUrl = `https://www.codewithunclebigbay.com/courses/${slug}`;

  const enrolledMessage = `🎉 Just enrolled in an amazing course, '${slug}', on CodeWithUnclebigbay! Can't wait to dive in and start learning.\nJoin me! ${courseUrl} #codewithunclebigbay`;
  const notEnrolledMessage = `📚 Excited to share this fantastic course, '${slug}', I found on CodeWithUnclebigbay! It's packed with valuable insights and knowledge.\nCheck it out! ${courseUrl} #codewithunclebigbay`;
  const detailsToCopy = isEnrolled ? enrolledMessage : notEnrolledMessage;

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(detailsToCopy).then(() => {
      toast.success('Course details copied to clipboard.');
    });
  }, [detailsToCopy]);

  return (
    <section>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm" appearance="secondary-slate">
            Share Course
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent hideWhenDetached sideOffset={8} align="start">
          <DropdownMenuItemLink
            startIcon={PhoneMobile}
            text="WhatsApp"
            href={`https://wa.me/?text=${encodeURIComponent(detailsToCopy)}`}
            target="_blank"
            rel="noopener"
          />

          <DropdownMenuItemLink
            startIcon={BrandXTwitter}
            text="Twitter(X)"
            href={`https://x.com/intent/tweet?text=${encodeURIComponent(detailsToCopy)}`}
            target="_blank"
            rel="noopener"
          />
          <DropdownMenuItemLink
            startIcon={Linkedin}
            text="LinkedIn"
            href={`https://www.linkedin.com/sharing/share-offsite/?url=https://www.codewithunclebigbay.com/dashboard/courses/${slug}`}
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
