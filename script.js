document.getElementById('openInputButton').addEventListener('click', function() {
    document.getElementById('inputContainer').style.display = 'block';
});

document.getElementById('submitButton').addEventListener('click', function() {
    const linkInput = document.getElementById('linkInput').value;

    const validLink = 'https://www.myntra.com/jewellery-set/sangria/sangria-gold-toned-gold-plated-pearl-beaded-tasselled-bridal-jewellery-set/28490210/buy';
    // Regular expression to validate URLs
    const urlPattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
       
    if (!urlPattern.test(linkInput)) {
   alert("Invalid URL. Please paste a valid link")
    } else {
        const r=document.getElementById('countid');
r.style.display='none';
        // You can add additional code here to handle the valid URL
        if(linkInput===validLink)
        {
const q=document.getElementById('success');
q.style.display='inline';
        }    
        else{
            const q=document.getElementById('fail');
            q.style.display='inline';
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    let count = 100; // Initialize the count value
    const countElement = document.getElementById('pointCount');

    // Function to replace a button with an h2 tag containing specific text
    function replaceWithHint(buttonId, hintText, pointsToDeduct) {
        const button = document.getElementById(buttonId);

        // Create a new h2 element
        const hintElement = document.createElement('h4');
        hintElement.textContent = hintText; // Set the content of the h2 tag
        hintElement.classList.add('myhints'); 
        // Replace the button with the h2 element in the same position
        button.parentNode.insertBefore(hintElement, button);
        button.style.display = 'none'; // Hide the button (optional)

        // Deduct points and update the displayed count
        count -= pointsToDeduct;
        countElement.textContent = count;
    }

    // Event listeners for each hint button with points to deduct
    document.getElementById('myhint1').addEventListener('click', function() {
        replaceWithHint('myhint1', 'I shimmer with a golden glow, adorned with pearls that softly flow.', 10);
    });

    document.getElementById('myhint2').addEventListener('click', function() {
        replaceWithHint('myhint2', 'My tassels dance with every sway, a bridal charm that brightens the day.', 10);
    });
    document.getElementById('myhint3').addEventListener('click', function() {
        replaceWithHint('myhint3', 'Intricately crafted to adorn, a piece of art that brides adorn', 10);
    });
    document.getElementById('myhint4').addEventListener('click', function() {
        replaceWithHint('myhint4', 'This jewellery set features a floral design in gold-toned, gold-plated finish, adorned with pearl beads and multicoloured tassels.', 10);
    });})