import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItemLink,
  DropdownMenuTrigger,
  BrandXTwitter,
  Linkedin,
  Copy,
  PhoneMobile,
} from '@hashnode/matrix-ui';
import { useCallback } from 'react';
import { toast } from 'sonner';

type Props = {
  title: String;
  isEnrolled: Boolean;
};

export const ShareButton = ({ title, isEnrolled }: Props) => {
  const courseTitle = encodeURIComponent(title as string);
  const webUrl = `https://www.codewithunclebigbay.com/courses/${courseTitle}`;

  const enrolledMessage = `🎉 Just enrolled in an amazing course, '${title}', on CodeWithUnclebigbay! Can't wait to dive in and start learning.\nJoin me! ${webUrl} #codewithunclebigbay`;
  const notEnrolledMessage = `📚 Excited to share this fantastic course, '${title}', I found on CodeWithUnclebigbay! It's packed with valuable insights and knowledge.\nCheck it out! ${webUrl} #codewithunclebigbay`;
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
          />

          <DropdownMenuItemLink
            startIcon={BrandXTwitter}
            text="Twitter(X)"
            href={`https://x.com/intent/tweet?text=${encodeURIComponent(detailsToCopy)}`}
          />
          <DropdownMenuItemLink
            startIcon={Linkedin}
            text="LinkedIn"
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${webUrl}&title=${encodeURIComponent(detailsToCopy)}`}
          />
          <DropdownMenuItemLink
            startIcon={Copy}
            text="Copy Link"
            onClick={handleCopy}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
  );
};
