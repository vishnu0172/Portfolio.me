// Splash Screen Handler
window.addEventListener('load', function () {
  const splashScreen = document.getElementById('splashScreen');
  if (splashScreen) {
    // Splash screen will auto-hide after 3.3 seconds due to CSS animation
    // Optional: Add click to skip splash
    splashScreen.addEventListener('click', function () {
      splashScreen.style.animation = 'none';
      splashScreen.style.opacity = '0';
      splashScreen.style.visibility = 'hidden';
    });
  }
});

// Preload splash screen immediately (before page fully loads)
document.addEventListener('DOMContentLoaded', function () {
  // Splash screen is already visible via HTML
});

// Project Modal State & Data
let activeProjectId = null;
const projectData = {
  1: {
    title: "Internship Certificate Portal",
    subtitle: "Full Stack MERN",
    desc: "A full-stack system allowing students to apply for internship certificates with online payments, administrative approval workflows, and status tracking.",
    github: "https://github.com/vishnu0172/W3-Certify"
  },
  2: {
    title: "Web Application Firewall",
    subtitle: "Cybersecurity & Node.js",
    desc: "A custom-built security layer designed with threat detection, SQL injection filtering, cross-site scripting (XSS) defense, and IP blacklisting.",
    github: "https://github.com/vishnu0172/WAF"
  },
  3: {
    title: "Real-time Chat App",
    subtitle: "WebSockets & React",
    desc: "Messaging application built with WebSockets, instant message delivery, user authentication, and private or group channels.",
    github: null
  },
  4: {
    title: "Smart Financial Advisor",
    subtitle: "Full Stack MERN & AI",
    desc: "Built an AI-powered smart financial advisor that takes user income and expenses as input to calculate budget planning, insurance recommendations, investment st…Built an AI-powered smart financial advisor that takes user income and expenses as input to calculate budget planning, insurance recommendations, investment strategies, and comprehensive financial guidance that covers all aspects of personal finance management in one platform.",
    github: "https://github.com/vishnu0172/Finwise",
  },
  5: {
    title: "Blockchain Voting System",
    subtitle: "Web3 & Solidity",
    desc: "Decentralized, anonymous, and tamper-proof ballot submission and tallying system built on Ethereum.",
    github: "https://github.com/vishnu0172/Blockchain-VotingSystem"
  },
  6: {
    title: "Certificate Validation",
    subtitle: "Solidity & IPFS",
    desc: "Generates and validates academic certificates on-chain with immutable records, eliminating credential fraud using IPFS decentralized storage.",
    github: "https://github.com/vishnu0172/CertificateGenerationAndValidation"
  },
  7: {
    title: "Sentiment Analysis Pipeline",
    subtitle: "Python & Machine Learning",
    desc: "NLP classifier evaluating text sentiment with model training metrics and a REST API integration layer.",
    github: "https://github.com/vishnu0172/Sentiment-Review-Analyser"
  },
  8: {
    title: "Secure Data Deletion",
    subtitle: "Python & Cryptography",
    desc: "Custom algorithm applying multi-pass wiping sequences on local storage systems to block forensic file recovery.",
    github: "https://github.com/vishnu0172/Secure-Data-Deletion"
  }
};

const modal = document.getElementById('projectModal');
const selectStep = document.getElementById('modalSelectStep');
const demoStep = document.getElementById('modalDemoStep');
const demoContent = document.getElementById('demoContent');

window.openProjectModal = function (id) {
  activeProjectId = id;
  const data = projectData[id];
  if (!data) return;

  document.getElementById('modalProjTitle').innerText = data.title;
  document.getElementById('modalProjSubtitle').innerText = data.subtitle;
  document.getElementById('modalProjDesc').innerText = data.desc;

  const githubBtn = document.getElementById('modalGithubBtn');
  const githubStatus = document.getElementById('modalGithubStatus');
  if (data.github) {
    githubBtn.href = data.github;
    githubBtn.classList.remove('disabled');
    githubStatus.innerText = "View open source code";
  } else {
    githubBtn.removeAttribute('href');
    githubBtn.classList.add('disabled');
    githubStatus.innerText = "Private Repository";
  }

  // Reset step states
  selectStep.style.display = 'block';
  demoStep.style.display = 'none';
  demoContent.innerHTML = '';

  modal.style.display = 'flex';
  setTimeout(() => {
    modal.classList.add('open');
  }, 10);
  document.body.style.overflow = 'hidden';
};

