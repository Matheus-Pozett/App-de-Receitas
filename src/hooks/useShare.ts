import { useState } from 'react';

export function useShare() {
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  const handleShare = (url: string) => {
    navigator.clipboard.writeText(url)
      .then(() => {
        setIsLinkCopied(true);
        setTimeout(() => {
          setIsLinkCopied(false);
        }, 2000);
      })
      .catch((err) => {
        console.error('Falha ao copiar o link: ', err);
      });
  };
  return { isLinkCopied, handleShare };
}
