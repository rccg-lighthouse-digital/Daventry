import type { ImageName } from "../lib/img";

/* ------------------------------------------------------------------ */
/*  Church details: edit here, the whole page reads from this file     */
/* ------------------------------------------------------------------ */

export const church = {
  name: "RCCG Lighthouse Daventry",
  venue: "Daventry Working Men's Club",
  addressLines: ["Working Men's Club, Unit 15, Abbey Retail Park,", "South Way, Daventry, Northamptonshire", "NN11 4GL, United Kingdom"],
  addressOneLine: "Daventry Working Men's Club, Unit 15, Abbey Retail Park, South Way, Daventry, NN11 4GL",
  shortLocation: "Daventry, Northamptonshire, NN11 4GL",
  // NOTE: the old site used this .org address although the domain is .co.uk.
  // Confirm which mailbox actually exists before going live.
  email: "info@rccglighthousedaventry.org",
  // Leave empty to hide. The old site had no phone number.
  phone: "",
  charityNumber: "1126652",
  parentSite: "https://rccglighthousefamily.co.uk",
  privacyUrl: "https://rccglighthousefamily.co.uk/privacy-policy",
  // Online giving link. Empty = the "Give Online" button scrolls to the next-steps
  // section, exactly as on the old site. Set it (e.g. a give.net page) to link out.
  giveUrl: "",
};

export function directionsUrl() {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(church.addressOneLine)}`;
}

export function mapEmbedUrl() {
  return `https://maps.google.com/maps?q=${encodeURIComponent(church.addressOneLine)}&z=15&output=embed`;
}

/** Social profiles. The old site had placeholder "#" links, so these are hidden until filled in. */
export const social: { label: string; short: string; href: string }[] = [
  { label: "Facebook", short: "f", href: "" },
  { label: "Instagram", short: "ig", href: "" },
  { label: "YouTube", short: "▷", href: "" },
  { label: "X", short: "𝕏", href: "" },
].filter((s) => s.href);

/* ------------------------------------------------------------------ */

export const serviceTimes = [
  { name: "Sunday Worship", day: "Sunday", time: "10:00 AM" },
  { name: "Bible Study", day: "Tuesday", time: "7:00 PM" },
  { name: "Prayer Meeting", day: "Thursday", time: "8:00 PM" },
];

export const tickerItems = [
  "Sunday Worship · 10:00 AM",
  "Bible Study · Tuesdays 7PM",
  "Prayer Meeting · Thursdays 8PM",
  "All Are Welcome",
];

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Ministry" },
  { href: "#beliefs", label: "Beliefs" },
  { href: "#locations", label: "Location" },
  { href: "#contact", label: "Contact" },
];

/* ------------------------------------------------------------------ */

export const heroImage: ImageName = "hero.jpg";

// The old site used an Unsplash stock photo labelled "Pastor and First Lady".
// A real photo from the inaugural service is used instead; swap in a photo of
// the pastors when one is available (add it to images.json first).
export const aboutImage: { image: ImageName; alt: string } = {
  image: "inaugural-4.jpg",
  alt: "The congregation at the inaugural service of RCCG Lighthouse Daventry",
};

export const slides: { image: ImageName; title: string; tag: string }[] = [
  { image: "inaugural-1.jpg", title: "Inaugural Service", tag: "" },
  { image: "inaugural-2.jpg", title: "Inaugural Service", tag: "" },
  { image: "inaugural-3.jpg", title: "Inaugural Service", tag: "" },
  { image: "inaugural-4.jpg", title: "Inaugural Service", tag: "" },
  { image: "inaugural-5.jpg", title: "Inaugural Service", tag: "" },
  { image: "inaugural-6.jpg", title: "Inaugural Service", tag: "" },
];

export const ministries = [
  {
    n: "01",
    icon: "✝",
    title: "Sunday Worship",
    text: "Encounter the living God through spirit-led worship, anointed preaching, and a community that celebrates together every week at 10:00 AM.",
  },
  {
    n: "02",
    icon: "📖",
    title: "Bible Study",
    text: "Dive deep into Scripture every Tuesday evening at 7PM. Our studies are rich in theology and practical in application for everyday life.",
  },
  {
    n: "03",
    icon: "🙌",
    title: "Prayer Meeting",
    text: "Intercession is the backbone of all we do. Join our prayer warriors every Thursday at 8PM as we stand in the gap for our community and the world.",
  },
];

export const verse = {
  text: "For I know the plans I have for you, declares the Lord — plans to prosper you and not to harm you, plans to give you hope and a future.",
  ref: "Jeremiah 29:11",
};

export const beliefs = [
  { title: "God the Father", icon: "✦", text: "Creator of Heaven and Earth, who made man in His own image and likeness." },
  { title: "The Holy Trinity", icon: "☩", text: "The three persons of the Godhead — God the Father, God the Son, and God the Holy Spirit — Three in One." },
  { title: "The Virgin Birth", icon: "✶", text: "Jesus was conceived by the Holy Spirit and born of the Virgin Mary." },
  {
    title: "Death & Resurrection",
    icon: "✝",
    text: "Jesus was crucified and died for the sins of mankind at Calvary, was buried and rose from the dead on the third day. He ascended into Heaven and is forever seated at the right hand of God the Father.",
  },
  { title: "The Holy Spirit", icon: "❋", text: "The Comforter and Teacher of all things who dwells within us, uniting us to Jesus Christ." },
  { title: "Baptism of the Holy Spirit", icon: "✧", text: "Freely available to all who believe in Jesus Christ, manifested by the gift of speaking in unknown tongues." },
  {
    title: "Salvation",
    icon: "☀",
    text: "A gift from God through grace and faith in Jesus Christ — that all who believe may be saved by turning from sin to repentance, trusting in His death and resurrection, and are born again by the Holy Spirit.",
  },
  { title: "The Blood of Jesus", icon: "◈", text: "Shed for us on the cross at Calvary, it cleanses us from all sin and grants us access into the presence of God." },
  {
    title: "The Second Coming",
    icon: "✵",
    text: "Jesus will come again to Earth in glory. The dead in Christ will rise and those alive in Christ will be translated into the presence of God for eternity.",
  },
  { title: "The Holy Bible", icon: "❖", text: "The infallible and authoritative Word of God, given to direct all men and women to salvation." },
];

export const roman = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