window.closeProjectModal = function () {
  modal.classList.remove('open');
  setTimeout(() => {
    modal.style.display = 'none';
  }, 300);
  document.body.style.overflow = '';
  activeProjectId = null;
};

window.backToModalSelect = function () {
  demoStep.style.display = 'none';
  selectStep.style.display = 'block';
  demoContent.innerHTML = '';
};

window.launchLiveDemo = function () {
  selectStep.style.display = 'none';
  demoStep.style.display = 'block';
  loadDemoSimulator(activeProjectId);
};

// Global click listener to close modal on clicking overlay background
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeProjectModal();
  }
});

function loadDemoSimulator(id) {
  switch (id) {
    case 1:
      demoContent.innerHTML = `
        <div class="demo-form">
          <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 8px;">Simulate applying and generating a verified internship certificate.</p>
          <div class="demo-group">
            <label class="demo-label">Candidate Name</label>
            <input id="certName" type="text" class="demo-input" value="Vishnu Y" />
          </div>
          <div class="demo-group">
            <label class="demo-label">Internship Domain</label>
            <select id="certTrack" class="demo-input" style="background: #1e293b;">
              <option value="Web Full Stack Developer">Web Full Stack Developer</option>
              <option value="Blockchain & DeFi Engineer">Blockchain & DeFi Engineer</option>
              <option value="Cybersecurity Analyst">Cybersecurity Analyst</option>
            </select>
          </div>
          <button onclick="runCertGeneration()" class="demo-btn">
            Generate Verified Certificate
          </button>
          <div id="certOutput" style="display:none;"></div>
        </div>
      `;
      break;
    case 2:
      demoContent.innerHTML = `
        <div>
          <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 12px;">Trigger simulated requests and watch the custom WAF rule-engine inspect and block threat vectors in real-time.</p>
          <div style="display:flex; gap:10px; margin-bottom: 16px;">
            <button onclick="sendWafRequest('safe')" class="demo-btn" style="background:#10b981;">Send Clean Request</button>
            <button onclick="sendWafRequest('sql')" class="demo-btn" style="background:#ef4444;">SQL Injection</button>
            <button onclick="sendWafRequest('xss')" class="demo-btn" style="background:#f59e0b;">XSS Script</button>
          </div>
          <div class="terminal-console" id="wafConsole">
            <div class="terminal-line info">[SYSTEM] WAF initialized. Listening on port 8080...</div>
            <div class="terminal-line info">[SYSTEM] Threat filters loaded: SQL Injection, XSS Script, Directory Traversal, Command Injection.</div>
          </div>
        </div>
      `;
      break;
    case 3:
      demoContent.innerHTML = `
        <div>
          <div class="chat-container" id="chatBox">
            <div class="chat-bubble received">Hello! Welcome to the real-time chat room. Type a message below to test WebSocket instant messaging.</div>
          </div>
          <div style="display:flex; gap:8px;">
            <input id="chatInput" type="text" class="demo-input" style="flex:1;" placeholder="Type message..." onkeydown="if(event.key==='Enter') sendChatMessage()" />
            <button onclick="sendChatMessage()" class="demo-btn">Send</button>
          </div>
        </div>
      `;
      break;
    case 4:
      demoContent.innerHTML = `
        <div>
          <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 12px;">Enter your financial details to generate an AI-powered plan.</p>
          <div class="demo-form" id="financialForm">
            <div class="demo-group">
              <label class="demo-label">Monthly Income ($)</label>
              <input id="finIncome" type="number" class="demo-input" placeholder="e.g. 5000" />
            </div>
            <div class="demo-group">
              <label class="demo-label">Monthly Expenses ($)</label>
              <input id="finExpenses" type="number" class="demo-input" placeholder="e.g. 2000" />
            </div>
            <div class="demo-group">
              <label class="demo-label">Risk Tolerance</label>
              <select id="finRisk" class="demo-input" style="background: #1e293b;">
                <option value="Low">Low (Bonds & Savings)</option>
                <option value="Medium">Medium (Index Funds & ETFs)</option>
                <option value="High">High (Stocks & Crypto)</option>
              </select>
            </div>
            <button onclick="generateFinancialPlan()" class="demo-btn">Generate Financial Plan</button>
          </div>
          <div id="financialDashboard" style="margin-top:20px; display:none; background: var(--card-bg); padding: 16px; border-radius: 8px; border: 1px solid var(--card-border);">
            <h5 style="margin-bottom:12px; font-family:var(--sans-head); color: var(--primary);">Your Smart Financial Plan</h5>
            <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 8px;">
              <strong style="color:white;">Budget Analysis:</strong> <span id="dashSavings"></span>
            </div>
            <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 8px;">
              <strong style="color:white;">Investment Strategy:</strong> <span id="dashInvestment"></span>
            </div>
            <div style="font-size: 0.85rem; color: var(--text-muted);">
              <strong style="color:white;">Insurance Recommendation:</strong> <span id="dashInsurance"></span>
            </div>
          </div>
        </div>
      `;
      break;
    case 5:
      demoContent.innerHTML = `
        <div style="position:relative;">
          <!-- Metamask simulation box -->
          <div class="metamask-popup" id="metaMaskPopup">
            <div class="metamask-header">
              <span>MetaMask Notification</span>
              <span style="font-size:0.8rem; color:var(--text-muted);">Confirm Tx</span>
            </div>
            <div class="metamask-body" id="metaMaskBody">
              <p style="font-weight:600; color:white; margin-bottom:8px;">Connect Request</p>
              <p>Allow <strong>Portfolio dApp</strong> to interact with your Ethereum account address?</p>
            </div>
            <div class="metamask-footer">
              <button class="metamask-btn metamask-cancel" onclick="cancelWeb3Tx()">Cancel</button>
              <button class="metamask-btn metamask-confirm" id="metaMaskConfirmBtn" onclick="confirmWeb3Tx()">Connect</button>
            </div>
          </div>

          <div id="votingSystemLayout">
            <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 16px;">Cast a tamper-proof vote on the Ethereum blockledger. Requires simulated Web3 MetaMask wallet signing.</p>
            <div class="candidates-grid">
              <div class="candidate-card" id="cand1" onclick="selectCandidate(1)">
                <div style="font-weight:700; color:white;">Candidate A (Alice)</div>
                <div style="font-size:0.8rem; color:var(--text-muted); margin:4px 0;">dApp Optimization Lead</div>
                <div class="candidate-votes" id="votes1">142</div>
              </div>
              <div class="candidate-card" id="cand2" onclick="selectCandidate(2)">
                <div style="font-weight:700; color:white;">Candidate B (Bob)</div>
                <div style="font-size:0.8rem; color:var(--text-muted); margin:4px 0;">Smart Contract Auditor</div>
                <div class="candidate-votes" id="votes2">98</div>
              </div>
            </div>
            <button onclick="castBlockchainVote()" class="demo-btn" style="width:100%;">Cast Vote via Web3 Provider</button>
            <p id="voteHash" style="font-family:var(--mono); font-size:0.75rem; color:var(--primary); margin-top:12px; text-align:center; word-break:break-all;"></p>
          </div>
        </div>
      `;
      break;
    case 6:
      demoContent.innerHTML = `
        <div class="demo-form">
          <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 8px;">Enter a certificate credentials transaction hash to query Polygon chain state and retrieve verified IPFS meta records.</p>
          <div class="demo-group">
            <label class="demo-label">Certificate Verification ID / Tx Hash</label>
            <input id="verifyTxHash" type="text" class="demo-input" value="0x7a8d5f39c298b4ef210c4a179374026bd6157e02b84" />
          </div>
          <button onclick="verifyOnChain()" class="demo-btn">
            Verify on Polygon Mainnet
          </button>
          <div id="verifyResults" style="display:none; margin-top:16px;"></div>
        </div>
      `;
      break;
    case 7:
      demoContent.innerHTML = `
        <div class="demo-form">
          <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 8px;">Write text to run through the Sentiment Classifier pipeline (simulated model output).</p>
          <div class="demo-group">
            <label class="demo-label">Input Text</label>
            <textarea id="sentimentText" class="demo-input" style="height:80px;" placeholder="I absolute love building DeFi applications on Ethereum! It is amazing."></textarea>
          </div>
          <button onclick="runSentimentPipeline()" class="demo-btn">
            Analyze Sentiment Score
          </button>
          <div id="sentimentResult" style="display:none; margin-top:16px; padding:16px; border-radius:8px; background:rgba(255,255,255,0.02); border:1px solid var(--card-border);"></div>
        </div>
      `;
      break;
    case 8:
      demoContent.innerHTML = `
        <div class="demo-form">
          <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 8px;">Simulate secure forensic file deletion using the DoD 5220.22-M 3-pass sanitization standard.</p>
          <div class="demo-group">
            <label class="demo-label">File Target to Destroy</label>
            <input id="shredFile" type="text" class="demo-input" value="/usr/local/data/confidential_client_ledger.db" />
          </div>
          <div class="demo-group">
            <label class="demo-label">Security Protocol Standard</label>
            <select id="shredStandard" class="demo-input" style="background:#1e293b;">
              <option value="dod">DoD 5220.22-M (3-Pass Verification Wipe)</option>
              <option value="quick">Quick Zerofill Pass (1-Pass)</option>
            </select>
          </div>
          <button onclick="runShredConsole()" class="demo-btn" style="background:#ef4444;">
            Initiate Secure Shredding
          </button>
          <div class="terminal-console" id="shredConsole" style="display:none; margin-top:16px;"></div>
        </div>
      `;
      break;
  }
}

