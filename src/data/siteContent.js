export const site = {
  name: 'End Time Prophetic Ministries',
  founder: 'Prophet Daniel Bennet',
  tagline: 'Raising Prophetic Voices for the End Time Revival',
  phone: '+91 93425 23393',
  email: 'etpm2020forchrist@gmail.com',
  // The ministry's postal address, as given by the client. `addressLines` is the
  // display form (one line per row); `address` stays a single string for the
  // places that need it inline (meta tags, one-line rows).
  addressLines: ['END TIME PROPHETIC MINISTRIES', 'Porur', 'Chennai', 'Tamil Nadu, India'],
  address: 'Porur, Chennai, Tamil Nadu, India',
  social: {
    // TODO(client): replace with the exact URL of the "ETPM Chennai" Facebook page.
    facebook: 'https://www.facebook.com/share/1GhU6CFh8y/',
    instagram: 'https://www.instagram.com/endtimepropheticministries/',
    youtube: 'https://www.youtube.com/@endtimepropheticministries6864',
    whatsapp: 'https://wa.me/919342523393',
  },
}

/**
 * Giving details, exactly as supplied by the ministry. Two panels, because the
 * outside-India transfer needs the SWIFT and MICR codes that a domestic NEFT
 * does not, and mixing them on one card is how people send money to the wrong
 * rails. `rows` render in order; `wide` rows take the full width of the panel.
 */
export const giving = {
  gpay: '7829882540',
  accounts: [
    {
      id: 'india',
      eyebrow: 'Within India',
      title: 'Bank Transfer',
      note: 'For NEFT, IMPS, RTGS and UPI transfers from an Indian bank account.',
      rows: [
        { label: 'Bank', value: 'State Bank of India', feature: true },
        { label: 'Acc. Name', value: 'DANIEL BENNET', mono: true },
        { label: 'Acc No.', value: '20190093101', highlight: true },
        { label: 'IFSC Code', value: 'SBIN0005200', mono: true },
        { label: 'Branch Code', value: '005200', mono: true },
        { label: 'Branch', value: 'Porur, Chennai, Tamil Nadu, India', wide: true },
      ],
    },
    {
      id: 'international',
      eyebrow: 'Outside India',
      title: 'International Transfer',
      note: 'For wire transfers from outside India — the SWIFT code is required.',
      rows: [
        { label: 'Bank', value: 'State Bank of India', feature: true },
        { label: 'Acc. Name', value: 'DANIEL BENNET', mono: true },
        { label: 'Acc No.', value: '20190093101', highlight: true },
        { label: 'SWIFT Code', value: 'SBININBB292', highlight: true },
        { label: 'MICR Code', value: '600002119', mono: true },
        { label: 'IFSC Code', value: 'SBIN0005200', mono: true },
        { label: 'Branch Code', value: '005200', mono: true },
        { label: 'Branch', value: 'Porur, Chennai, Tamil Nadu, India', wide: true },
      ],
    },
  ],
}

/**
 * Dated events. `start`/`end` are ISO strings in IST (+05:30) so the countdown
 * lands on the same moment for a visitor in Chennai and one in London.
 * The countdown reads the first event whose `end` is still in the future.
 */
