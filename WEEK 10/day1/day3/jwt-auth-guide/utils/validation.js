const validateRegistration = (username, email, password) => {
    const errors = [];
    
    if (!username || username.length < 3 || username.length > 30) {
        errors.push('Username must be between 3 and 30 characters');
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        errors.push('Username can only contain letters, numbers, and underscores');
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push('Valid email is required');
    }
    if (!password || password.length < 8) {
        errors.push('Password must be at least 8 characters');
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
        errors.push('Password must contain uppercase, lowercase, and a number');
    }
    
    return errors;
};

const validateLogin = (username, password) => {
    const errors = [];
    if (!username) errors.push('Username is required');
    if (!password) errors.push('Password is required');
    return errors;
};

module.exports = { validateRegistration, validateLogin };