// SIMULATOR 1 helper: Certificate generation
window.runCertGeneration = function () {
  const name = document.getElementById('certName').value.trim() || 'Vishnu Y';
  const track = document.getElementById('certTrack').value;
  const certOutput = document.getElementById('certOutput');

  certOutput.style.display = 'block';
  certOutput.innerHTML = `
    <div class="cert-frame">
      <div class="cert-title">CERTIFICATE OF COMPLETION</div>
      <p style="color:var(--text-muted); font-size:0.85rem; font-style:italic;">This is proudly presented to</p>
      <h3 style="color:#fff; font-size:1.6rem; font-family:var(--sans-head); margin:12px 0;">${name}</h3>
      <p style="color:var(--text-muted); font-size:0.9rem; max-width:500px; margin: 0 auto 16px;">
        for successfully completing a 3-month intensive training program as a <strong>${track} Intern</strong> at W3 App Developers.
      </p>
      <div style="display:flex; justify-content:space-around; align-items:center; margin-top:20px; border-top:1.5px solid rgba(255,255,255,0.05); padding-top:16px;">
        <div>
          <p style="font-family:var(--mono); font-size:0.75rem; color:var(--accent);">VERIFIED ON-CHAIN</p>
          <p style="font-size:0.7rem; color:var(--text-muted);">Polygon Hash: 0x93bd...17e2</p>
        </div>
        <svg class="cert-seal" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="12" cy="12" r="10"></circle>
          <circle cx="12" cy="12" r="6"></circle>
          <polygon points="12 2 15 9 22 9 17 14 19 21 12 17 5 21 7 14 2 9 9 9 12 2"></polygon>
        </svg>
        <div>
          <p style="font-style:italic; font-size:0.85rem; text-decoration:underline; color:#fff;">W3 Auth Signatory</p>
          <p style="font-size:0.7rem; color:var(--text-muted);">Internship Board</p>
        </div>
      </div>
    </div>
  `;
};

