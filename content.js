// All site copy and data in one place.
// Facts here come from thanishprotosem.framer.website, the IoT asset zip, and Thanish's own project notes.
// Where something is unknown it is left out. Edit `credit` lines to set authorship on team builds.

const F = (id, ext = 'jpg') => `https://framerusercontent.com/images/${id}.${ext}?scale-down-to=1600`

export const person = {
  name: 'Thanish Thahir',
  short: 'Thanish',
  roles: ['Designer', 'Engineer', 'Prototyper'],
  tagline:
    'Designing for humans — clear product ideas and visual systems that feel intentional, usable, and grounded in real everyday experiences.',
  based: 'Based in India',
  email: 'thanishthahir@outlook.com',
  phone: '+91 63690 00544',
  phoneHref: 'tel:+916369000544',
  portrait: F('SzGYMPYmGng2GSCkfN3dP2marpk'),
  cv: 'https://framerusercontent.com/assets/wAwgUiOS1ggFvjEg4Tc8oBAQ6kw.pdf',
  socials: [
    { label: 'X', handle: '@stkchs', href: 'https://x.com/stkchs' },
    { label: 'Instagram', handle: '@stkchs', href: 'https://www.instagram.com/stkchs/' },
    { label: 'Nothing Community', handle: 'stkchs', href: 'https://nothing.community/u/stkchs' },
  ],
}

const W = 'https://thanishprotosem.framer.website/work/'

// Selected design work, curated from the Framer portfolio. `layout` picks the editorial treatment.
export const work = [
  {
    id: 'nothing-os',
    title: 'Making Nothing OS Better',
    summary: 'A collection of interface concepts that rethink everyday moments in Nothing OS.',
    category: 'Interface concepts',
    context: 'Personal',
    role: 'Concept & UI design',
    year: '2025',
    stack: 'Figma · Framer',
    image: F('Z3eSmalui1Uf2Ddt7a3EK90isY'),
    ratio: '16 / 9',
    href: W + 'making-nothing-os-better',
    layout: 'feature',
  },
  {
    id: 'camera',
    title: 'Redesigned Camera UI',
    summary: 'A camera interface built for speed: clearer controls, less clutter, more attention on the shot.',
    category: 'Interface redesign',
    context: 'Nothing',
    role: 'Concept & UI design',
    year: '2025',
    stack: 'Figma',
    image: F('V4ZhK41NI5sVP0Qpv2Z5B0MvOc'),
    ratio: '4 / 3',
    href: W + 'redesigned-camera-ui',
    layout: 'pair',
  },
  {
    id: 'community',
    title: 'Redesigning Community WebPage',
    summary: 'A clearer structure for the Nothing community site, so discussions are easier to follow and join.',
    category: 'Web redesign',
    context: 'Nothing',
    role: 'Concept & web design',
    year: '2025',
    stack: 'Figma · Framer',
    image: F('wgm6TWB2417UGWPEqxlgHJLkRN8'),
    ratio: '4 / 3',
    href: W + 'redesigning-nothing-community-webpage',
    layout: 'pair',
  },
  {
    id: 'sneaker',
    title: 'Sneaker Design',
    summary:
      'An entry for the Gully Labs × CMF by Nothing contest, telling a cultural story through minimal form, material and colour.',
    category: 'Product · CMF',
    context: 'CMF × Gully Labs',
    role: 'Product & CMF design',
    year: '2025',
    stack: 'Concept · CMF',
    image: F('qRLVlJfrJYCOAIlOxN9jHxXiJ9U'),
    ratio: '1 / 1',
    href: W + 'sneaker-design',
    layout: 'split',
  },
  {
    id: 'bravo',
    title: 'Project Bravo',
    summary: 'A conceptual campaign for the Nothing community website, telling the product story through light and motion.',
    category: 'Marketing campaign',
    context: 'Nothing',
    role: 'Campaign & visual design',
    year: '2025',
    stack: 'Visual · Motion',
    image: F('gsrUJ04p8GgPXcsTcL8ZQmQcrY'),
    ratio: '4 / 3',
    href: W + 'project-bravo',
    layout: 'split-r',
  },
]

export const comingSoon = {
  title: 'Seven Pro',
  note: 'Design book (2)',
  when: 'Coming soon',
  context: 'Nothing',
  image: F('te9zHFndWkNkupev4bT5ig602cM'),
  href: W + 'seven-pro',
}

