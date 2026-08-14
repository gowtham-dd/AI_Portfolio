'use client';
import { useState, useEffect } from 'react';

export default function GitHubStatsCard({ type = 'top-langs', maxWidth = '380px' }) {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const checkTheme = () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      setTheme(current);
    };
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const isLight = theme === 'light';

  // Match exact container background: 18181b in dark mode, ffffff in light mode
  const bgColor = isLight ? 'ffffff' : '18181b';
  const titleColor = isLight ? '2563eb' : '00d4ff';
  const textColor = isLight ? '475569' : '94a3b8';
  const iconColor = isLight ? '2563eb' : '00d4ff';

  let src = '';
  if (type === 'top-langs') {
    src = `https://github-readme-stats.vercel.app/api/top-langs/?username=gowtham-dd&layout=compact&theme=radical&hide_border=true&bg_color=${bgColor}&title_color=${titleColor}&text_color=${textColor}&border_radius=8`;
  } else if (type === 'stats') {
    src = `https://github-readme-stats.vercel.app/api?username=gowtham-dd&show_icons=true&theme=radical&hide_border=true&bg_color=${bgColor}&title_color=${titleColor}&text_color=${textColor}&icon_color=${iconColor}&border_radius=8&include_all_commits=true`;
  } else if (type === 'streak') {
    const fire = isLight ? 'ea580c' : 'ff6b35';
    const extra = isLight ? '&dates=475569&sideLabels=475569&sideNums=0f172a&currStreakNum=0f172a' : '';
    src = `https://github-readme-streak-stats.herokuapp.com?user=gowtham-dd&theme=radical&hide_border=true&background=${bgColor}&ring=${titleColor}&fire=${fire}&currStreakLabel=${titleColor}&border_radius=8${extra}`;
  }

  return (
    <img
      src={src}
      alt="GitHub Stats"
      style={{ maxWidth, width: '100%', borderRadius: '8px', marginTop: '12px' }}
      onError={(e) => {
        e.currentTarget.style.display = 'none';
      }}
    />
  );
}
