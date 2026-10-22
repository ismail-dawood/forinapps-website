import { Compass, PenTool, Code2, Bug, Rocket, LifeBuoy ,TrendingUp} from 'lucide-react'

export const steps = [
  {
    icon: Compass,
    title: 'Scoping',
    participants: ['Product manager', 'Software engineer'],
    desc: " Before a single line of code is written, we work closely with you to understand your business goals, core features, target audience, and any third-party tools your product needs to work with. This lets our product managers guide the team in building a Mobile App & System that actually aligns with what your business is trying to achieve, not just what's on a spec sheet. We will create and provide you detailed scope document along with a Cost estimate, and a Timeline with milestone breakdowns, so you know exactly what you're getting and when.",
  },
  {
    icon: PenTool,
    title: 'Design',
    participants: ['Product manager', 'UI/UX designer'],
    desc: "Our product managers and UI/UX designers collaborate to turn your vision into an intuitive prototype and interface design, one that's built around how your users will actually interact with the product, not just how it looks in a mockup. Nothing moves into development until you've reviewed and approved the design, so there are no surprises later.",
  },
  {
    icon: Code2,
    title: 'Develop',
    participants: ['Product manager', 'Software engineer', 'UI/UX designer'],
    desc: "Our engineers turn approved prototypes into interactive, responsive interfaces your users will enjoy using. At the same time, we will build a secure, high-performance server infrastructure to handle data storage, authentication, and everything running behind the scenes. Front-end and back-end work in parallel, so your product comes together faster without cutting corners.",
  },
  {
    icon: Bug,
    title: 'Test',
    participants: ['Software engineer', 'QA engineer'],
    desc: "Once development wraps, our engineers run comprehensive functional, compatibility, and performance testing across devices and environments. We don't just find issues, we fix and retest until your product delivers a smooth, reliable experience everywhere your users will actually use it.",
  },
  {
    icon: Rocket,
    title: 'Deploy',
    participants: ['Software engineer'],
    desc: "We set up production server infrastructure, manage hosting, and take care of the entire deployment process so your launch goes smoothly. And because it's your product, you get full ownership all source code, assets, and documentation are handed over, with nothing locked behind us.",
  },
  {
    icon: LifeBuoy,
    title: 'Support',
    participants: ['Product manager', 'Software engineer'],
    desc: "Our collaboration doesn't end at deployment. We monitor performance, gather real user feedback, analyse usage data, fix bugs, and ship new features and updates, keeping your product reliable and improving long after day one.",
  },
    {
     icon: TrendingUp,
     title: 'Growth & Marketing',
     participants: [ 'Marketing specialist'],
     desc: "A great product still needs the right people to find it. Our growth and marketing support helps turn your launch into ongoing traction: app store optimization (ASO) and SEO to improve visibility, performance tracking and analytics to understand user behaviour, and data-informed recommendations on features, campaigns, and channels that drive real growth. Think of it as the natural extension of Support, instead of just keeping your product running, we help it reach more of the right users over time.",
   },
]