// Hardware / IoT. Lead case study first, then a second editorial project, then compact builds.
export const hardware = {
  intro:
    'Sensors, microcontrollers and the dashboards that make them legible — from a web page served off a chip to a cloud database with exportable history.',
  builds: [
    {
      id: 'feed-iq',
      title: 'Feed IQ',
      line: 'A handheld probe for rapid silage and feed quality testing, built for dairy farmers.',
      context: 'Smart India Hackathon 2026 · Team X',
      status: 'In progress',
      stack: 'XIAO ESP32-S3 · 3D-printed enclosure · Live dashboard · Extra Trees + SHAP',
      facts: [
        ['Problem', 'SIH26111'],
        ['Hardware', 'Probe prototype, 3D-printed shell'],
        ['App', 'English · Tamil · Hindi'],
      ],
    },
    {
      id: 'soilsense',
      title: 'SoilSense Pro',
      line: 'A soil station that reads seven values from one probe and a spectral sensor, over RS485.',
      context: 'Smart soil monitoring',
      status: 'Dashboard live',
      stack: 'XIAO ESP32-S3 Sense · JXBS-3001-TR · AS7341 · Modbus RTU',
      facts: [
        ['Reads', 'N · P · K · moisture · temp · pH · EC'],
        ['Bus', 'RS485, 9600 8N1'],
        ['Dashboard', 'Netlify'],
      ],
      href: 'https://rainbow-meerkat-f3ba6b.netlify.app',
    },
    {
      id: 'ir',
      title: 'IR Obstacle Sensing',
      line: 'An infrared module wired to a microcontroller on a breadboard, reporting obstacles over serial.',
      context: 'Bench experiment',
      status: 'Prototype',
      stack: 'IR module · breadboard · serial monitor',
      facts: [],
      video: { src: 'media/bench-ir-sensor.mp4', poster: 'media/bench-ir-sensor.jpg', ratio: '848 / 480' },
    },
  ],
}

// Protosem at Forge — the weekly log from the Framer site. Order is real (weeks).
export const protosem = [
  { w: '00', t: 'Perspectives', d: 'Self-evaluation, a comic on beating procrastination, and the Marshmallow Challenge as a first rapid prototype.' },
  { w: '01', t: '5S & the web', d: 'A 5S sort of the hardware bench, and the first version of this portfolio, built to document the work.' },
  { w: '02', t: 'Paradigms', d: 'Flowcharts, Python and OOP, interactive builds in Scratch and MIT App Inventor, IDEO-style design thinking.' },
  { w: '03', t: 'Electronics & 3D', d: 'Components and circuits, a clay tool kit recreated and extended in Fusion 360, a paper rocket challenge.' },
  { w: '04', t: 'Fabrication', d: 'Joints, assemblies and animation in Fusion 360; image-to-DXF for laser cutting in RDWorks; 3D printing in Bambu Studio.' },
]

export const capabilities = [
  { t: 'Product & interface concepts', d: 'From an early idea to refined flows, with usability deciding the details.', image: F('aX7eAsqc7bj2i8ScAIUevsnYA3Y') },
  { t: 'Visual systems', d: 'Structure through layout, typography, motion and interaction.', image: F('Iuyl1SqxQeTAVdXanlEkAbWOVMo') },
  { t: 'Prototyping & hardware', d: 'Sensors, microcontrollers, CAD and fabrication — ideas you can hold and test.', image: 'media/bench-ir-sensor.jpg' },
  { t: 'Photography', d: 'Atmospheric visuals that carry the story and set direction.', image: F('LFn1lvUtsjpRPODUPRrwyNR3k', 'jpeg') },
]

export const stack = [
  ['Design', 'Figma · Framer'],
  ['3D & CAD', 'Fusion 360 · AutoCAD'],
  ['Fabrication', 'Laser cutting · 3D printing'],
  ['Hardware', 'ESP32 · XIAO ESP32-S3 · sensors · RS485'],
  ['Code & cloud', 'HTML/CSS/JS · Python · Firebase'],
]

export const experience = [
  { role: 'Founder & Designer', org: 'Studio 0600FF', when: "Feb '24 — Present", d: 'A human-focused studio for identities, digital experiences and visual systems.' },
  { role: 'Community Experience', org: 'Nothing', when: "Mar '24 — Feb '26", d: 'Early product testing with the community and internal teams; turning feedback into product decisions.' },
  { role: 'Engineering Intern', org: 'Internship Studio', when: "Jun — Jul '25", d: 'Robotics: hardware–software integration, sensors and control logic, iterated as working prototypes.' },
  { role: 'Project Based Learning', org: 'Kumaraguru College of Technology', when: "Sep — Dec '24", d: 'Hands-on, collaborative builds focused on problem-solving and iteration.' },
]
