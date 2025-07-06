import formal from './formal.png';
import winter from './winter.png';
import party from './party.png';
import casual from './casual.png';

let popular = [
  {
    id: 3,
    name: "Elegance Stripe: Timeless Flutter-Sleeve Peplum",
    image: formal,
    new_price: 85.00,
    old_price: 120.50,
    tag: "Office Chic",  // Optional: Add a tag for categorization
  },
  {
    id: 43,
    name: "Frosted Whisper: Cozy Knit-Stripe Peplum Top",
    image: winter,
    new_price: 85.00,
    old_price: 120.50,
    tag: "Winter Luxe",
  },
  {
    id: 4,
    name: "Gala Nights: Sparkle-Trim Flutter Blouse",
    image: party,
    new_price: 80.00,
    old_price: 100.50,
    tag: "Evening Glam",
  },
  {
    id: 2,
    name: "Breezy Daze: Relaxed Striped Hem Blouse",
    image: casual,
    new_price: 100.00,
    old_price: 150.00,
    tag: "Weekend Vibes",
  },
];

export default popular;