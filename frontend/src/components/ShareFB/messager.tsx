import React, { useEffect } from 'react';

interface FacebookChatboxProps {
  pageId: string;
}

const FacebookChatbox: React.FC<FacebookChatboxProps> = ({ pageId }) => {
  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        xfbml: true,
        version: 'v12.0',
      });
    };

    (function (d, s, id) {
      let js = undefined;
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s) as HTMLScriptElement;
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
      fjs.parentNode?.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }, []);

  return (
    <div>
      <div
        className='fb-customerchat'
        data-page_id={pageId}
        data-theme_color='#0084FF'
      ></div>
    </div>
  );
};

export default FacebookChatbox;
