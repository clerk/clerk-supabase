import '../styles/globals.css'
import GithubLink from '../components/clerk/GithubLink.tsx'
import { ClerkProvider } from '@clerk/nextjs'

function ClerkSupabaseApp({ Component, pageProps }) {
  return (
    <ClerkProvider>
      <Component {...pageProps} />
      <footer>
        <GithubLink
          label="'Clerk+Supabase' showcases Clerk components w/ a Supabase backend"
          repoLink="https://github.com/clerkinc/clerk-supabase"
        />
      </footer>
    </ClerkProvider>
  )
}

export default ClerkSupabaseApp
