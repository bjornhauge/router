import * as React from 'react'
import { Link, Outlet, useMatch } from '@tanstack/react-router'
import { fetchInvoices } from '../../mockTodos'
import { rootRoute } from '../__root'

export const dashboardRoute = rootRoute.createRoute({
  path: 'dashboard',
  component: Dashboard,
  loader: async () => {
    console.log('Fetching all invoices...')
    return {
      invoices: await fetchInvoices(),
    }
  },
})

function Dashboard() {
  return (
    <>
      <div className="flex items-center border-b">
        <h2 className="text-xl p-2">Dashboard</h2>
        <Link
          to="/dashboard/invoices/$invoiceId"
          params={{
            invoiceId: 3,
          }}
          className="py-1 px-2 text-xs bg-blue-500 text-white rounded-full"
        >
          1 New Invoice
        </Link>
      </div>
      <div className="flex flex-wrap divide-x">
        {(
          [
            ['/dashboard', 'Summary', undefined, true],
            ['/dashboard/invoices', 'Invoices'],
            ['/dashboard/users', 'Users', true],
          ] as const
        ).map(([to, label, search, exact]) => {
          return (
            <Link
              key={to}
              to={to}
              search={search}
              activeOptions={{ exact }}
              activeProps={{ className: `font-bold` }}
              className="p-2"
            >
              {label}
            </Link>
          )
        })}
      </div>
      <hr />
      <Outlet />
    </>
  )
}
