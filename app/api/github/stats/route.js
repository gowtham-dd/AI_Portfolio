import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://api.github.com/users/gowtham-dd', {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'Gowtham-Portfolio-App'
      },
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const gh = await res.json();
      if (gh && gh.public_repos !== undefined) {
        return NextResponse.json({
          public_repos: gh.public_repos || 77,
          followers: gh.followers || 16,
          following: gh.following || 7,
          avatar_url: gh.avatar_url || 'https://avatars.githubusercontent.com/u/158311426?v=4',
          bio: gh.bio || '',
          name: gh.name || 'Gowtham D',
        });
      }
    }
  } catch (e) {
    console.error('GitHub stats error:', e);
  }
  return NextResponse.json({
    public_repos: 77,
    followers: 16,
    following: 7,
    avatar_url: 'https://avatars.githubusercontent.com/u/158311426?v=4',
    bio: 'AI Engineer building Agentic AI systems & MLOps pipelines',
    name: 'Gowtham D',
  });
}
