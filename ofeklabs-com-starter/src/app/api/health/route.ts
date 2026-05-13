import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * Health check endpoint for monitoring and orchestration.
 * Returns service status and basic diagnostics.
 */
export async function GET() {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '0.1.0',
    environment: process.env.NODE_ENV || 'development',
    services: {
      sanity: {
        configured: Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'placeholder'),
      },
    },
  };

  return NextResponse.json(health, { status: 200 });
}
