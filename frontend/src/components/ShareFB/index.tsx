import React from 'react';
import { FacebookProvider, ShareButton } from 'react-facebook';

interface FacebookShareButtonProps {
  url: string;
}

const FacebookShareButton: React.FC<FacebookShareButtonProps> = ({ url }) => {
  return (
    <FacebookProvider appId='YOUR_APP_ID'>
      <ShareButton
        href={url}
        display='popup'
      >
        Share on Facebook
      </ShareButton>
    </FacebookProvider>
  );
};

export default FacebookShareButton;
