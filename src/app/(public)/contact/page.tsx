import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20 lg:py-28">
      <div className="text-center mb-12">
        <p className="text-sm font-inter uppercase tracking-[0.2em] text-copper mb-3">Get in Touch</p>
        <h1 className="font-playfair font-semibold text-4xl lg:text-5xl text-charcoal">Contact Us</h1>
        <div className="w-16 h-0.5 bg-copper mx-auto mt-4 mb-8" />
      </div>
      
      <div className="grid md:grid-cols-2 gap-12 lg:gap-20 max-w-5xl mx-auto">
        <div className="flex flex-col justify-center">
          <h2 className="font-playfair font-medium text-3xl mb-4 text-charcoal">We'd love to hear from you</h2>
          <p className="text-stone-500 font-inter mb-8 text-lg">
            Have questions about our products or need help with an upcoming project? 
            Fill out the form below or reach us directly via WhatsApp.
          </p>
          
          <div className="space-y-6 font-inter text-stone-500">
            <div className="flex items-start">
              <strong className="w-24 text-charcoal font-semibold mt-0.5">Address:</strong>
              <span className="flex-1">123 Design Avenue, Creative District, City 400001</span>
            </div>
            <div className="flex items-center">
              <strong className="w-24 text-charcoal font-semibold">Phone:</strong>
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center">
              <strong className="w-24 text-charcoal font-semibold">Email:</strong>
              <span>hello@KLal.com</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-stone-300">
          <form className="space-y-5 font-inter">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">Name</label>
              <Input placeholder="Your good name" className="rounded-xl border-stone-300 h-12" />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">Email</label>
              <Input type="email" placeholder="you@example.com" className="rounded-xl border-stone-300 h-12" />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">Message</label>
              <textarea 
                className="flex min-h-[140px] w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2" 
                placeholder="How can we help you?"
              />
            </div>
            <Button className="w-full bg-copper hover:bg-copper-dark text-white rounded-full h-12 text-base font-medium shadow-sm pt-1">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
