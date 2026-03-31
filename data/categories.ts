// src/data/categories.ts

// 🌟 ক্যাটাগরির জন্য TypeScript ইন্টারফেস
export interface Category {
  id: string;
  name: string;
  slug: string;
  children?: Category[]; // সাব-ক্যাটাগরির জন্য অ্যারে
}

// 🌟 ফিগমা এবং আপনার চাহিদা অনুযায়ী মক ক্যাটাগরি ডাটা (মোট ২০টি)
export const categoriesData: Category[] = [
  { id: '1', name: 'জাতীয়', slug: '/category/national' },
  { id: '2', name: 'সারাদেশ', slug: '/category/all-bangladesh', children: [
    { id: '21', name: 'ঢাকা বিভাগ', slug: '/category/all-bangladesh/dhaka' },
    { id: '22', name: 'চট্টগ্রাম বিভাগ', slug: '/category/all-bangladesh/chittagong' },
    { id: '23', name: 'সিলেট বিভাগ', slug: '/category/all-bangladesh/sylhet' },
    { id: '24', name: 'রাজশাহী বিভাগ', slug: '/category/all-bangladesh/rajshahi' },
  ]},
  { id: '3', name: 'সাভার', slug: '/category/savar' },
  { id: '4', name: 'আশুলিয়া', slug: '/category/ashulia' },
  { id: '5', name: 'রাজধানী', slug: '/category/dhaka-capital' },
  { id: '6', name: 'রাজনীতি', slug: '/category/politics' },
  { id: '7', name: 'আন্তর্জাতিক', slug: '/category/international' },
  { id: '8', name: 'খেলা', slug: '/category/sports', children: [
    { id: '81', name: 'ক্রিকেট', slug: '/category/sports/cricket' },
    { id: '82', name: 'ফুটবল', slug: '/category/sports/football' },
  ]},
  { id: '9', name: 'অর্থ ও বাণিজ্য', slug: '/category/economy', children: [
    { id: '91', name: 'শেয়ার বাজার', slug: '/category/economy/stock-market' },
    { id: '92', name: 'ব্যাংক ও বিমা', slug: '/category/economy/banking' },
  ]},
  { id: '10', name: 'বিনোদন', slug: '/category/entertainment', children: [
    { id: '101', name: 'ঢালিউড', slug: '/category/entertainment/dhallywood' },
    { id: '102', name: 'বলিউড', slug: '/category/entertainment/bollywood' },
  ]},
  { id: '11', name: 'বিজ্ঞান ও প্রযুক্তি', slug: '/category/tech', children: [
    { id: '111', name: 'গ্যাজেট', slug: '/category/tech/gadgets' },
    { id: '112', name: 'সোশ্যাল মিডিয়া', slug: '/category/tech/social-media' },
  ]},
  { id: '12', name: 'স্বাস্থ্য', slug: '/category/health', children: [
    { id: '121', name: 'ফিটনেস', slug: '/category/health/fitness' },
    { id: '122', name: 'ডায়েট', slug: '/category/health/diet' },
  ]},
  { id: '13', name: 'শিক্ষা', slug: '/category/education', children: [
    { id: '131', name: 'ক্যাম্পাস', slug: '/category/education/campus' },
    { id: '132', name: 'ভর্তি ও পরীক্ষা', slug: '/category/education/admission' },
  ]},
  { id: '14', name: 'লাইফস্টাইল', slug: '/category/lifestyle' },
  { id: '15', name: 'আইন ও আদালত', slug: '/category/law-and-court' },
  { id: '16', name: 'প্রবাস', slug: '/category/probash' },
  { id: '17', name: 'ধর্ম', slug: '/category/religion' },
  { id: '18', name: 'মতামত', slug: '/category/opinion' },
  { id: '19', name: 'বিশেষ আয়োজন', slug: '/category/special-feature' },
  { id: '20', name: 'ছবি ও ভিডিও', slug: '/category/multimedia' },
];