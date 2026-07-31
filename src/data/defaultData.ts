import sunsetImg from '../assets/images/couple_sunset_date_1785502458741.jpg';
import coffeeImg from '../assets/images/couple_cozy_coffee_1785502471166.jpg';
import handsImg from '../assets/images/couple_holding_hands_1785502482980.jpg';
import { PhotoMemory, LoveMessage, LoveReason } from '../types';

export const DEFAULT_PHOTOS: PhotoMemory[] = [
  {
    id: 'photo-1',
    url: 'https://i.postimg.cc/N0PpcY2N/a0259bf2-7f17-43fe-8fdc-8a1dafe8c3da.jpg',
    title: 'Breathtaking in Red',
    caption: 'The absolute cutest girl in the world. Look at how breathtaking you look in red—every single detail about you is pure perfection to me.',
    date: 'My Hotcake',
  },
  {
    id: 'photo-2',
    url: 'https://i.postimg.cc/pTwCmZZL/2187c1c5-18fd-4967-b3c0-fa662e9dc78c.jpg',
    title: 'Elegance & Grace',
    caption: 'You bring so much light, grace, and sweetness into my life. Looking at you in this black outfit always turns my head and fills my heart.',
    date: 'My Queen',
  },
  {
    id: 'photo-3',
    url: 'https://i.postimg.cc/prLQS6q8/3e64a52d-6aad-4872-9dc5-72d5235cb7fd.jpg',
    title: 'Us Forever',
    caption: 'Standing by your side is my absolute favorite place to be. Here is to us and all the beautiful memories we are creating together.',
    date: 'Us Forever',
  },
];

export const DEFAULT_MESSAGE: LoveMessage = {
  recipientName: 'My Hotcake',
  senderName: 'Your Air Marshal',
  headline: "Happy Girlfriend's Day, My Love",
  body: [
    "Thank you for loving me, believing in me, praying for me, and standing by my side through everything. You bring me peace, joy, and a kind of happiness that words could never fully describe. I keep falling for you more and more with each passing day babe.",
    "I love you endlessly baby girl and can’t wait to create many more beautiful memories with you my love💖💕"
  ],
  signature: 'Forever & Always,',
  specialDate: "National Girlfriend's Day",
};

export const DEFAULT_REASONS: LoveReason[] = [
  { id: '1', text: 'The way your eyes light up when you laugh at a silly joke.' },
  { id: '2', text: 'How safe and at home I feel whenever I am near you.' },
  { id: '3', text: 'Your endless compassion and gentleness towards everyone around you.' },
  { id: '4', text: 'How you always know exactly how to make a hard day feel lighter.' },
  { id: '5', text: 'The way you hold my hand tightly when we are walking.' },
  { id: '6', text: 'Simply because you are you—uniquely, beautifully, irreplaceable.' },
];
