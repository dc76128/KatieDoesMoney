/*
  Calculator logic for the "Is it worth it?" page.

  Beginner note:
  - Edit content.js for messages, education tips, and next steps.
  - Edit styles.css for colors, spacing, and layout.
  - Edit this file only when you want to change how the calculator works.
*/

(function () {
  var ANNUAL_RETURN = 0.07;
  var YEARS_TO_SHOW = [5, 10, 20, 30];

  function initWorthItCalculator() {
    var root = document.getElementById('worth-it-calculator');
    if (!root || root.dataset.ready === 'true') return;
    root.dataset.ready = 'true';

    var amountInput = root.querySelector('#wiw-amount');
    var frequencyButtons = root.querySelectorAll('.wiw-frequency');
    var results = root.querySelector('#wiw-results');
    var selectedFrequency = 'once';

    renderEditableContent(root);
    showRandomMeaningMessage(root);

    amountInput.addEventListener('input', update);

    frequencyButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        selectedFrequency = button.getAttribute('data-frequency');

        frequencyButtons.forEach(function (btn) {
          btn.classList.remove('active');
        });

        button.classList.add('active');
        update();
      });
    });

    function update() {
      var amount = parseAmount(amountInput.value);
      if (amount <= 0) {
        results.hidden = true;
        return;
      }

      results.hidden = false;

      var thirtyYearFutureValue = futureValue(amount, selectedFrequency, 30);
      var thirtyYearContributions = contributedAmount(amount, selectedFrequency, 30);
      var multiple = thirtyYearContributions > 0
        ? (thirtyYearFutureValue / thirtyYearContributions).toFixed(1)
        : '0.0';

      root.querySelector('#wiw-thirty-year-value').textContent = formatMoney(thirtyYearFutureValue, false);
      root.querySelector('#wiw-multiple').textContent = multiple + 'x';
      root.querySelector('#wiw-disclaimer').textContent =
        'Based on ' + formatMoney(amount, true) + ' ' + readableFrequency(selectedFrequency) +
        ', invested at 7%/year. Past performance does not guarantee future results.';

      YEARS_TO_SHOW.forEach(function (yearCount) {
        var value = futureValue(amount, selectedFrequency, yearCount);
        var contributed = contributedAmount(amount, selectedFrequency, yearCount);
        var growth = contributed > 0 ? Math.round(((value - contributed) / contributed) * 100) : 0;

        root.querySelector('#wiw-' + yearCount).textContent = formatMoney(value, true);
        root.querySelector('#wiw-growth-' + yearCount).textContent = '+' + growth + '% growth';
      });
    }
  }

  // Removes currency symbols, commas, and accidental extra decimals.
  function parseAmount(value) {
    var cleaned = String(value || '').replace(/[^0-9.]/g, '');
    var firstDecimal = cleaned.indexOf('.');

    if (firstDecimal !== -1) {
      cleaned = cleaned.slice(0, firstDecimal + 1) + cleaned.slice(firstDecimal + 1).replace(/\./g, '');
    }

    return parseFloat(cleaned) || 0;
  }

  function formatMoney(value, compact) {
    if (compact && value >= 1000000) return '$' + (value / 1000000).toFixed(2) + 'M';
    if (compact && value >= 1000) return '$' + (value / 1000).toFixed(1) + 'K';

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: value < 1000 ? 2 : 0
    }).format(value);
  }

  function futureValue(amount, frequency, yearCount) {
    if (frequency === 'once') {
      return amount * Math.pow(1 + ANNUAL_RETURN, yearCount);
    }

    var paymentsPerYear = getPaymentsPerYear(frequency);
    var ratePerPayment = ANNUAL_RETURN / paymentsPerYear;
    var numberOfPayments = paymentsPerYear * yearCount;

    return amount * ((Math.pow(1 + ratePerPayment, numberOfPayments) - 1) / ratePerPayment);
  }

  function contributedAmount(amount, frequency, yearCount) {
    if (frequency === 'once') return amount;
    return amount * getPaymentsPerYear(frequency) * yearCount;
  }

  function getPaymentsPerYear(frequency) {
    if (frequency === 'daily') return 365;
    if (frequency === 'weekly') return 52;
    if (frequency === 'monthly') return 12;
    return 1;
  }

  function readableFrequency(frequency) {
    if (frequency === 'once') return 'one-time purchase';
    if (frequency === 'daily') return 'spent daily';
    if (frequency === 'weekly') return 'spent weekly';
    if (frequency === 'monthly') return 'spent monthly';
    return 'spent yearly';
  }

  function showRandomMeaningMessage(root) {
    var target = root.querySelector('#wiw-meaning-message');
    var messages = getContent().meaningMessages || [];

    if (!target || messages.length === 0) return;

    var randomIndex = Math.floor(Math.random() * messages.length);
    target.textContent = messages[randomIndex];
  }

  function renderEditableContent(root) {
    renderEducationSections(root);
    renderNextSteps(root);
  }

  function renderEducationSections(root) {
    var container = root.querySelector('#wiw-education-sections');
    var sections = getContent().educationSections || [];

    if (!container) return;

    container.innerHTML = '';

    sections.forEach(function (section) {
      var details = document.createElement('details');
      details.className = 'wiw-expand';

      var summary = document.createElement('summary');
      summary.textContent = section.title;
      details.appendChild(summary);

      var education = document.createElement('section');
      education.className = 'wiw-education';

      var heading = document.createElement('h2');
      heading.textContent = section.heading || section.title;
      education.appendChild(heading);

      if (section.subtitle) {
        var subtitle = document.createElement('p');
        subtitle.className = 'wiw-section-subtitle';
        subtitle.textContent = section.subtitle;
        education.appendChild(subtitle);
      }

      (section.cards || []).forEach(function (card) {
        education.appendChild(createInfoCard(card));
      });

      (section.notes || []).forEach(function (note) {
        education.appendChild(createNoteCard(note));
      });

      details.appendChild(education);
      container.appendChild(details);
    });
  }

  function createInfoCard(card) {
    var article = document.createElement('article');
    article.className = 'wiw-info-card';

    var titleWrapper = document.createElement('div');
    titleWrapper.className = 'wiw-info-title';

    var icon = document.createElement('span');
    icon.textContent = card.icon || '';
    titleWrapper.appendChild(icon);

    var title = document.createElement('h3');
    title.textContent = card.title;
    titleWrapper.appendChild(title);

    article.appendChild(titleWrapper);

    addParagraph(article, card.tagline, 'wiw-tagline');
    addParagraph(article, card.body);
    addParagraph(article, card.tip, 'wiw-tip');

    return article;
  }

  function createNoteCard(note) {
    var card = document.createElement('div');
    card.className = 'wiw-note-card';

    var title = document.createElement('strong');
    title.textContent = note.title;
    card.appendChild(title);

    addParagraph(card, note.body);

    return card;
  }

  function renderNextSteps(root) {
    var container = root.querySelector('#wiw-next-steps');
    var nextSteps = getContent().nextSteps;

    if (!container || !nextSteps) return;

    container.innerHTML = '';

    var heading = document.createElement('h2');
    heading.id = 'wiw-next-steps-title';
    heading.textContent = nextSteps.heading;
    container.appendChild(heading);

    var list = document.createElement('ul');
    (nextSteps.items || []).forEach(function (item) {
      var listItem = document.createElement('li');
      listItem.textContent = item;
      list.appendChild(listItem);
    });
    container.appendChild(list);
  }

  function addParagraph(parent, text, className) {
    if (!text) return;

    var paragraph = document.createElement('p');
    if (className) paragraph.className = className;
    paragraph.textContent = text;
    parent.appendChild(paragraph);
  }

  function getContent() {
    return window.WorthItContent || {};
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWorthItCalculator);
  } else {
    initWorthItCalculator();
  }
})();
