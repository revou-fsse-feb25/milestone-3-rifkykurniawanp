
"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What is Revo Shop?",
    answer:
      "Revo Shop is an online marketplace offering a wide range of quality products at competitive prices.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order has been shipped, you will receive a tracking number via email to monitor your delivery status.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept credit/debit cards, PayPal, and other secure payment options available at checkout.",
  },
  {
    question: "Can I return a product?",
    answer:
      "Yes, we offer a 14-day return policy for eligible products. Please read our return policy for more details.",
  },
  {
    question: "Is international shipping available?",
    answer:
      "Currently, we ship to selected countries. Shipping options will be shown at checkout based on your location.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-10">
      <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-gray-100 dark:bg-gray-800 p-5 rounded-lg shadow cursor-pointer transition"
            onClick={() => toggle(index)}
          >
            <h3 className="text-lg font-semibold">{faq.question}</h3>
            {openIndex === index && (
              <p className="mt-2 text-gray-700 dark:text-gray-300">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