// SIMULATOR 2 helper: WAF Console
window.sendWafRequest = function (type) {
  const console = document.getElementById('wafConsole');
  const time = new Date().toLocaleTimeString();
  let logLine = '';

  if (type === 'safe') {
    logLine = `<div class="terminal-line">[${time}] <span style="color:#10b981;">[PASS 200]</span> GET /index.html - Clean request from IP 192.168.1.45. Headers safe. Cookie format valid.</div>`;
  } else if (type === 'sql') {
    logLine = `<div class="terminal-line error">[${time}] <span style="color:#ef4444;">[BLOCKED 403]</span> POST /api/login - IP 104.22.4.19 blocked. Reason: Detected SQL Inject sequence in payload: <span style="font-family:var(--mono); color:#fbbf24;">UNION SELECT username, password FROM accounts;--</span></div>`;
  } else if (type === 'xss') {
    logLine = `<div class="terminal-line error">[${time}] <span style="color:#ef4444;">[BLOCKED 403]</span> GET /search?q=%3Cscript%3Ealert(document.cookie)... - IP 45.33.1.201 blocked. Reason: Threat pattern XSS filter matched script tags.</div>`;
  }

  console.innerHTML += logLine;
  console.scrollTop = console.scrollHeight;
};

// SIMULATOR 3 helper: Chat App
window.sendChatMessage = function () {
  const input = document.getElementById('chatInput');
  const box = document.getElementById('chatBox');
  const text = input.value.trim();
  if (!text) return;

  // Add user message
  box.innerHTML += `<div class="chat-bubble sent">${text}</div>`;
  input.value = '';
  box.scrollTop = box.scrollHeight;

  // Bot reply simulator
  setTimeout(() => {
    const replies = [
      "Awesome! This real-time simulation mirrors WebSocket connections accurately.",
      "Instantly broadcasted over socket connection. Try sending another word!",
      "Yes! This proves WebSocket low latency message routing.",
      "Received! Your local message thread has been synchronized on our mock central channel."
    ];
    const randomReply = replies[Math.floor(Math.random() * replies.length)];
    box.innerHTML += `<div class="chat-bubble received">${randomReply}</div>`;
    box.scrollTop = box.scrollHeight;
  }, 1000);
};

