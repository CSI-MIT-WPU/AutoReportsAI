"use client";
import React from "react";

function HowItWorks() {
  return (
    <div className="py-16 space-y-16 px-40 ">
      <div className="text-center space-y-3">
        <p className="text-sm tracking-wide">HOW IT WORKS</p>
        <h2 className="text-5xl font-semibold">Just 3 steps to get started.</h2>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-2 max-w-xl">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="bg-red-100 text-red-500 p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 7l3-3m0 0l3 3m-3-3v18M21 13l-3 3m0 0l-3-3m3 3V3"
                  />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold">1. Upload Your Data</h3>
              <p className="text-gray-600">
                Simply upload your data to our secure platform. We support
                various file formats and data types to ensure seamless
                integration with your existing systems.
              </p>
            </div>
          </div>

          <div className="border-l-2 border-red-500 ml-3 my-6"></div>

          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="bg-red-100 text-red-500 p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold">2. Click Start</h3>
              <p className="text-gray-600">
                Our advanced AI algorithms automatically process and analyze
                your data, extracting valuable insights and patterns that would
                be difficult to identify manually.
              </p>
            </div>
          </div>

          <div className="border-l-2 border-red-500 ml-3 my-6"></div>

          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="bg-red-100 text-red-500 p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 0v12m-4-4h8"
                  />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold">
                3. Get Actionable Insights
              </h3>
              <p className="text-gray-600">
                Receive clear, actionable insights and recommendations based on
                the AI analysis. Use these insights to make data-driven
                decisions and improve your business strategies.
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-2">
          <img
            src="/dashboard.png"
            alt=""
            className=" hover:scale-105 aspect-auto h-full w-full rounded-xl border border-neutral-300/50 object-cover object-left-top p-1 shadow-lg transition-all duration-100"
          />
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
