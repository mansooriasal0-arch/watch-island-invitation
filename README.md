# WATCH ISLAND — Grand Opening Invitation
Next.js 14 · TypeScript · Tailwind · Framer Motion · Lucide

## اجرا
    npm install
    npm run dev      # http://localhost:3000
    npm run build && npm start

## انتشار روی Vercel
    npm i -g vercel && vercel --prod
(یا ریپو را در GitHub بگذارید و در vercel.com Import کنید؛ تنظیم اضافه لازم نیست.)

## ویرایش
- تاریخ، آدرس، لینک نقشه: `components/lib.ts`
- متن‌ها و صحنه‌ها: `components/Invitation.tsx`
- لوگو: `public/logo.webp` (در صفحه با فیلتر invert روی زمینه مشکی نمایش داده می‌شود)
- موسیقی: ambient تولیدشده با Web Audio، فقط پس از کلیک «ورود» پخش می‌شود.
