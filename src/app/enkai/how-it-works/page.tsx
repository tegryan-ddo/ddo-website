import { Metadata } from 'next'
import EnkaiHowItWorksClient from './EnkaiHowItWorksClient'

export const metadata: Metadata = {
  title: 'How Enkai Works | Request Features in Slack, Get PRs in GitHub',
  description: 'Request features in Slack. Review a PR in GitHub. Ship enterprise-ready Next.js apps without the usual overhead.',
  openGraph: {
    title: 'How Enkai Works',
    description: 'Request features in Slack. Review a PR in GitHub. Ship enterprise-ready Next.js apps without the usual overhead.',
  },
}

export default function EnkaiHowItWorksPage() {
  return <EnkaiHowItWorksClient />
}
