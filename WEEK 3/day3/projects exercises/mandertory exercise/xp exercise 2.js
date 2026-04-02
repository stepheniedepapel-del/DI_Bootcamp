const input = document.getElementById('lettersOnly');
const errorMsg = document.getElementById('errorMsg');

input.addEventListener('input', function(e) {
    // Remove anything that's not a letter (a-z, A-Z)
    const originalValue = this.value;
    const cleanedValue = originalValue.replace(/[^a-zA-Z]/g, '');
    
    // If something was removed, show error briefly
    if (originalValue !== cleanedValue) {
        errorMsg.textContent = 'Only letters allowed!';
        setTimeout(() => errorMsg.textContent = '', 1500);
    }
    
    // Update value with only letters
    this.value = cleanedValue;
});