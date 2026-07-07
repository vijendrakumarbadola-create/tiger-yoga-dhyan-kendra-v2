import { NextResponse } from 'next/server'

const ROBOTS = `User-agent: *
Allow: /

Sitemap: https://www.tigerdhyankendra.in/sitemap.xml
`

export function GET() {
  return new NextResponse(ROBOTS, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
