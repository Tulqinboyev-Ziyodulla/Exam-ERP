import { Tooltip } from '@mui/material'
import {
	Bell,
	CalendarClock,
	LogOut,
	ReceiptText,
	Search,
	Settings,
	Users,
} from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Logo, LogoDark } from '../assets'
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarTrigger,
} from '../components/ui/sidebar'
import FullscreenToggle from './FullscreenToggle'
import NotificationPanel from './NotificationPanel'
import SearchInput from './SearchInput'
import ToggleMode from './ToggleMode'
interface Props {
	onSidebarToggle?: (collapsed: boolean) => void
}
export function AppSidebar({ onSidebarToggle }: Props) {
	const [isCollapsed, setIsCollapsed] = useState(false)

	const items = [
		{ title: 'Xodimlar ro`yxati', url: '/employee', icon: ReceiptText },
		{ title: 'Mijozlar', url: '/clients', icon: Users },
		{ title: 'Qidiruv', url: '/', icon: Search },
		{ title: 'Smenalar', url: '/shifts', icon: CalendarClock },
		{ title: 'Sozlamalar', url: '/', icon: Settings },
	]

	const toggleSidebar = () => {
		const newState = !isCollapsed
		setIsCollapsed(newState)

		if (onSidebarToggle) {
			onSidebarToggle(newState)
		}
	}

	const [notifOpen, setNotifOpen] = useState(false)

	return (
		<div>
			<nav
				className={`fixed m-2 top-0 right-0 py-1 z-50 bg-sidebar border rounded-md transition-all duration-300 ease-in-out
				${isCollapsed ? 'w-[calc(100vw-100px)]' : 'w-[calc(100vw-291px)]'}`}
			>
				<div className='px-3 py-3 lg:px-5 lg:pl-3'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center'>
							<img
								src={Logo}
								alt='logo'
								className='hidden dark:block'
							/>
							<img
								src={LogoDark}
								alt='darklogo'
								className='block dark:hidden'
							/>
						</div>

						<div>
							<SearchInput />
						</div>

						<div className='flex items-center gap-2'>
							<Tooltip title='Sidebar' placement='bottom'>
								<div
									onClick={toggleSidebar}
									className='cursor-pointer'
								>
									<SidebarTrigger className='cursor-pointer' />
								</div>
							</Tooltip>

							<Tooltip title='To`liq ekran' placement='bottom'>
								<div>
									<FullscreenToggle />
								</div>
							</Tooltip>

							<div>
								<ToggleMode />
							</div>

							<Tooltip
								title='Bildirishnomalar'
								placement='bottom'
							>
								<button
									onClick={() => setNotifOpen(true)}
									className='relative p-1 hover:bg-muted rounded-md cursor-pointer'
								>
									<Bell className='w-4 h-4 stroke-[1.5]' />
									<span className='absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full' />
								</button>
							</Tooltip>

							<Tooltip title='Profil' placement='bottom'>
								<Link to={'/'}>
									<img
										className='w-10 h-10 border rounded-full cursor-pointer'
										src='/src/assets/images/user.jpg'
										alt='user photo'
									/>
								</Link>
							</Tooltip>
						</div>
					</div>
				</div>

				<NotificationPanel
					isOpen={notifOpen}
					onClose={() => setNotifOpen(false)}
				/>
			</nav>

			<Sidebar
				className={`fixed m-2 rounded-md border border-gray-400/20 overflow-hidden top-0 left-0 h-[calc(100vh-15px)] transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'
					}`}
			>
				<SidebarContent>
					<SidebarGroup>
						<SidebarGroupLabel
							className={
								isCollapsed ? 'opacity-0' : 'opacity-100'
							}
						>
							Sahifalar
						</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{items.map(item => (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton asChild>
											<Link
												to={item.url}
												className={`flex items-center p-2 rounded-lg hover:bg-gray-100 w-full ${isCollapsed
														? 'justify-center'
														: ''
													}`}
											>
												<item.icon className='w-5 h-5 text-gray-500 flex-shrink-0' />
												<span
													className={`ml-3 ${isCollapsed
															? 'hidden'
															: 'block'
														}`}
												>
													{item.title}
												</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
					<div
						className={`absolute bottom-4 left-0 w-full px-6 border-t pt-3 flex items-center gap-4 ${isCollapsed ? 'hidden' : 'justify-center'
							}`}
					>
						<Link to={'/login'}>
							<button className='flex items-center gap-2 px-3  bg-sidebar cursor-pointer   dark:text-gray-400 rounded dark:hover:text-white  transition-colors'>
								<LogOut className='h-4 w-4' />
								<span>Sign out</span>
							</button>
						</Link>
					</div>
				</SidebarContent>
			</Sidebar>
		</div>
	)
}
