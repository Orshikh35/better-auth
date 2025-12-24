import { getServerSession } from '@/lib/server';
import { unauthorized } from 'next/navigation';
import React from 'react'

export default async function DashboardPage() {
    const session = await getServerSession();
    const user = session?.user;

    if (!user) unauthorized();
    return (
        <div>{user?.name}</div>
    )
}
