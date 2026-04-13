// ==========================================
// Currency Converter - Clean Async/Await Version
// ==========================================

const CONFIG = {
    API_KEY: 'a3b615a567190950545402c6', // <-- REPLACE THIS
    BASE_URL: 'https://v6.exchangerate-api.com/v6',
    DEFAULT_FROM: 'USD',
    DEFAULT_TO: 'EUR'
};

// DOM Cache
const elements = {
    fromSelect: document.getElementById('from-currency'),
    toSelect: document.getElementById('to-currency'),
    amount: document.getElementById('amount'),
    convertBtn: document.getElementById('convert-btn'),
    switchBtn: document.getElementById('switch-btn'),
    result: document.getElementById('result'),
    error: document.getElementById('error'),
    rateDisplay: document.getElementById('conversion-rate'),
    valueDisplay: document.getElementById('converted-value'),
    timeDisplay: document.getElementById('last-updated')
};

// State
let currenciesList = [];

// ==========================================
// API Functions
// ==========================================

async function apiRequest(endpoint) {
    const url = `${CONFIG.BASE_URL}/${CONFIG.API_KEY}${endpoint}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (!response.ok || data.result === 'error') {
            throw new Error(data['error-type'] || `HTTP ${response.status}`);
        }
        
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

async function getSupportedCurrencies() {
    return await apiRequest('/codes');
}

async function getConversion(from, to, amount) {
    return await apiRequest(`/pair/${from}/${to}/${amount}`);
}

// ==========================================
// UI Functions
// ==========================================

function populateDropdowns(currencies) {
    currenciesList = currencies.sort((a, b) => a[0].localeCompare(b[0]));
    
    const options = currenciesList.map(([code, name]) => 
        `<option value="${code}">${code} - ${name}</option>`
    ).join('');
    
    const defaultOption = '<option value="">Select currency...</option>';
    
    elements.fromSelect.innerHTML = defaultOption + options;
    elements.toSelect.innerHTML = defaultOption + options;
    
    // Set defaults
    elements.fromSelect.value = CONFIG.DEFAULT_FROM;
    elements.toSelect.value = CONFIG.DEFAULT_TO;
}

function showResult(data, amount) {
    const { conversion_rate, conversion_result, time_last_update_utc } = data;
    
    elements.rateDisplay.textContent = 
        `1 ${data.base_code} = ${conversion_rate.toFixed(4)} ${data.target_code}`;
    
    elements.valueDisplay.textContent = 
        `${conversion_result.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })} ${data.target_code}`;
    
    elements.timeDisplay.textContent = `Updated: ${time_last_update_utc}`;
    
    elements.result.classList.remove('hidden');
    elements.error.classList.add('hidden');
}

function showError(message) {
    elements.error.textContent = message;
    elements.error.classList.remove('hidden');
    elements.result.classList.add('hidden');
}

function setLoading(isLoading) {
    elements.convertBtn.disabled = isLoading;
    elements.convertBtn.innerHTML = isLoading 
        ? '<span class="spinner"></span> Loading...' 
        : 'Convert';
}

// ==========================================
// Event Handlers
// ==========================================

async function handleConvert() {
    const from = elements.fromSelect.value;
    const to = elements.toSelect.value;
    const amount = parseFloat(elements.amount.value);

    // Validation
    if (!from || !to) return showError('Please select both currencies');
    if (!amount || amount <= 0) return showError('Please enter a valid amount');
    if (from === to) return showError('Please select different currencies');

    setLoading(true);

    try {
        const data = await getConversion(from, to, amount);
        showResult(data, amount);
    } catch (error) {
        const errorMessages = {
            'invalid-key': 'Invalid API key. Please check your key.',
            'inactive-account': 'Account not activated. Check your email.',
            'quota-reached': 'API quota exceeded. Try again later.',
            'unsupported-code': 'Currency not supported.',
            'malformed-request': 'Invalid request format.'
        };
        
        showError(errorMessages[error.message] || `Error: ${error.message}`);
    } finally {
        setLoading(false);
    }
}

function handleSwitch() {
    const temp = elements.fromSelect.value;
    elements.fromSelect.value = elements.toSelect.value;
    elements.toSelect.value = temp;
    
    // Recalculate if we have a result showing
    if (!elements.result.classList.contains('hidden') && elements.amount.value) {
        handleConvert();
    }
}

// ==========================================
// Initialization
// ==========================================

async function init() {
    // Check API key
    if (CONFIG.API_KEY === 'YOUR_API_KEY_HERE' || !CONFIG.API_KEY) {
        showError('⚠️ Please add your API key in script.js line 6');
        elements.convertBtn.disabled = true;
        return;
    }

    setLoading(true);

    try {
        const data = await getSupportedCurrencies();
        populateDropdowns(data.supported_codes);
    } catch (error) {
        showError('Failed to load currencies. Check API key and internet connection.');
    } finally {
        setLoading(false);
    }
}

// ==========================================
// Event Listeners
// ==========================================

elements.convertBtn.addEventListener('click', handleConvert);
elements.switchBtn.addEventListener('click', handleSwitch);

elements.amount.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleConvert();
});

// Start
init();