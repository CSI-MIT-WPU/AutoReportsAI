import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function Templates() {
  return (
    <div>
        <Button>
            <Link href="/templates/create-template">
            Create Template
            </Link>
        </Button>
    </div>
  )
}
