import { NextResponse } from 'next/server';
import portfolioData from '@/data/portfolio.json';

export async function generateStaticParams() {
  return portfolioData.projects.map((p) => ({ id: p.id }));
}

export async function GET(request, { params }) {
  const { id } = params;
  const project = portfolioData.projects.find((p) => p.id === id);
  if (!project) {
    return NextResponse.json({ detail: 'Project not found' }, { status: 404 });
  }
  return NextResponse.json(project);
}