// SIMULATOR 4 helper: Smart Financial Advisor
window.generateFinancialPlan = function () {
  const income = parseFloat(document.getElementById('finIncome').value);
  const expenses = parseFloat(document.getElementById('finExpenses').value);
  const risk = document.getElementById('finRisk').value;

  if (!income || !expenses || income <= 0 || expenses <= 0) {
    alert("Please enter valid income and expenses.");
    return;
  }

  let savings = income - expenses;
  let savingsMsg = "";
  let investmentMsg = "";
  let insuranceMsg = "";

  if (savings <= 0) {
    savingsMsg = "Deficit detected. Focus on reducing discretionary spending by 20%.";
    investmentMsg = "Halt investments until an emergency fund is built.";
    insuranceMsg = "Consider basic health coverage to prevent unexpected debt.";
  } else {
    savingsMsg = "You are saving $" + savings + " per month. Excellent!";
    if (risk === "Low") {
      investmentMsg = "Allocate 70% to High-Yield Savings & Bonds, 30% to safe Index Funds.";
    } else if (risk === "Medium") {
      investmentMsg = "Allocate 60% to S&P 500 ETFs, 20% to Bonds, 20% to Tech Stocks.";
    } else {
      investmentMsg = "Allocate 50% to Growth Stocks, 30% to Index Funds, 20% to Crypto.";
    }
    insuranceMsg = "Maintain standard Health Insurance and consider Term Life Insurance.";
  }

  document.getElementById('dashSavings').innerText = savingsMsg;
  document.getElementById('dashInvestment').innerText = investmentMsg;
  document.getElementById('dashInsurance').innerText = insuranceMsg;

  document.getElementById('financialDashboard').style.display = 'block';
};

// SIMULATOR 5 helper: MetaMask Ethereum ballot voting
let selectedCandidateId = null;
let votes = { 1: 142, 2: 98 };
let web3Step = 'connect'; // connect, sign

window.selectCandidate = function (id) {
  document.getElementById('cand1').classList.remove('selected');
  document.getElementById('cand2').classList.remove('selected');
  document.getElementById('cand' + id).classList.add('selected');
  selectedCandidateId = id;
};

window.castBlockchainVote = function () {
  if (!selectedCandidateId) {
    alert("Please select a candidate first.");
    return;
  }
  // Open metamask popup
  const popup = document.getElementById('metaMaskPopup');
  const body = document.getElementById('metaMaskBody');
  const confirmBtn = document.getElementById('metaMaskConfirmBtn');

  popup.style.display = 'block';
  web3Step = 'connect';
  body.innerHTML = `
    <p style="font-weight:600; color:white; margin-bottom:8px;">Connect Request</p>
    <p>Allow <strong>Portfolio dApp</strong> to interact with your MetaMask wallet address?</p>
  `;
  confirmBtn.innerText = "Connect";
};

