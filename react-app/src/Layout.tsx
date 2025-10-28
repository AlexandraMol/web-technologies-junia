import { Link, useRouterState } from '@tanstack/react-router'
import { Route as indexRoute } from './routes/index'
import { Route as aboutRoute } from './routes/about'
import { Route as booksRoute } from './routes/books'
import { Route as clientsRoute } from './routes/clients'
import { Route as authorsRoute } from './routes/authors'
import {
  App as AntdApp,
  Layout as AntLayout,
  Menu,
  type MenuProps,
  theme,
} from 'antd'
import {
  BookOutlined,
  HomeOutlined,
  InfoOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const { token } = theme.useToken()
  const routerState = useRouterState()
  const pathname = routerState.location.pathname

  const items: Required<MenuProps>['items'] = [
    {
      label: <Link to={indexRoute.to}>Home</Link>,
      key: 'home',
      icon: <HomeOutlined />,
    },
    {
      label: <Link to={clientsRoute.to}>Clients</Link>,
      key: 'clients',
      icon: <UserOutlined />,
    },
    {
      label: <Link to={booksRoute.to}>Books</Link>,
      key: 'books',
      icon: <BookOutlined />,
    },
    {
      label: <Link to={authorsRoute.to}>Authors</Link>,
      key: 'authors',
      icon: <TeamOutlined />,
    },
    {
      label: <Link to={aboutRoute.to}>About</Link>,
      key: 'about',
      icon: <InfoOutlined />,
    },
  ]

  const maxWidth = 1120

  return (
    <AntdApp>
      <AntLayout
        style={{
          minHeight: '100vh',
          background:
            'linear-gradient(180deg, rgba(249,251,255,1) 0%, rgba(242,246,255,1) 40%, rgba(238,244,255,1) 100%)',
        }}
      >
        <AntLayout.Header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 100,
            background: token.colorBgContainer,
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          }}
        >
          <div
            style={{
              margin: '0 auto',
              maxWidth,
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <strong style={{ fontSize: 16 }}>Babel&apos;s Library</strong>
            <span style={{ opacity: 0.5 }}>·</span>
            <Menu
              mode="horizontal"
              selectedKeys={[
                pathname === '/' ? '/' : `/${pathname.split('/')[1]}`,
              ]}
              items={items}
              style={{
                borderBottom: 'none',
                background: 'transparent',
                flex: 1,
              }}
            />
          </div>
        </AntLayout.Header>

        <AntLayout.Content style={{ padding: 24 }}>
          <div
            style={{
              margin: '0 auto',
              maxWidth,
            }}
          >
            {children}
          </div>
        </AntLayout.Content>
      </AntLayout>
    </AntdApp>
  )
}
