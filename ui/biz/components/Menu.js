import React, { PureComponent } from 'react'
import Link from 'next/link'

export default class MenuLayout extends PureComponent {
  render () {
    return (
      <ul>
        <li>
          <Link href='/dashboard'>dashboard</Link>
        </li>
        <li>
          <Link href='/voucher-management'>voucher management</Link>
        </li>
        <li>
          <Link href='/voucher-history'>voucher history</Link>
        </li>
      </ul>
    )
  }
}
