const ContactPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      <h1 className="text-3xl font-bold text-black mb-6">যোগাযোগ</h1>

      <p className="text-black/80 text-sm leading-relaxed mb-6">
        আমাদের সাথে যোগাযোগ করতে চাইলে নিচের তথ্যগুলি ব্যবহার করুন:
      </p>

      {/* Contact Info */}
      <div className="space-y-4 text-black/90 text-sm leading-relaxed">
        
        <div>
          <h2 className="font-semibold text-lg mb-1">অফিস ঠিকানা:</h2>
          <p>
            বাড়ি নং: ৯৫১, গ্রাউন্ড ফ্লোর<br />
            লেক ভিউ রিগ্যাল ম্যানর<br />
            আশুলিয়া, সাভার<br />
            ঢাকা-১৩৪৪, বাংলাদেশ
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-lg mb-1">ফোন:</h2>
          <p>+৮৮০১৩৩৯-৫৪০৩১৭</p>
        </div>

        <div>
          <h2 className="font-semibold text-lg mb-1">ইমেইল:</h2>
          <p>doinikshilpobangla@gmail.com</p>
        </div>

        <div>
          <h2 className="font-semibold text-lg mb-1">ওয়েবসাইট:</h2>
          <a
            href="https://dailyshilpobangla.com/"
            target="_blank"
            className="text-blue-600 hover:underline"
          >
            https://dailyshilpobangla.com/
          </a>
        </div>

        <div>
          <h2 className="font-semibold text-lg mb-1">ফেসবুক:</h2>
          <a
            href="https://www.facebook.com/DoinikShilpoBangla"
            target="_blank"
            className="text-blue-600 hover:underline"
          >
            facebook.com/DoinikShilpoBangla
          </a>
        </div>

        <div>
          <h2 className="font-semibold text-lg mb-1">ইউটিউব:</h2>
          <a
            href="https://www.youtube.com/@ShilpaBangla"
            target="_blank"
            className="text-blue-600 hover:underline"
          >
            youtube.com/@ShilpaBangla
          </a>
        </div>

      </div>

      {/* Divider */}
      <div className="my-10 border-t"></div>

      {/* About Section */}
      <div className="text-sm text-black/80 leading-relaxed space-y-4">
        <h2 className="text-xl font-semibold text-black">আমাদের সম্পর্কে</h2>

        <p>
          দৈনিক শিল্পবাংলা — "সত্যের পথে, জনতার সাথে" স্লোগানকে ধারণ করে এগিয়ে চলা একটি 
          স্বাধীন, প্রগতিশীল ও সত্যনিষ্ঠ গণমাধ্যম প্ল্যাটফর্ম। আমরা তৃণমূল মানুষের কণ্ঠস্বরকে 
          জাতীয় ও বৈশ্বিক আলোচনায় তুলে ধরতে প্রতিশ্রুতিবদ্ধ।
        </p>

        <p>
          শ্রমিকের অধিকার থেকে শিক্ষার্থীর স্বপ্ন, গ্রামীণ বাস্তবতা থেকে জাতীয় নীতিনির্ধারণ — 
          আমরা তুলে ধরি বাস্তবতার নির্ভীক চিত্র।
        </p>
      </div>

      {/* Divider */}
      <div className="my-10 border-t"></div>

      {/* Disclaimer */}
      <div className="text-xs text-black/60 leading-relaxed space-y-3">
        <h2 className="text-lg font-semibold text-black">Disclaimer</h2>

        <p>
          এই ওয়েবসাইটে প্রকাশিত সকল তথ্য সৎ উদ্দেশ্যে প্রদান করা হয়েছে। 
          এই তথ্য ব্যবহার করে নেওয়া কোনো সিদ্ধান্তের জন্য দৈনিক শিল্পবাংলা দায়ী থাকবে না।
        </p>

        <p>
          আমাদের সাইটে মাঝে মাঝে বাইরের ওয়েবসাইটের লিংক থাকতে পারে, 
          সেসব সাইটের কনটেন্টের জন্য আমরা দায়ী নই।
        </p>

        <p>
          আমরা সাইটটি সচল রাখার সর্বোচ্চ চেষ্টা করি, তবে প্রযুক্তিগত কারণে 
          সাময়িকভাবে বন্ধ থাকলে তার জন্য আমরা দায়ী থাকবো না।
        </p>

        <p>
          ব্যবহারকারীর পোস্ট করা কোনো মন্তব্য বাংলাদেশের প্রচলিত আইন বা 
          ডিজিটাল সিকিউরিটি আইন লঙ্ঘন করলে তার সম্পূর্ণ দায় ব্যবহারকারীর নিজস্ব।
        </p>
      </div>

    </div>
  );
};

export default ContactPage;