window.cancelWeb3Tx = function () {
  document.getElementById('metaMaskPopup').style.display = 'none';
  document.getElementById('voteHash').innerText = "MetaMask wallet signing rejected by user.";
};

window.confirmWeb3Tx = function () {
  const body = document.getElementById('metaMaskBody');
  const confirmBtn = document.getElementById('metaMaskConfirmBtn');
  const hashText = document.getElementById('voteHash');

  if (web3Step === 'connect') {
    web3Step = 'sign';
    body.innerHTML = `
      <p style="font-weight:600; color:white; margin-bottom:8px;">Confirm Transaction</p>
      <p>Contract: <strong>0xVotingContract</strong></p>
      <p style="margin-top:6px;">Gas Fee: <span style="color:#f59e0b;">0.00042 ETH</span></p>
      <p style="font-size:0.75rem; margin-top:8px;">Are you sure you want to sign this vote transaction?</p>
    `;
    confirmBtn.innerText = "Confirm Vote";
  } else if (web3Step === 'sign') {
    document.getElementById('metaMaskPopup').style.display = 'none';
    hashText.innerText = "Mining transaction block... please wait.";

    setTimeout(() => {
      votes[selectedCandidateId]++;
      document.getElementById('votes' + selectedCandidateId).innerText = votes[selectedCandidateId];
      const txHash = '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      hashText.innerHTML = `
        <span style="color:#10b981; font-weight:700; display:block; margin-bottom:4px;">✓ Vote Broadcasted successfully!</span>
        Tx Hash: ${txHash}
      `;
    }, 1500);
  }
};

// SIMULATOR 6 helper: Polygon certificate validation search
window.verifyOnChain = function () {
  const hash = document.getElementById('verifyTxHash').value.trim();
  const result = document.getElementById('verifyResults');
  if (!hash) {
    alert("Please enter a valid credential hash.");
    return;
  }

  result.style.display = 'block';
  result.innerHTML = `<p style="color:var(--text-muted); text-align:center;">Querying Polygon smart contract ledger...</p>`;

  setTimeout(() => {
    result.innerHTML = `
      <div style="border:1px solid rgba(16,185,129,0.3); background:rgba(16,185,129,0.04); padding:16px; border-radius:8px;">
        <div style="display:flex; align-items:center; gap:8px; color:#10b981; font-weight:700; margin-bottom:8px;">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          CREDENTIAL VALIDATED
        </div>
        <div style="font-size:0.85rem; color:var(--text-muted); display:grid; grid-template-columns: 100px 1fr; gap:6px;">
          <span>Student:</span><strong style="color:white;">Vishnu Y</strong>
          <span>Institution:</span><span style="color:white;">Kongu Engineering College</span>
          <span>Ledger Code:</span><span style="color:white; font-family:var(--mono); font-size:0.75rem;">Polygon-Block-182442</span>
          <span>IPFS CID:</span><span style="color:var(--primary); font-family:var(--mono); font-size:0.75rem;">QmZ8aD47...9f1W</span>
          <span>Status:</span><span style="color:#10b981; font-weight:600;">IMMUTABLE RECORD</span>
        </div>
      </div>
    `;
  }, 1200);
};

// SIMULATOR 7 helper: Sentiment analysis classifier pipeline
window.runSentimentPipeline = function () {
  const text = document.getElementById('sentimentText').value.trim().toLowerCase();
  const result = document.getElementById('sentimentResult');
  if (!text) {
    alert("Please type something to analyze.");
    return;
  }

  result.style.display = 'block';
  result.innerHTML = `<p style="color:var(--text-muted); text-align:center;">Tokenizing and analyzing sentiment tokens...</p>`;

  setTimeout(() => {
    // Simple mock algorithm
    const positiveWords = ["great", "love", "amazing", "good", "cool", "superb", "awesome", "nice", "excellent", "secure", "best"];
    const negativeWords = ["bad", "broken", "hate", "sad", "terrible", "worst", "bug", "ugly", "error", "fail"];

    let posCount = 0;
    let negCount = 0;

    positiveWords.forEach(w => { if (text.includes(w)) posCount++; });
    negativeWords.forEach(w => { if (text.includes(w)) negCount++; });

    let sentiment = "Neutral";
    let score = 50;
    let color = "#fbbf24";
    let emoji = "😐";

    if (posCount > negCount) {
      sentiment = "Positive";
      score = Math.min(80 + (posCount * 5), 99);
      color = "#10b981";
      emoji = "😊";
    } else if (negCount > posCount) {
      sentiment = "Negative";
      score = Math.min(80 + (negCount * 5), 99);
      color = "#ef4444";
      emoji = "😢";
    }

    result.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
        <span style="font-weight:700; color:white;">Sentiment Result:</span>
        <span style="color:${color}; font-weight:700; font-family:var(--sans-head); font-size:1.1rem;">${sentiment} ${emoji}</span>
      </div>
      <div style="font-size:0.85rem; color:var(--text-muted); margin-bottom:8px;">Model Confidence Match: ${score}%</div>
      <div style="width:100%; height:8px; border-radius:99px; background:#1e293b; overflow:hidden;">
        <div style="width:${score}%; height:100%; background:${color}; border-radius:99px;"></div>
      </div>
    `;
  }, 1000);
};

// SIMULATOR 8 helper: Secure data deletion console logs
window.runShredConsole = function () {
  const file = document.getElementById('shredFile').value.trim();
  const standard = document.getElementById('shredStandard').value;
  const consoleDiv = document.getElementById('shredConsole');

  if (!file) {
    alert("Please enter a file path.");
    return;
  }

  consoleDiv.style.display = 'block';
  consoleDiv.innerHTML = `<div class="terminal-line warning">[INIT] Target file: ${file}</div>`;
  consoleDiv.innerHTML += `<div class="terminal-line warning">[INIT] Protocol selected: ${standard === 'dod' ? 'DoD 5220.22-M (3-Pass)' : 'Quick Zerofill (1-Pass)'}</div>`;

  let pass = 1;
  let maxPass = standard === 'dod' ? 3 : 1;

  function runPass() {
    if (pass <= maxPass) {
      consoleDiv.innerHTML += `<div class="terminal-line info">[PASS ${pass}] Overwriting block nodes with ${pass === 1 ? 'random noise' : pass === 2 ? 'binary ones (0xFF)' : 'verified zero bits (0x00)'}...</div>`;
      consoleDiv.scrollTop = consoleDiv.scrollHeight;

      setTimeout(() => {
        consoleDiv.innerHTML += `<div class="terminal-line">[PASS ${pass} OK] Verification block check successful.</div>`;
        consoleDiv.scrollTop = consoleDiv.scrollHeight;
        pass++;
        setTimeout(runPass, 800);
      }, 800);
    } else {
      consoleDiv.innerHTML += `<div class="terminal-line warning">[DELETING] Severing index pointers and file system inode block descriptors...</div>`;
      consoleDiv.scrollTop = consoleDiv.scrollHeight;

      setTimeout(() => {
        consoleDiv.innerHTML += `<div class="terminal-line" style="color:#10b981; font-weight:700;">[DESTROYED] File data shredded and unrecoverable. Sector audit reports zero residue footprint.</div>`;
        consoleDiv.scrollTop = consoleDiv.scrollHeight;
      }, 1000);
    }
  }

  setTimeout(runPass, 600);
};

// Mobile Navigation Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinksList = document.querySelector('.nav-links');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navLinksList.classList.toggle('open');
  });
}

// Close menu when clicking link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinksList.classList.remove('open');
  });
});

// Active Section Scroll Highlight
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  const scrollPos = window.pageYOffset || document.documentElement.scrollTop;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;
    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });

  // Special case: bottom of page
  if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 50) {
    current = 'contact';
  }

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Skills Bar Animation on Visibility
const skillBars = document.querySelectorAll('.skill-bar-fill');

const observeSkills = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const targetWidth = bar.getAttribute('data-width');
      bar.style.width = targetWidth;
      observeSkills.unobserve(bar);
    }
  });
}, { threshold: 0.1 });

skillBars.forEach(bar => {
  observeSkills.observe(bar);
});

// Contact Form Handler
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      // Construct mailto link or gmail link
      const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=vishnuvarddhanay@gmail.com&su=${subject}&body=${body}`;
      
      window.open(gmailUrl, '_blank');
      
      // Optional: reset form
      contactForm.reset();
    });
  }
});