export const events = [
  {
    id: 'arise-malaysia-2026',
    title: 'Arise Malaysia 2026',
    theme:
      'A cry to restore the nation — prophetic meetings declaring a shift in the environment, the cloud, the atmosphere, the people’s life, the government, the Body of Christ, and the realm of the Spirit.',
    scripture: '“Arise, shine; for thy light is come, and the glory of the LORD is risen upon thee.”',
    scriptureRef: 'Isaiah 60:1',
    start: '2026-10-04T00:00:00+05:30',
    end: '2026-10-14T23:59:00+05:30',
    dateLabel: '4 – 14 October 2026',
    venue: 'Malaysia',
  },
  {
    id: 'misphacha-2026',
    title: 'Prophetic Misphacha Conference 2026',
    theme: 'Rebuilding Christ-Centered Healthy Families & Restoring Marriages',
    scripture: '“As for Me and My House, We Will Serve the Lord”',
    scriptureRef: 'Joshua 24:15',
    start: '2026-08-22T09:30:00+05:30',
    end: '2026-08-22T13:00:00+05:30',
    dateLabel: '22 August 2026 (Saturday)',
    timeLabel: '9:30 AM – 1:00 PM',
    registrationCloses: '2026-08-15T23:59:00+05:30',
    registrationClosesLabel: '15 August 2026',
    venue: 'STEVE’S GYM',
    venueAddress: 'No. 10, Krishna Reddy, Henpur Bagalur Road, HBR 3rd Block, Bengaluru - 500043',
    fee: '₹200/- per person',
    seats: 'Limited Seats (30 Seats Only)',
    sessions: [
      { title: 'Rebuilding Christ-Centered Healthy Families', note: 'Newly married couples are welcome' },
      { title: 'Forgiveness & Healing', note: 'in marriage' },
      { title: 'Dealing with Modern Challenges', note: 'Technology, peer pressure, and cultural influences' },
      { title: 'Restoring Love, Faith, & Unity', note: 'in marriage' },
    ],
  },
]

export const aboutUs = {
  founderTitle: "GOD'S VISION TO FOUNDER DANIEL BENNET",
  founderStory: [
    `He started having Glorious Encounters with God, and finally in the year 2020, God birthed and gave His mandate to Prophet Daniel Bennet to bring End Time Revival by raising Prophets and Prophetesses who will be His Prophetic Voice in these last days through "End Time Prophetic Ministries".`,
    'He has personally received this vision from the Lord after much preparation of 6 years of Theological Training, with the practical experience of serving the Lord as a Youth and Associate Pastor for 4 years. Along with the Prophetic Training, praying and waiting much upon the Lord for many years, God is using him mightily.',
    'Now as a family they are serving the Lord and moving towards His direction to fulfill His vision till His coming.',
  ],
  family: {
    title: 'About Our Family',
    body: [
      'End Time Prophetic Ministries is more than a ministry; it is a family united by faith and a shared commitment to serve God. We strive to create an atmosphere of love, encouragement, and spiritual growth for all believers, the body of Christ and ministers of God.',
      'Our ministry welcomes everyone with open arms, nurturing deeper connections with God. We believe in strengthening one another through prayer, prophetic teaching, and acts of kindness like Jesus. We stand together in faith, supporting each other in times of need. Our goal is to equip men and women of God to walk boldly in their divine calling. Every believer of the Lord Jesus Christ is a vital part of God’s Kingdom to bring End Time Revival across the universe. We are the family that thrives on unity and the divine purpose of God.',
    ],
  },
  equipping: {
    title: 'Equipping Emerging Pastors and Leaders',
    body: "Travelling to different countries to give Prophetic Ministry Training, raising miracle workers and supernatural men and women of God, equipping emerging pastors to fulfill God's vision and their calling. New generation leaders for the end time harvest, impartation of the anointing and activating the gifts.",
  },
  pillars: [
    {
      title: 'Our Vision',
      body: 'To prepare and equip believers for the end times, bringing them closer to Christ through prophetic revelation, healing, and deliverance. Our vision is to see lives transformed, faith strengthened, and nations impacted by the power of God.',
    },
    {
      title: 'Our Mission',
      body: 'To preach the unfiltered Word of God with boldness and truth, bringing healing and deliverance to those in need through faith and prayer. We are committed to equipping believers with spiritual knowledge and prophetic insights, empowering them to walk in their divine calling. Our mission extends to reaching out to the nations, spreading the Gospel, and establishing God’s kingdom worldwide.',
    },
    {
      title: 'Our Purpose Statement',
      body: 'Our purpose is to glorify God by equipping believers with the truth of His Word and empowering them to walk in their divine calling. We are committed to spreading the Gospel, bringing healing and deliverance to those in need, and raising a generation of spiritually strong individuals through faith-based teaching, prophetic guidance, and community outreach.',
    },
  ],
}

