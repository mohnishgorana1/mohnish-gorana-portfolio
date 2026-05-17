import BentoGridOne from '@/components/designs/bento-grid/bentogrid-one/BentoGridOne'
import React from 'react'

function BentoGridDesignPage() {
  return (
    <main className='my-12'>
        <h1 className='text-4xl font-bold text-center my-4'>Bento Grid Designs</h1>
        <section className="w-full h-full">
            <BentoGridOne   />
        </section>
    </main>
  )
}

export default BentoGridDesignPage