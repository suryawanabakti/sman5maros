import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Award, BookOpen, Briefcase, FileOutput, Folder, LayoutGrid, List, Users2 } from 'lucide-react';
import AppLogo from './app-logo';

const allNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Alumni',
        url: '/admin/alumni',
        icon: Users2,
    },
    {
        title: 'Beasiswa',
        url: '/admin/beasiswa',
        icon: Award,
    },
    {
        title: 'Lowongan Pekerjaan',
        url: '/admin/lowongan',
        icon: Briefcase,
    },
    {
        title: 'Siswa',
        url: '/admin/users',
        icon: Users2,
    },
    {
        title: 'Ekstrakurikuler',
        url: '/admin/ekstrakurikuler',
        icon: BookOpen,
    },
    {
        title: 'Laporan Kuesioner',
        url: '/admin/kuesioner/report',
        icon: FileOutput,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        url: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        url: 'https://laravel.com/docs/starter-kits',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    // Get the authenticated user from Inertia shared props
    const { auth } = usePage().props as any;

    const user = auth?.user;

    // Items that non-admin users can see
    const restrictedNavItems: NavItem[] = [
        {
            title: 'Ekstrakurikuler',
            url: '/admin/ekstrakurikuler/' + user.ekstrakurikuler?.id,
            icon: List,
        },
    ];

    // Check if the user is admin@gmail.com or has admin role
    const isAdmin = user?.email === 'admin@gmail.com' || user?.role === 'admin';
    const isHaveEkstrakurikuler = user.ekstrakurikuler;
    // Use all nav items for admin, restricted items for others
    const mainNavItems = !isHaveEkstrakurikuler || isAdmin ? allNavItems : restrictedNavItems;

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto hidden" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
