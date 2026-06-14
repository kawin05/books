import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  // Allow MDX files to import React components from anywhere
  experimental: {
    mdxRs: false, // Use the JS-based MDX compiler (more stable with custom components)
  },
}

const withMDX = createMDX({
  // Add MDX plugins here as needed (remarkGfm, rehypeSlug, etc.)
})

export default withMDX(nextConfig)