// Ministry descriptions are real WordPress content. Only Youth & Children's had
// real copy in the source export — the rest still had CMS placeholder text, so
// they're flagged here for the client to replace with their own wording.
export const ministries = [
  { name: 'Web Ministry', image: 'web-ministry.jpg', icon: 'priest.png', placeholder: true },
  { name: 'Help Ministry', image: 'help-ministry.jpg', icon: 'praying.png', placeholder: true },
  { name: 'Prison Ministry', image: 'prison-ministry.jpg', icon: 'dove.png', placeholder: true },
  { name: 'Family Ministry', image: 'family-ministry.jpg', icon: 'family.png', placeholder: true },
  { name: 'Music Ministry', image: 'music-ministry.jpg', icon: 'bible.png', placeholder: true },
  {
    name: "Youth & Children's Ministry",
    image: 'youth-ministry.jpg',
    icon: 'love.png',
    body: 'Empowering the next generation with Biblical teachings, mentorship, and spiritual growth programs.',
  },
]

export const invite = {
  title: 'Invite Prophet Daniel Bennet',
  email: 'prophetdanielbennet@gmail.com',
  intro:
    'Thank you for considering Prophet Daniel Bennet to speak at your church or event. He is a vessel through which God transforms, revolutionizes, and revives lives wherever he goes around the globe.',
}

// Animated counters on the Home + About pages. The original WordPress site had
// these stat blocks but left the numbers at "0" — these are PLACEHOLDER values
// for the client to replace with their real ministry figures.
export const stats = [
  { value: 6, suffix: '+', label: 'Years of Ministry' },
  { value: 15, suffix: '+', label: 'Nations Reached' },
  { value: 120, suffix: '+', label: 'Churches Ministered' },
  { value: 10, suffix: 'K+', label: 'Lives Touched' },
]

// "Rooted in the Word, moving in the Spirit" strip — the ministry's focus areas.
export const focusAreas = [
  'Prophetic Training',
  'Healing & Deliverance',
  'Impartation of the Anointing',
  'Outreach & Missions',
  'Discipleship',
  'Prayer & Intercession',
]

// Testimonials shown on the Home page. These are PLACEHOLDER quotes written in the
// ministry's voice — replace with real testimonies from the congregation.
export const testimonials = [
  { quote: 'Under Prophet Daniel’s ministry I encountered God in a way I never had before. My faith is alive again.', name: 'Ruth M.', role: 'Chennai' },
  { quote: 'The prophetic training equipped me to step boldly into my calling. I now lead a growing home fellowship.', name: 'Samuel J.', role: 'Bengaluru' },
  { quote: 'I came broken and left healed. The presence of God in these meetings is undeniable.', name: 'Grace P.', role: 'Hyderabad' },
  { quote: 'God used this ministry to restore my family. We are walking in a new season of breakthrough.', name: 'Daniel & Anita', role: 'Coimbatore' },
  { quote: 'The impartation service changed my life. The gifts God placed in me were stirred and activated.', name: 'Peter K.', role: 'Malaysia' },
  { quote: 'A true end-time voice. Every message carries conviction, hope, and the fire of the Spirit.', name: 'Esther R.', role: 'Vellore' },
  { quote: 'Years of addiction broke off me in a single night of ministry. I am free, and my family has their son back.', name: 'Joseph V.', role: 'Madurai' },
  { quote: 'The word of knowledge spoken over me was so specific only God could have known it. It rebuilt my trust in Him.', name: 'Priscilla D.', role: 'Kochi' },
  { quote: 'What began as one meeting became a complete turnaround for our church. Hunger for the presence of God spread through our whole congregation.', name: 'Pastor Thomas A.', role: 'Singapore' },
]
