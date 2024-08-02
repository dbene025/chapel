// JavaScript Document// JavaScript Document
document.addEventListener("DOMContentLoaded", function() {
    // Function to toggle work letter details
    function toggleWorkLetterDetails() {
        var checkBox = document.getElementById('work-letter');
        var details = document.getElementById('work-letter-details');
        if (checkBox.checked == true) {
            details.style.display = 'block';
        } else {
            details.style.display = 'none';
        }
    }

    // Attach toggleWorkLetterDetails to the checkbox
    document.getElementById('work-letter').addEventListener('change', toggleWorkLetterDetails);
});
