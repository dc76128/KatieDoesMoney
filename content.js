/*
  Editable content for the calculator.

  To update the site later, change the text in this file.
  You do not need to edit app.js unless you want to change calculator logic.
*/

window.WorthItContent = {
  // One of these is picked at random each time the page loads.
  meaningMessages: [
    "Small choices can become surprisingly large numbers when time is on your side.",
    "This is not about never spending. It is about seeing the tradeoff clearly.",
    "A little money invested regularly can become a meaningful future cushion.",
    "Future you may appreciate having options more than having one more impulse purchase.",
    "The real power here is consistency plus time."
  ],

  // Each object becomes one collapsed education section.
  educationSections: [
    {
      title: "Where would I actually put it?",
      heading: "So... where would I actually put it?",
      subtitle: "Here are the most common ways everyday people invest:",
      cards: [
        {
          icon: "📈",
          title: "Index Funds",
          tagline: "Set it and mostly forget it.",
          body: "An index fund is like buying a tiny slice of hundreds of companies at once. Low fees, low effort, historically strong returns.",
          tip: "How to access: Available through Fidelity, Vanguard, or Schwab. Search for S&P 500 index fund."
        },
        {
          icon: "🧺",
          title: "ETFs",
          tagline: "Like index funds, but you can buy them like a stock.",
          body: "ETFs are baskets of investments that trade on the stock market. Popular examples include VTI or VOO.",
          tip: "How to access: Available on most brokerage apps, including Fidelity, Schwab, and Robinhood."
        },
        {
          icon: "🏦",
          title: "High-Yield Savings Account",
          tagline: "Better than letting it sit in checking.",
          body: "If you're not ready to invest yet, a high-yield savings account can be a simple place to park cash while earning interest.",
          tip: "How to access: Try banks like Ally, Marcus, or SoFi."
        }
      ]
    },
    {
      title: "Good to know",
      heading: "Good to know",
      notes: [
        {
          title: "The 7% rule",
          body: "This calculator uses a 7% annual return as a simple long-term benchmark. Real returns vary year to year."
        },
        {
          title: "The latte factor is real-ish",
          body: "Nobody's saying never buy coffee. But knowing the long-term number makes the tradeoff visible."
        },
        {
          title: "The hardest part is starting",
          body: "Time is the ingredient that makes compounding powerful. Even small amounts can matter over long periods."
        }
      ]
    }
  ],

  // These show under the education sections.
  nextSteps: {
    heading: "Suggested next steps",
    items: [
      "Try one daily, weekly, and monthly expense to compare the long-term impact.",
      "Pick one small amount you could automatically save or invest.",
      "If you are new to investing, start by learning the difference between saving, investing, and paying down high-interest debt."
    ]
  }
};
