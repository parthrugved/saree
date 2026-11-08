"use client";

import { useState } from "react";
import { submitFeedback } from "@/app/actions/feedback";
import { MapPin, Phone, Mail, Star } from "lucide-react";



export default function ContactPage() {
  const [rating, setRating] = useState(5);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    const formData = new FormData(e.currentTarget);
    formData.append("rating", rating.toString());
    
    const result = await submitFeedback(formData);
    
    if (result.error) {
      setStatus("error");
      setErrorMessage(result.error);
    } else {
      setStatus("success");
      (e.target as HTMLFormElement).reset();
      setRating(5);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
         We&apos;d love to hear from you. Whether you have a question about our collections, sizing, or just want to share your Sareekraft experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
        {/* Contact Info */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-8">Get In Touch</h2>
          
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-full text-amber-600">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Our Location</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  B-35 Old Munjal Nagar Near <br /> Amar Mahal Signal Chembur<br />
                  Mumbai, Maharashtra 400001
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-full text-amber-600">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Phone</h3>
                <p className="text-gray-600 dark:text-gray-400">+91 8080674236</p>
                <p className="text-sm text-gray-500 mt-1">Mon-Sat from 10am to 7pm</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-full text-amber-600">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Email</h3>
                <p className="text-gray-600 dark:text-gray-400">sareekraft25@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback Form */}
        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
          <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-6">Leave Feedback</h2>
          
          {status === "success" ? (
            <div className="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-400 p-4 rounded-lg text-center">
              <h3 className="font-bold mb-2">Thank you!</h3>
              <p>Your feedback has been successfully submitted. We appreciate your input.</p>
              <button 
                onClick={() => setStatus("idle")}
                className="mt-4 text-green-700 dark:text-green-500 font-medium hover:underline"
              >
                Submit another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {status === "error" && (
                <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-400 p-4 rounded-lg text-sm">
                  {errorMessage}
                </div>
              )}
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required 
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white dark:bg-gray-950"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required 
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white dark:bg-gray-950"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-full p-1"
                    >
                      <Star className={`h-8 w-8 ${star <= rating ? "fill-amber-500 text-amber-500" : "text-gray-300 dark:text-gray-600"}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={4} 
                  required 
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white dark:bg-gray-950 resize-none"
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={status === "submitting"}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-70 flex justify-center"
              >
                {status === "submitting" ? (
                  <span className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  "Submit Feedback"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
